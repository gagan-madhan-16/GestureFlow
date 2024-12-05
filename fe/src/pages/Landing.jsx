import React, { useState } from 'react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import TypingAnimation from "../components/TypingAnimation";

export const Landing = () => {
  const navigate = useNavigate();

  const [token,setToken]=useState(localStorage.getItem('token'));

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen p-6 relative">
      <nav className="flex justify-between items-center mb-12">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-orange-400 rounded-full mr-2"></div>
          <span className="font-bold text-2xl text-orange-400">Gesture Flow</span>
        </div>
        <div className="flex items-center space-x-4">
          {token ? (
            <>
              <Button 
                label="Smart Board" 
                onClick={() => window.location.href = "/smartboard.html"} 
                width="150px"
              />
              <Button 
                label="Log Out" 
                onClick={() => {localStorage.clear();
                  setToken(null);
                }} 
              />
            </>
          ) : (
            <>
              <Button 
                label="Sign Up" 
                onClick={() => navigate('/signup')} 
              />
              <Button 
                label="Sign In" 
                onClick={() => navigate('/signin')} 
              />
            </>
          )}
        </div>
      </nav>

      <main className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start justify-center space-y-8 mb-12 lg:mb-0">
          <h1 className="text-5xl lg:text-7xl font-bold text-center lg:text-left text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
            Welcome to Gesture Flow
          </h1>
          <p className="text-xl text-gray-300 text-center lg:text-left max-w-lg">
            Experience the future of interaction with our innovative gesture recognition technology.
          </p>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={() => navigate('/tutorial')}
          >
            <TypingAnimation text="Recognized Gestures" />
          </button>
        </div>

        <div className="lg:w-1/2 flex justify-center items-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-20 rounded-full blur-3xl"></div>
          <img 
            src="https://res.cloudinary.com/dvv1qhibw/image/upload/v1727754776/se/fwjbx1d6vdi4wzosml14.png" 
            alt="Gesture Flow Demo" 
            className="relative z-10 w-full h-auto max-w-2xl mx-auto rounded-lg shadow-2xl"
          />
        </div>
      </main>
    </div>
  );
};