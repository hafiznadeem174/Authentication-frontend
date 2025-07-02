// src/pages/ForgotPassword.js
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return handleError('Email is required');

    try {
      const response = await fetch('http://localhost:8080/auth/send-reset-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
      } else {
        handleError(result.message || 'Failed to send reset link');
      }
    } catch (err) {
      handleError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Link</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
