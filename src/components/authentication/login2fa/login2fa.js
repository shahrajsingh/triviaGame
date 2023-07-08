import React from 'react';
import { fetchData } from '../dynamoDb';

const Login2fa = () =>{
    /*const getData = async ()=>{
        await fetchData("TriviaUsers").then((result)=>{
            console.log(result);
        },(error)=>{
            alert(error);
        })
    }
    console.log("fetching data");
    console.log(getData());*/
    return(<>
        <h2>login2fa works</h2>
    </>)
};
export default Login2fa;