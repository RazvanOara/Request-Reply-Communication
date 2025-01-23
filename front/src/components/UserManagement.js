import React, { useState, useEffect } from "react";
import "../styles/UserManagement.css"

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedField, setEditedField] = useState({});
  const [newUser, setNewUser] = useState({ name: "", role: "CLIENT", email: "" });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8081/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const startEditingUser = (userId, user) => {
    setEditingUser(userId);
    setEditedField({ ...user });
  };

  const saveUserEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8081/api/admin/users/${editingUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedField),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();
      setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
      setEditingUser(null);
      setEditedField({});
    } catch (err) {
      console.error(err);
    }
  };

  const addUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8081/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const addedUser = await response.json();
      setUsers([...users, addedUser]);
      setNewUser({ name: "", role: "CLIENT", email: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8081/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management</h1>

      {/* Users Table */}
      <table border="1" cellPadding="10" style={{ marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingUser === user.id ? (
                  <input
                    value={editedField.name || user.name}
                    onChange={(e) => setEditedField({ ...editedField, name: e.target.value })}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUser === user.id ? (
                  <select
                    value={editedField.role || user.role}
                    onChange={(e) => setEditedField({ ...editedField, role: e.target.value })}
                  >
                    <option value="CLIENT">CLIENT</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editingUser === user.id ? (
                  <input
                    value={editedField.email || user.email}
                    onChange={(e) => setEditedField({ ...editedField, email: e.target.value })}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUser === user.id ? (
                  <button onClick={saveUserEdit}>Save</button>
                ) : (
                  <button onClick={() => startEditingUser(user.id, user)}>Edit</button>
                )}
              </td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add User Form */}
      <h3>Add New User</h3>
      <div>
        <input
          name="name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          placeholder="Name"
        />
        <select
          name="role"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="CLIENT">CLIENT</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <input
          name="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="Email"
        />
        <button onClick={addUser}>Add User</button>
      </div>
    </div>
  );
};

export default UserManagement;
