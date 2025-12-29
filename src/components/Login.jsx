import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
  
    try{
      const res = await axios.post("http://localhost:3000/api/auth/login", {
      email: username,
      password,
    });
     const { token, user } = res.data;

    if (user.role !== "admin") {
      alert("You are not authorized as admin");
      return;
    }
     // store admin token
       localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminUser", JSON.stringify(user));
      navigate("/products");

    }
    catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">Login</button>
      </form>
    </div>
  );
};

export default Login;