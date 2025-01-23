import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ClientDevices.css";

const ClientDevices = () => {
    const { userId: routeUserId } = useParams();
    const userId = routeUserId || localStorage.getItem("userId");
    
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/admin/devices/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch devices");
        }
        const data = await response.json();
        setDevices(data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchDevices();
  }, [userId]);

  return (
    <div className="client-devices-container">
      <h1 className="client-devices-title">Your Devices</h1>
      <ul className="client-devices-list">
        {devices.length > 0 ? (
          devices.map((device) => (
            <li key={device.id} className="client-device-item">
              {device.name}
            </li>
          ))
        ) : (
          <p className="no-devices-message">No devices found.</p>
        )}
      </ul>
    </div>
  );
};

export default ClientDevices;
