import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import GestureCard from './GestureCard';

const gestures = [
  {
    name: 'Zoom In',
    description: 'Hold your first and second fingers upright to zoom in.',
    imageUrl: '/placeholder.svg?height=200&width=200'
  },
  {
    name: 'Zoom Out',
    description: 'Pinch your fingers together to zoom out.',
    imageUrl: '/placeholder.svg?height=200&width=200'
  },
  {
    name: 'Volume Up',
    description: 'Raise your hand with palm facing up to increase volume.',
    imageUrl: '/placeholder.svg?height=200&width=200'
  },
  {
    name: 'Volume Down',
    description: 'Lower your hand with palm facing down to decrease volume.',
    imageUrl: '/placeholder.svg?height=200&width=200'
  },
  {
    name: 'Scribble',
    description: 'Move your index finger in the air to scribble.',
    imageUrl: '/placeholder.svg?height=200&width=200'
  },
  {
    name: 'Erase',
    description: 'Swipe your hand from right to left to erase.',
    imageUrl: '/placeholder.svg?height=200&width=200'
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

        {/* <a href="/smartboard.html"><button style={{ width: '200px', backgroundColor: 'blue', padding: '10px', marginTop: '15px' }} type="button" >Go to Smart Board</button></a> */}
      </main>

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-20 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Tutorial;