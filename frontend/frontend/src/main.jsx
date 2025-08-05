import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// This line is the most important part for your styling.
// It imports all the Tailwind directives and your custom theme.
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);