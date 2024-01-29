import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/login';
import Signup from './components/signup';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ToastContainer/>
    <Router>
       <Routes>
         <Route exact path="chat/:id" element={<App toast={toast}/>}/>
         <Route exact path="/chat" element={<App toast={toast}/>}/>
         <Route exact path="/login" element={<Login toast={toast}/>}/>
         <Route exact path="/signup" element={<Signup toast={toast}/>}/>
       </Routes>
    </Router>
  </>

);

