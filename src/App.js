import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';

function App() {

  const [isAuthenicated , setAuthenicated ] = useState(false);
  const PrivateRoute = ({element}) =>{
    return isAuthenicated ? element : <Navigate to="/login"/>
  }

  return (
    <div className="App">
      <RefreshHandler setAuthenicated = {setAuthenicated} />
     <Routes>
      <Route path="/" element= { <Navigate to= "/login"/>} />
      <Route path="/login" element={< Login />} />
      <Route path="/signup" element={< Signup />} />
      <Route path="/home" element={<PrivateRoute element={<Home />}/>} />
    
     </Routes>
    </div>
  );
}

export default App;
