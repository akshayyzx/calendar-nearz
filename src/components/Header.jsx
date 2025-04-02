import React from 'react';

const Header = () => {
  return (
    <div style={{ 
      backgroundColor: '#F25435', // Flamingo color
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '20px',
      position: 'relative'
    }}>
      <img 
        src="https://coruscating-kheer-a59585.netlify.app/static/media/logo.52c1adf0.svg" // Replace with your actual image URL
        alt="Logo" 
        style={{ 
          height: '55px', 
          // position: 'absolute', 
          top: '-10px', // Moves the logo above the header
          left: '20px' 
        }} 
      />
    </div>
  );
};

export default Header;
