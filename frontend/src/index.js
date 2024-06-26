import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './components/Home';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/login';
import Signup from './components/signup';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Navbar';
import {Provider} from "react-redux";
import store from "./redux/store";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <Provider store={store}>
    <ToastContainer/>
    <Router>
       <Navbar/>
       <Routes>
         <Route exact path="/" element={<Home/>}/>
         <Route exact path="chat/:id/:type" element={<App toast={toast}/>}/>
         <Route exact path="/chat" element={<App toast={toast}/>}/>
         <Route exact path="/login" element={<Login toast={toast}/>}/>
         <Route exact path="/signup" element={<Signup toast={toast}/>}/>
       </Routes>
    </Router>
  </Provider>
  </>

);

