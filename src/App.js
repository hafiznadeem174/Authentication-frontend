import { Navigate, Route, Routes, Router } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import CustomerPage from './pages/CustomerPage';
import CategoryPage from './pages/CategoryPage';
import ChangePassword from './pages/ChangePassword';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <RefreshHandler setAuthenticated={setAuthenticated} />
      
        <Routes>
           <Route path="/" element={<Navigate to="/login" />} />
           <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/categories" element={<CategoryPage />} />
           <Route path="/change-password" element={<PrivateRoute element={<ChangePassword />} />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      
    </div>
  );
}

export default App;