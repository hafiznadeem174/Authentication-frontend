import "./App.css"; // Assuming you have a CSS file for styles
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home';
import Success from './Pages/Success';
import NotFound from './Pages/NotFound';
import React from 'react';  

const App = () => {
    return <Router>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/success" element={<Success/>} />
            <Route path="*" element={<NotFound/>} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
        
            </Routes>
            <Toaster/>
    </Router>
};


export default App;