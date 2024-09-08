import React from 'react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <Button label={"Sign Up"} onClick={() => navigate('/signup')} />
        <Button label={"Sign In"} onClick={() => navigate('/signin')} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100vh',
  },
  buttonContainer: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    display: 'flex',
    gap: '10px', 
  },
};
