import React from 'react';
import { Navigate } from 'react-router-dom';
import auth from '../auth/auth-helper';

// only admin can open these pages
function AdminRoute({ children }) {
  if (!auth.isAuthenticated()) {
    return <Navigate to="/signin" />;
  }
  if (!auth.isAdmin()) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Access denied</h2>
        <p>Only the admin can open this page.</p>
      </div>
    );
  }
  return children;
}

export default AdminRoute;