import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';


function ChangePassword() {
  const [changePasswordInfo, setChangePasswordInfo] = useState({
    email: '',
    oldPassword: '',
    newPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyChangePasswordInfo = { ...changePasswordInfo };
    copyChangePasswordInfo[name] = value;
    setChangePasswordInfo(copyChangePasswordInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, oldPassword, newPassword } = changePasswordInfo;
    if (!email || !oldPassword || !newPassword) {
      return handleError('Please fill all the fields');
    }
    try {
      const url = 'http://localhost:8080/auth/change-password';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(changePasswordInfo)
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message || 'An error occurred';
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message || 'An error occurred');
    }
    
  };

  return (
    <div className="container">
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={changePasswordInfo.email}
          />
        </div>
        <div>
          <label htmlFor="oldPassword">Old Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="oldPassword"
            placeholder="Enter your old password"
            value={changePasswordInfo.oldPassword}
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="newPassword"
            placeholder="Enter your new password"
            value={changePasswordInfo.newPassword}
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ChangePassword;