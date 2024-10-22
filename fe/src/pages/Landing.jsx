import React from 'react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import TypingAnimation from "../components/TypingAnimation";

export const Landing = () => {
  
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <nav className="flex justify-between items-center mb-12">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-orange-400 rounded-full mr-2"></div>
          <span className="font-bold text-orange-400">Gesture Flow</span>
        </div>
        <div className="flex items-center space-x-4">
        <div>
          <div style = {{display: 'flex',gap: '10px'}}>
            <Button label={"Sign Up"} onClick={() => navigate('/signup')} />
            <Button label={"Sign In"} onClick={() => navigate('/signin')} />
          </div>
        </div>
        </div>
      </nav>

      <main className="flex flex-col md:flex-row items-center justify-between">

      <div className="md:w-1/2 flex flex-col items-start h-screen pt-[300px]">
        <h1 className="text-6xl text-orange-500 font-bold mb-8">Welcome.</h1>
        <div className="space-x-4 z-10">
          <button style={{ width: '200px', backgroundColor: 'blue', padding: '10px' }} onClick={() => navigate('/tutorial')} type="button" >
            <TypingAnimation text={"Gesture Tutorial"} />
          </button>
        </div>
      </div>


        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="flex-item-right gap-10px"><img src="https://res.cloudinary.com/dvv1qhibw/image/upload/v1727754776/se/fwjbx1d6vdi4wzosml14.png" alt="intro" style={{height:'600px', marginBottom:'300px'}}/></div>
      </main>
      <a href="http://127.0.0.1:5000/"><button style={{ width: '200px', backgroundColor: 'blue', padding: '10px' }} type="button" >Go to Smart Board</button></a>
    </div>
  );
};
