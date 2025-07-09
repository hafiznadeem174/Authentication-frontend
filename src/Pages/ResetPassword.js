// src/pages/ResetPassword.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword) return handleError('Password is required');

    try {
      const response = await fetch(`http://localhost:8080/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword })
      });
      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
        setTimeout(() => navigate('/login'),500);
      } else {
        handleError(result.message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ResetPassword;
