import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import eruda from "eruda";
eruda.init()

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
