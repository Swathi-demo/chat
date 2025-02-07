import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, roles = [], userRoles = [], children }) {
  console.log('User Roles:', userRoles); // Debug log
  console.log('Required Roles:', roles); // Debug log
  console.log('Is Authenticated:', isAuthenticated);

  const hasAccess = roles.every((role) => userRoles.includes(role)); // Validate roles

  if (isAuthenticated) {
    return hasAccess ? children : <Navigate to="/unauthorized" />;
  }

  return <Navigate to="/unauthorized" />;
}

export default ProtectedRoute;
