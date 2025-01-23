import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../styles/Client.css";
import ClientDevices from "./ClientDevices";
import ClientChat from "./ChatComponent";

const Client = () => {
  return (
    <div className="client-container">
      <nav className="client-menu">
        <ul>
          <li>
            <Link to="/client/devices">Devices</Link>
          </li>
          <li>
            <Link to="/client/chat">Chat</Link>
          </li>
        </ul>
      </nav>
      <div className="client-content">
        <Routes>
          <Route path="devices" element={<ClientDevices/>} />
          <Route path="chat" element={<ClientChat/>} />
        </Routes>
      </div>
    </div>
  );
};  

export default Client;
