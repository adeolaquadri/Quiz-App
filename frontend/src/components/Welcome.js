import React from "react";
import { Link } from "react-router-dom";
import Header from './Header.js';
import Footer from "./Footer.js";

const Welcome = () => {
  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-white to-gray-100 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between">
          
          {/* Left Section - Image */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img src="/man.png" alt="logo" className="max-w-[400px] w-full h-auto" />
          </div>

          {/* Right Section - Text */}
          <div className="md:w-1/2 text-left mt-8 md:mt-0 md:pl-10">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
              Dive into a world of endless <span className="text-red-500">trivia fun.</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Great website that allows you to immerse yourself in trivia fun. 
              Challenge your mind, compete with friends, and level up your knowledge! 
              Knock yourself out.
            </p>
            <Link to="/signup">
              <button className="mt-6 bg-red-500 text-white text-lg font-semibold py-3 px-6 rounded-lg hover:bg-red-600 transition">
                Get Started
              </button>
            </Link>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Welcome;
