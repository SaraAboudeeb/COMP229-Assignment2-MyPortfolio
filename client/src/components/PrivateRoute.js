import React from 'react';
import { Navigate } from 'react-router-dom';
import auth from '../auth/auth-helper';

// only signed in users can open these pages
function PrivateRoute({ children }) {
  if (!auth.isAuthenticated()) {
    return <Navigate to="/signin" />;
  }
  return children;
}

export default PrivateRoute;