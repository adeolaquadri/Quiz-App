import React from 'react'
import axios from 'axios';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Signup = ({setUser})=>{
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [confirmpass, setConfirmpass] = useState("");
    const navigate = useNavigate();


   const submitForm = async(event)=>{
    event.preventDefault();
    try {
        const response = await axios.post("https://quiz-app-0yfq.onrender.com/signup",
             {email, username, pass, confirmpass}, {withCredentials: true});
        if(response) {
          navigate('/login'); // Redirect after signup 
        }else{
          console.error("Login failed");
        }
        }catch (error) {
        console.error("Login failed:", error.response.data.error);
        alert(error.response.data.error);
      }
   }

    return(
      <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[865px] p-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-center font-poppins text-3xl font-semibold">SIGN UP!</h1>
        <p className="text-gray-500 text-center">Create a free account now.</p>
    
        <form className="mt-8" onSubmit={submitForm}>

        <label className="block text-left font-medium">Email</label>
          <input 
            className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter a valid email address"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            type="email" required 
          />

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
            value={pass} 
            onChange={(e) => setPass(e.target.value)}
            type="password" required 
          />

         <label className="block text-left font-medium mt-4">Re-type Password</label>
          <input 
            className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="******************"
            value={confirmpass} 
            onChange={(e) => setConfirmpass(e.target.value)}
            type="password" required 
          />
          <button 
            type="submit"
            className="w-full h-12 bg-red-500 text-white text-lg font-semibold rounded-md mt-6 hover:bg-red-600 transition"
          >
            Sign up
          </button>
    
          <p className="mt-4 text-center text-gray-600">
            Already have an account? 
            <a href="/login" className="text-red-500 hover:underline"> Sign in!</a>
          </p>
        </form>
      </div>
    </div>
    <Footer />
    
    
                    </>
                )
}
export default Signup;