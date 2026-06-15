import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

if (!codespaceName || !codespaceName.trim()) {
  console.warn(
    'VITE_CODESPACE_NAME is not defined. The frontend will use localhost fallback for API requests.'
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
