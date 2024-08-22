import React from 'react';
import '../styles/Login.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        login();
        navigate('/');
    };
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">Log in to access your account</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
