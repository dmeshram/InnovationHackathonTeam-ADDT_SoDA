import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import {
  updateProfile,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';

import { FaArrowLeft } from 'react-icons/fa';
import styles from './EditProfilePage.module.css';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [reauthPassword, setReauthPassword] = useState('');
  const [requiresReauth, setRequiresReauth] = useState(false);
  const [updateAction, setUpdateAction] = useState(null); // 'email' | 'password'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setFormData({
          name: user.displayName || '',
          email: user.email || '',
          password: '',
        });
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReauth = async () => {
    try {
      const credential = EmailAuthProvider.credential(currentUser.email, reauthPassword);
      await reauthenticateWithCredential(currentUser, credential);

      if (updateAction === 'email') {
        await updateEmail(currentUser, formData.email);
      } else if (updateAction === 'password') {
        await updatePassword(currentUser, formData.password);
      }

      setRequiresReauth(false);
      alert('Re-authentication successful. Profile updated!');
      navigate('/dashboard');
    } catch (error) {
      alert('Re-authentication failed: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.name !== currentUser.displayName) {
        await updateProfile(currentUser, { displayName: formData.name });
      }

      if (formData.email !== currentUser.email) {
        try {
          await updateEmail(currentUser, formData.email);
        } catch (error) {
          if (error.code === 'auth/requires-recent-login') {
            setUpdateAction('email');
            setRequiresReauth(true);
            return;
          } else {
            throw error;
          }
        }
      }

      if (formData.password) {
        try {
          await updatePassword(currentUser, formData.password);
        } catch (error) {
          if (error.code === 'auth/requires-recent-login') {
            setUpdateAction('password');
            setRequiresReauth(true);
            return;
          } else {
            throw error;
          }
        }
      }

      alert('Profile updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      alert('Error updating profile: ' + error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.topBar}>
          <button onClick={() => navigate('/dashboard')} className={styles.backBtn}>
            <FaArrowLeft style={{ marginRight: '6px' }} />
            Back
          </button>
          <h2>Edit Profile</h2>
        </div>

        {requiresReauth ? (
          <>
            <p>This action requires re-authentication. Please enter your password:</p>
            <input
              type="password"
              placeholder="Enter current password"
              value={reauthPassword}
              onChange={(e) => setReauthPassword(e.target.value)}
            />
            <button onClick={handleReauth}>Re-authenticate</button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />

            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />

            <label>New Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />

            <button type="submit">Update Profile</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfilePage;
