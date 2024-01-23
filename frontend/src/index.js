import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/login';
import Signup from './components/signup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
       <Routes>
         <Route exact path="/:id" element={<App/>}/>
         <Route exact path="/" element={<App/>}/>
         <Route exact path="/login" element={<Login/>}/>
         <Route exact path="/signup" element={<Signup/>}/>
       </Routes>
    </Router>
  </React.StrictMode>
);

