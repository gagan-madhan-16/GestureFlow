import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import GestureCard from './GestureCard';

const gestures = [
  {
    name: 'Draw',
    description: 'Hold your first finger upright to Draw.',
    imageUrl: '/images/draw.png'
  },
  {
    name: 'Erase',
    description: 'Hold your first and second fingers upright to Erase.',
    imageUrl: '/images/erase.png'
  },
  
  {
    name: 'Next Page',
    description: 'Hold your first, second and third fingers upright to go to Next Page.',
    imageUrl: '/images/next.png'
  },
  {
    name: 'Previous Page',
    description: 'Keep your fist closed to go to Previous Page.',
    imageUrl: '/images/prev.png'
  }
];

const Tutorial = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <nav className="flex justify-between items-center mb-12">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-orange-400 rounded-full mr-2"></div>
          <span className="font-bold text-orange-400">Gesture Flow</span>
        </div>
        <a href="/"><button style={{ width: '200px', backgroundColor: 'blue', padding: '10px' }} type="button" >Go to Home</button></a>
      </nav>

      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl text-orange-500 font-bold mb-8">Gesture Tutorial</h1>
        <p className="text-lg mb-8">
          Learn how to use our AI-powered virtual mouse with these simple gestures. 
          Practice each gesture to control your screen effortlessly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gestures.map((gesture, index) => (
            <GestureCard key={index} {...gesture} />
          ))}
        </div>

        {/* <a href="http://127.0.0.1:5501/fe/public/smartboard.html"><button style={{ width: '200px', backgroundColor: 'blue', padding: '10px', marginTop: '15px' }} type="button" >Go to Smart Board</button></a> */}
      </main>

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-20 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Tutorial;