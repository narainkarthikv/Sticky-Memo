import React from 'react';
import '../styles/Register.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const {login} = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    // Simulate a register function
    console.log({name, username, email, password});
    login();
    navigate('/');
  };
  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Register</h1>
        <p className="register-subtitle">Create a new account</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
