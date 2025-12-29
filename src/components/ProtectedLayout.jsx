import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const ProtectedLayout = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) return <Navigate to="/" />;

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
