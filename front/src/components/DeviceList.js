import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DeviceList = () => {
  const { userId } = useParams(); // Get the userId from the URL
  const [devices, setDevices] = useState([]); // Devices array
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  // Function to fetch all devices
  const fetchAllDevices = async () => {
    setLoading(true); // Start loading
    setError(""); // Reset any previous errors

    try {
      const response = await fetch("http://localhost:8080/api/admin/devices"); // Fetch all devices from the API

      if (!response.ok) {
        throw new Error("Failed to fetch devices.");
      }

      const data = await response.json(); // Parse JSON response
      setDevices(data); // Set devices data to state
    } catch (err) {
      setError("Error fetching devices: " + err.message); // Set error if request fails
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch devices when the component mounts
  useEffect(() => {
    fetchAllDevices();
  }, []);

  // Filter devices by userId (from the URL)
  const filteredDevices = devices.filter((device) => {
    return userId ? device.userId.toString() === userId : true;
  });

  return (
    <div className="page-container">
      <h1>Devices for User ID: {userId}</h1>

      {/* Display loading or error messages */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Device Table */}
      {filteredDevices.length > 0 && (
        <table className="device-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Address</th>
              <th>Max Hourly Consumption</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.map((device) => (
              <tr key={device.id}>
                <td>{device.id}</td>
                <td>{device.description}</td>
                <td>{device.address}</td>
                <td>{device.maxHourlyConsumption}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* No devices message */}
      {filteredDevices.length === 0 && !loading && !error && (
        <p>No devices found for this User ID.</p>
      )}
    </div>
  );
};

export default DeviceList;
