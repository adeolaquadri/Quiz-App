import React from 'react'
import axios from 'axios';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

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
        <>
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="w-full max-w-[865px] p-10 bg-white rounded-lg shadow-lg">
    <h1 className="text-center font-poppins text-3xl font-semibold">WELCOME BACK</h1>
    <p className="text-gray-500 text-center">Welcome back! Please enter your details.</p>

    <form className="mt-8" onSubmit={submitForm}>
      <label className="block text-left font-medium">Username</label>
      <input 
        className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter your username"
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
        type="text" required 
      />

      <label className="block text-left font-medium mt-4">Password</label>
      <input 
        className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="******************"
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        type="password" required 
      />

      <button 
        type="submit"
        className="w-full h-12 bg-red-500 text-white text-lg font-semibold rounded-md mt-6 hover:bg-red-600 transition"
      >
        Sign in
      </button>

      <p className="mt-4 text-center text-gray-600">
        Don't have an account? 
        <a href="/signup" className="text-red-500 hover:underline"> Sign up for free</a>
      </p>
    </form>
  </div>
</div>


                </>
                )
}

export default Login;