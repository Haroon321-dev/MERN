import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './store/auth.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Your Google Client ID (same as in backend .env)
const GOOGLE_CLIENT_ID = "1067226264787-3omj3tdktpsta2a6dhgnhnvuj1n0pl3i.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
  <AuthProvider>
    <StrictMode>
      <App />
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        bodyClassName='toastBody'
        className="toastClass"
      />
    </StrictMode>
  </AuthProvider> 
  </GoogleOAuthProvider>
);
