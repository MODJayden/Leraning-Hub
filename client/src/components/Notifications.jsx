// src/components/Notifications.jsx
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
/* 
  useEffect(() => {
    const socket = io("http://localhost:5173"); // Replace with your server URL

    socket.on("notification", (message) => {
      setNotifications((prev) => [...prev, message]);
    });

    return () => socket.disconnect();
  }, []); */

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {notifications.map((notification, index) => (
        <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
          <p className="text-gray-800 dark:text-gray-200">{notification}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;