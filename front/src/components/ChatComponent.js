import React, { useState, useEffect, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import "../styles/ChatComponent.css";

const ChatComponent = () => {
  const [users, setUsers] = useState([]); // List of users
  const [selectedUser, setSelectedUser] = useState(""); // Selected recipient
  const [message, setMessage] = useState(""); // Current message
  const [messages, setMessages] = useState([]); // All messages
  const [isTyping, setIsTyping] = useState(false); // Typing indicator
  const stompClient = useRef(null); // Reference to WebSocket connection
  const currentUserId = localStorage.getItem("userId"); // Get current user's ID from localStorage
  const typingTimeout = useRef(null); // Timeout reference for typing indicator

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8081/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8082/ws");
    stompClient.current = Stomp.over(() => socket);
  
    stompClient.current.connect({}, () => {
      console.log("WebSocket connected");
  
      // Subscribe to a personalized queue for messages
      stompClient.current.subscribe(`/user/${currentUserId}/queue/messages`, (msg) => {
        const receivedMessage = JSON.parse(msg.body);
        setMessages((prev) => [...prev, receivedMessage]);
      });
  
      // Subscribe to typing indicator with validation
      stompClient.current.subscribe(`/user/${currentUserId}/queue/typing`, (msg) => {
        const typingEvent = JSON.parse(msg.body);
        if (typingEvent.sender === selectedUser && typingEvent.recipient === currentUserId) {
          setIsTyping(true);
          clearTimeout(typingTimeout.current);
          typingTimeout.current = setTimeout(() => setIsTyping(false), 2000); // Reset after 2 seconds
        }
      });
    });
  
    return () => {
      stompClient.current.disconnect();
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, [currentUserId, selectedUser]); // Add selectedUser as a dependency
  

  // Handle sending a message
  const handleSendMessage = () => {
    if (selectedUser && message.trim()) {
      const chatMessage = {
        sender: currentUserId, // Use the current user's ID
        recipient: selectedUser,
        content: message,
        type: "CHAT",
      };

      stompClient.current.send(
        "/app/sendMessage",
        {},
        JSON.stringify(chatMessage)
      );
      setMessages((prev) => [...prev, chatMessage]); // Add to local state for display
      setMessage(""); // Clear the input
    }
  };

  // Handle typing event
  const handleTyping = () => {
    if (selectedUser) {
      stompClient.current.send(
        "/app/typing",
        {},
        JSON.stringify({ sender: currentUserId, recipient: selectedUser })
      );
    }
  };

  return (
    <div className="admin-chat-container">
      <div className="chat-header">
        <label htmlFor="user-select" className="user-select-label">
          Select User:
        </label>
        <select
          id="user-select"
          className="user-select-dropdown"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">-- Select a User --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name || `User ${user.id}`} {/* Fallback to User ID */}
            </option>
          ))}
        </select>
      </div>
      <div className="chat-window">
        {messages
          .filter(
            (msg) =>
              (msg.recipient === selectedUser && msg.sender === currentUserId) || // Sent messages
              (msg.sender === selectedUser && msg.recipient === currentUserId) // Received messages
          )
          .map((msg, index) => (
            <p
              key={index}
              className={`chat-message ${msg.sender === currentUserId ? "sent" : "received"}`}
            >
              {msg.content}
            </p>
          ))}
        {isTyping && <p className="typing-indicator">Typing...</p>}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleTyping}
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
