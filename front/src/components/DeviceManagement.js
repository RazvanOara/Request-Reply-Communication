import React, { useState, useEffect } from "react";
import "../styles/DeviceManagement.css";

const DeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [editingDevice, setEditingDevice] = useState(null);
  const [editedField, setEditedField] = useState({});
  const [newDevice, setNewDevice] = useState({
    userId: "",
    description: "",
    address: "",
    maxHourlyConsumption: "",
  });

  const fetchDevices = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/admin/devices");
      if (!response.ok) {
        throw new Error("Failed to fetch devices");
      }
      const data = await response.json();
      setDevices(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const startEditingDevice = (deviceId, device) => {
    setEditingDevice(deviceId);
    setEditedField({ ...device });
  };

  const saveDeviceEdit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/devices/${editingDevice}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedField),
      });

      if (!response.ok) {
        throw new Error("Failed to update device");
      }

      const updatedDevice = await response.json();
      setDevices(
        devices.map((device) =>
          device.id === updatedDevice.id ? updatedDevice : device
        )
      );
      setEditingDevice(null);
      setEditedField({});
    } catch (err) {
      console.error(err);
    }
  };

  const addDevice = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/admin/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDevice),
      });

      if (!response.ok) {
        throw new Error("Failed to add device");
      }

      const addedDevice = await response.json();
      setDevices([...devices, addedDevice]);
      setNewDevice({
        userId: "",
        description: "",
        address: "",
        maxHourlyConsumption: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteDevice = async (deviceId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/devices/${deviceId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete device");
      }

      setDevices(devices.filter((device) => device.id !== deviceId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="device-management-container">
      <h1>Device Management</h1>

      <table className="device-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Description</th>
            <th>Address</th>
            <th>Max Hourly Consumption</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>{device.id}</td>
              <td>{device.userId}</td>
              <td>
                {editingDevice === device.id ? (
                  <input
                    value={editedField.description || device.description}
                    onChange={(e) =>
                      setEditedField({
                        ...editedField,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  device.description
                )}
              </td>
              <td>
                {editingDevice === device.id ? (
                  <input
                    value={editedField.address || device.address}
                    onChange={(e) =>
                      setEditedField({
                        ...editedField,
                        address: e.target.value,
                      })
                    }
                  />
                ) : (
                  device.address
                )}
              </td>
              <td>
                {editingDevice === device.id ? (
                  <input
                    value={editedField.maxHourlyConsumption || device.maxHourlyConsumption}
                    onChange={(e) =>
                      setEditedField({
                        ...editedField,
                        maxHourlyConsumption: e.target.value,
                      })
                    }
                  />
                ) : (
                  device.maxHourlyConsumption
                )}
              </td>
              <td>
                {editingDevice === device.id ? (
                  <button onClick={saveDeviceEdit}>Save</button>
                ) : (
                  <button
                    onClick={() => startEditingDevice(device.id, device)}
                  >
                    Edit
                  </button>
                )}
              </td>
              <td>
                <button onClick={() => deleteDevice(device.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Device</h3>
      <div className="add-device-form">
        <input
          name="userId"
          value={newDevice.userId}
          onChange={(e) => setNewDevice({ ...newDevice, userId: e.target.value })}
          placeholder="User ID"
        />
        <input
          name="description"
          value={newDevice.description}
          onChange={(e) =>
            setNewDevice({ ...newDevice, description: e.target.value })
          }
          placeholder="Description"
        />
        <input
          name="address"
          value={newDevice.address}
          onChange={(e) => setNewDevice({ ...newDevice, address: e.target.value })}
          placeholder="Address"
        />
        <input
          name="maxHourlyConsumption"
          value={newDevice.maxHourlyConsumption}
          onChange={(e) =>
            setNewDevice({
              ...newDevice,
              maxHourlyConsumption: e.target.value,
            })
          }
          placeholder="Max Hourly Consumption"
        />
        <button onClick={addDevice}>Add Device</button>
      </div>
    </div>
  );
};

export default DeviceManagement;
