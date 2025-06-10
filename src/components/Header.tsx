
import React from 'react';

const Header = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-6">
        <img 
          src="/lovable-uploads/d3e2c1ed-3a94-410a-92a5-4126a5366ca6.png" 
          alt="National Sports School Logo" 
          className="h-20 w-auto md:h-24"
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
        National Sports School
      </h1>
      <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
    </div>
  );
};

export default Header;
