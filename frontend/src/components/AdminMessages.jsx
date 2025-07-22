import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/api/contact") // make sure Vite proxy is set up
      .then(res => setMessages(res.data))
      .catch(err => console.error("Error fetching messages:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        messages.map(msg => (
          <div key={msg._id} className="border p-3 rounded mb-3 bg-zinc-900 text-white">
            <p className="font-semibold">{msg.name} ({msg.email})</p>
            <p>{msg.message}</p>
            <small>{new Date(msg.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}
