import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { FaEnvelope, FaUser, FaCalendar, FaTrash, FaEye, FaCheck, FaClock } from "react-icons/fa";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }

      setMessages(data || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const { error } = await supabase
          .from('contacts')
          .delete()
          .eq('id', id);

        if (error) {
          console.error("Error deleting message:", error);
          return;
        }

        // Remove from local state
        setMessages(messages.filter(msg => msg.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
          setShowModal(false);
        }
      } catch (err) {
        console.error("Error deleting message:", err);
      }
    }
  };

  const openMessage = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMessage(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
              <p className="text-gray-400 mt-2">Manage and respond to portfolio inquiries</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-900/50 text-blue-300 px-4 py-2 rounded-lg border border-blue-800">
                <span className="font-semibold">{messages.length}</span> messages
              </div>
              <button
                onClick={fetchMessages}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <FaEye className="text-sm" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Messages Grid */}
        {messages.length === 0 ? (
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-12 text-center">
            <FaEnvelope className="text-6xl text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No messages yet</h3>
            <p className="text-gray-500">When someone contacts you through your portfolio, their message will appear here.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className="bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <FaUser className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{message.name}</h3>
                          <p className="text-blue-400">{message.email}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {message.message.length > 150 
                          ? `${message.message.substring(0, 150)}...` 
                          : message.message
                        }
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <FaCalendar className="text-gray-500" />
                          <span>{formatDate(message.created_at)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaClock className="text-gray-500" />
                          <span>{new Date(message.created_at).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => openMessage(message)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <FaEye className="text-sm" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <FaTrash className="text-sm" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Modal */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-zinc-800">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Message Details</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white text-2xl font-bold transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{selectedMessage.name}</h3>
                    <p className="text-blue-400">{selectedMessage.email}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                  <h4 className="font-semibold text-gray-300 mb-2">Message:</h4>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <FaCalendar className="text-gray-500" />
                    <span>Received on {new Date(selectedMessage.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaClock className="text-gray-500" />
                    <span>{new Date(selectedMessage.created_at).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-zinc-700">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <FaTrash className="text-sm" />
                  <span>Delete Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
