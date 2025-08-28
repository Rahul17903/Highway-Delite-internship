import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import api from '../api';

interface GoogleLoginButtonProps {
  onLogin: (token: string, user: { email: string; name: string }) => void;
}

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onLogin }) => {
  const handleSuccess = async (credentialResponse: any) => {
    try {   

      // Send token to backend
      const res = await api.post('/auth/google-login', {
        idToken: credentialResponse.credential,
      });

      onLogin(res.data.token, res.data.user);
    } catch (err) {
      console.error(err);
      alert('Google login failed');
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          alert('Google login failed');
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
