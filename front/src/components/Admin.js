import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import UserManagement from "./UserManagement"
import DeviceManagement from "./DeviceManagement";
import AdminChat from "./ChatComponent";
import "../styles/admin.css";

const Admin = () => {
  return (
    <div className="admin-container">
      <nav className="admin-menu">
        <ul>
          <li>
            <Link to="/admin/users">Users</Link>
          </li>
          <li>
            <Link to="/admin/devices">Devices</Link>
          </li>
          <li>
            <Link to="/admin/chat">Chat</Link>
          </li>
        </ul>
      </nav>
      <div className="admin-content">
        <Routes>
          <Route path="users" element={<UserManagement />} />
          <Route path="devices" element={<DeviceManagement/>} />
          <Route path="chat" element={<AdminChat/>} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
