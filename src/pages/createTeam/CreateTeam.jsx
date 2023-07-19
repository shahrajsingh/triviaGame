import React, { useState } from 'react';
import axios from 'axios';
import classes from './CreateTeam.module.css';

const CreateTeamForm = () => {
  const [teamName, setTeamName] = useState('');
  const [teamAdmin, setTeamAdmin] = useState('');
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [inviteSent, setInviteSent] = useState(false);

  const generateTeamName = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/get_team_name');
      console.log(response.data)
      setTeamName(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchMembers = async () => {
    try {
      const response = await axios.get(`/search-members?name=${searchQuery}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const sendInvite = async (email) => {
    try {
      await axios.post('/api/send-invite', { email });
    } catch (error) {
      console.error(error);
    }
  };

  const createTeam = async (e) => {
    e.preventDefault();
    const formData = {
      teamName,
      teamAdmin,
      members,
    };

    try {
      await axios.post('/api/create-team', formData);
      // Handle success or show a confirmation message
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={createTeam} className={classes.container}>
      <h2>Create Your Team</h2>
      <div className={classes.inlineRow}>
        <label htmlFor="teamName" className={classes.label}>Team Name:</label>
        <input
          type="text"
          id="teamName"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className={classes.input}
        />
        <button type="button" onClick={generateTeamName} className={classes.button}>Generate Name</button>
      </div>
      <div className={classes.inlineRow}>
        <label htmlFor="teamAdmin" className={classes.label}>Team Admin:</label>
        <input
          type="text"
          id="teamAdmin"
          value={teamAdmin}
          onChange={(e) => setTeamAdmin(e.target.value)}
          className={classes.input}
          disabled
        />
      </div>
      <div className={classes.inlineRow}>
        <label htmlFor="searchQuery" className={classes.label}>Search Members:</label>
        <input
          type="text"
          id="searchQuery"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={classes.input}
        />
        <button type="button" onClick={searchMembers} className={classes.button}>Search</button>
      </div>
      <div className={classes.membersContainer}>
        <ul>
          {searchResults.map((member) => (
            <li key={member.id}>
              {member.name}
              <button type="button" onClick={() => sendInvite(member.email)} className={classes.button}>Send Invite</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button type="button" onClick={() => setMembers([...members, ''])} className={classes.button}>Add Member</button>
        {members.map((member, index) => (
          <div key={index}>
            <input
              type="text"
              value={member}
              onChange={(e) => {
                const updatedMembers = [...members];
                updatedMembers[index] = e.target.value;
                setMembers(updatedMembers);
              }}
              className={classes.memberInput}
            />
          </div>
        ))}
      </div>
      <button type="submit" className={`${classes.button} ${classes.submitButton}`}>Create</button>
    </form>
  );
};

export default CreateTeamForm;
