import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 font-poppins">
        <p>&copy; {new Date().getFullYear()} DashStack. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a href="/about" className="hover:text-blue-500">About</a>
          <a href="/contact" className="hover:text-blue-500">Contact</a>
          <a href="/privacy" className="hover:text-blue-500">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
