import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Products from './components/Products';
import Orders from './components/Orders';
import ProtectedLayout from './components/ProtectedLayout';

const App = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/products" /> : <Login />}
      />
    
      {/* Protected */}
      <Route element={<ProtectedLayout />}>
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />

        {/* Redirect any unknown route */}
        <Route path="*" element={<Navigate to="/products" />} />
      </Route>
    </Routes>
  );
};

export default App;
