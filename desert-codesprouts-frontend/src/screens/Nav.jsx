import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import styles from './Nav.module.css';

const Nav = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      alert('Error logging out: ' + error.message);
    }
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <nav className={styles.navbar}>
      <h1>Dashboard</h1>
      <div className={styles['nav-actions']}>
        {user && <span style={{ color: 'white', marginRight: '1rem' }}>Hi, {user.displayName || 'User'}</span>}
        <button onClick={handleProfile}>Edit Profile</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Nav;
