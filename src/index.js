import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DashboardContent from './components/Layout/Dashboard'

if(localStorage.getItem("token") === null &&
  localStorage.getItem("usuId") === null &&
  localStorage.getItem("usuEmail") === null &&
  localStorage.getItem("usuName") === null &&
  localStorage.getItem("usuStatus") === null &&
  localStorage.getItem("rolId") === null){
    ReactDOM.render(<App />, document.getElementById('root'));
}else{
  ReactDOM.render(<DashboardContent />, document.getElementById('root'));
}


