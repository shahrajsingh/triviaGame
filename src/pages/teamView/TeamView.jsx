import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './TeamView.module.css';
import { getAllTeams } from '../../services/teams';

function TeamPage() {
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();

    const goToCreateTeam = () => {
        navigate("/create_team");
    };

    useEffect(() => {
        const fetchTeams = async () => {
          const user_name = window.localStorage.getItem('userName');
          const AllTeams = await getAllTeams(user_name);
          if (AllTeams) {
            setTeams(AllTeams);
        } else {
            setTeams([]);
        }
        }
        fetchTeams();
    }, [])

    return (
        <div className={classes.vtcontainer}>
            <table className={classes.teamtable}>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Team Name</th>
                        <th>Join Team</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team, index) => (
                        <tr key={team.team_id}>
                            <td>{index + 1}</td>
                            <td>{team.team_name}</td>
                            <td>
                                <button className={classes.joinbtn}>Join</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={classes.separator}>--OR--</div>
            <button className={classes.createteambtn}>Create New Team</button>
        </div>
    );
}

export default TeamPage;
