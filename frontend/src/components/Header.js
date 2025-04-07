import React from "react";

const Header = ({ username, email, isLoggedIn, onLogout }) => {
  return (
    <div className="sticky top-0 z-50 flex justify-between items-center p-[20px] bg-white shadow-md">
      <h1 className="font-poppins text-2xl">
        <span style={{ color: "#4880FF" }}>Dash</span>
        <span>Stack</span>
      </h1>

      <div className="text-right">
        {isLoggedIn && (
          <>
            {/* <p className="font-poppins">{email}</p> */}
            <p className="font-poppins">Welcome, {username}</p>
          </>
        )}
      </div>

      {isLoggedIn && (
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-poppins ml-4"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
