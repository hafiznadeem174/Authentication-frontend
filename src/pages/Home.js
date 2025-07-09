import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
    } catch (err) {
      handleError(err.message || 'An error occurred');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
      <div className="container">
        <h1>Welcome, {loggedInUser}</h1>

        <div style={{ marginBottom: "1rem" }}>
          <button onClick={handleLogout}>Logout</button>
          <span style={{ marginLeft: "1rem" }}>
          <Link to="/change-password">Change Password</Link>
        </span>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <Link to="/customers">
            <button>Manage Customers</button>
          </Link>
          <Link to="/categories" style={{ marginLeft: "1rem" }}>
            <button>Manage Categories</button>
          </Link>
        </div>

        <div>
          <h2>📦 Products</h2>
          {products.map((item, index) => (
              <ul key={index}>
                <span>{item.name}: {item.price}</span>
              </ul>
          ))}
        </div>

        <ToastContainer />
      </div>
  );
}

export default Home;
