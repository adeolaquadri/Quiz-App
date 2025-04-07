import React from 'react'
import axios from 'axios';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Login = ({setUser})=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


   const submitForm = async(event)=>{
    event.preventDefault();
    try {
        const response = await axios.post("http://localhost:4030/login",
             { username, password }, {withCredentials: true});
        if(response) {
          navigate('/quiz'); // Redirect after login 
        }else{
          console.error("Login failed");
        }
        }catch (error) {
        console.error("Login failed:", error.response.data.Error);
        alert(error.response.data.Error);
      }
   }

    return(
        <div className='text-left'>
            <div className='m-[auto] mt-[50px] w-[fit-content] h-[auto] p-[10px] bg-gray-400'>
            <h1 className='text-center text-2xl'>Login to take Quiz</h1><br />
            <form onSubmit={submitForm}>
                <label className='text-xl text-left'>Username: </label><br />
                <input className='w-[300px] p-[5px] border-none outline-none' 
               placeholder='enter your username' value={username} onChange={(e)=> setUsername(e.target.value)}
                type="text" name="username" required/><br /><br />

                <label className='text-xl'>Password: </label><br />
                <input className='w-[300px] p-[5px] border-none outline-none'
                placeholder='enter your password' value={password} onChange={(e)=> setPassword(e.target.value)}
                 type="password" name="pass" required/><br /><br /><br />

                <button type='submit' className='w-[100%] text-2xl p-[5px]  bg-white text-black'>Login</button>
                </form>
                </div>
                </div>
                )
}

export default Login;