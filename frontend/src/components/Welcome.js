import React from "react";
import { Link } from "react-router-dom";

const Welcome = ()=>{
   return(
      <>
      <div className="m-[auto] w-[500px] mt-[50px] h-[auto] p-[20px] bg-purple-500">
         <p className="text-center text-3xl">Welcome to our Quiz App</p>
         <span className="text-white">We are here to give you best survey experience ever...</span>
         <button className="w-[300px] b-[none] text-2xl bg-white mt-[50%]">
            <Link to='/quiz'>Start Quiz</Link></button>
      </div>
      </>
   )
}


export default Welcome;