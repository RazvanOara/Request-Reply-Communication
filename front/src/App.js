import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Client from "./components/Client";

function App() {
  return (
    <div className="app">
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />
        {/* Admin Route */}
        <Route path="/admin/*" element={<Admin />} />
        {/* Client Route */}
        <Route path="/client/*" element={<Client />} />
        {/* 404 Fallback */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
