import React from 'react';

const GestureCard = ({ name, description, imageUrl }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
      <h2 className="text-2xl font-semibold mb-4">{name}</h2>
      <img 
        src={imageUrl} 
        alt={`Demonstration of ${name} gesture`} 
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default GestureCard;