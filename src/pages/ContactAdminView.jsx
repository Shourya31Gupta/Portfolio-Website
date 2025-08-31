import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { FaTrash, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';

export default function ContactAdminView() {
  const { user, logout } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        const { error } = await supabase
          .from('contacts')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Failed to delete contact');
      }
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading contacts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-900 border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a href="/" className="text-blue-400 hover:text-blue-300 flex items-center space-x-2">
              <FaArrowLeft />
              <span>Back to Portfolio</span>
            </a>
            <h1 className="text-2xl font-bold">Contact Admin Panel</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-zinc-300">Welcome, {user?.username}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Contact Submissions ({contacts.length})</h2>
          <p className="text-zinc-400">Manage contact form submissions from your portfolio</p>
        </div>

        {contacts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-400 text-lg">No contact submissions yet</p>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-lg border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-800/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{contact.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-300">{contact.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-zinc-300 max-w-xs truncate">{contact.message}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-400">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => deleteContact(contact.id)}
                          className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-400/10 transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
