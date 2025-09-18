import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ allowedRole }) {
  const userStr = localStorage.getItem('user');
  console.log('ProtectedRoute check user:', userStr);

  if (!userStr) {
    console.log('No user found, redirect to login');
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userStr);
  console.log('User role:', user.role, 'Allowed role:', allowedRole);

  if (allowedRole && user.role !== allowedRole) {
    console.log('User role not authorized, redirect to unauthorized');
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
