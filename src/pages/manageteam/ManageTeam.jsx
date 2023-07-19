import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Manageteam.module.css';

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    // Fetch team members from an API endpoint
    const fetchTeamMembers = async () => {
      try {
        const members =[{
            id: "heelo@",
            name: "James Gunn"
        },{
            id: "hel1",
            name: "Zack S"
        },
        {
            id: "heo@",
            name: "Peter Gunn"
        }
    ]
        //const response = await axios.get('/api/team-members');
        //setTeamMembers(response.data);
        setTeamMembers(members);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeamMembers();
  }, []);

  const removeMember = async (memberId) => {
    try {
      await axios.delete(`/api/team-members/${memberId}`);
      // Refresh the list of team members after removal
      const response = await axios.get('/api/team-members');
      setTeamMembers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const makeAdmin = async (memberId) => {
    try {
      await axios.post(`/api/make-admin/${memberId}`);
      // Refresh the list of team members after making admin
      const response = await axios.get('/api/team-members');
      setTeamMembers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>Team Members</h2>
      <ul className={classes.memberList}>
        {teamMembers.map((member) => (
          <li key={member.id} className={classes.memberItem}>
            <span className={classes.memberName}>{member.name}</span>
            <div className={classes.memberButtons}>
              <button onClick={() => removeMember(member.id)} className={classes.removeButton}>Remove Member</button>
              <button onClick={() => makeAdmin(member.id)} className={classes.makeAdminButton}>Make Admin</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMembers;
