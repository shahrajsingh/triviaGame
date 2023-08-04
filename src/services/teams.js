export const getAllTeams = async (user_name) => {
    try {
        console.log(user_name);
        const response = await fetch(``, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user_name
            })
        });
        
        const data = await response.json();

        return {
            dreams: data.body.teams
        };
    } catch (error) {
        console.log(error);
        return {
            dreams: []
        };
    }
}