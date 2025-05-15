'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Edit, Trash, LogOut, Plus, Search, X } from 'lucide-react';
import { Credential } from '@/lib/types';

export default function PasswordTable() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [newCredential, setNewCredential] = useState({
    websiteUrl: '',
    username: '',
    password: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchCredentials = async () => {
    try {
      const res = await fetch('/api/credentials');
      if (res.ok) {
        const data = await res.json();
        setCredentials(data);
      } else {
        setError('Failed to fetch credentials');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        router.push('/');
      } else {
        setError('Logout failed');
      }
    } catch (err) {
      setError('An error occurred during logout');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/credentials/${editingId}` : '/api/credentials';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCredential),
      });
      if (res.ok) {
        setNewCredential({ websiteUrl: '', username: '', password: '' });
        setEditingId(null);
        fetchCredentials();
      } else {
        setError('Failed to save credential');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  const handleEdit = (credential: Credential) => {
    setEditingId(credential._id);
    setNewCredential({
      websiteUrl: credential.websiteUrl,
      username: credential.username,
      password: credential.password,
    });
  };

  const initiateDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    
    try {
      const res = await fetch(`/api/credentials/${deleteId}`, { method: 'DELETE' });
      if (res.ok) {
        fetchCredentials();
      } else {
        setError('Failed to delete credential');
      }
    } catch (err) {
      setError('An error occurred');
    }
    
    // Close modal and reset deleteId
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCredentials = credentials.filter(cred => 
    cred.websiteUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cred.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold text-green-600 cursor-default">PassManager</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 cursor-default">Welcome, User</span>
              <button 
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-green-600 transition-colors cursor-pointer"
              >
                <LogOut size={18} className="mr-1" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-5xl py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 cursor-default">Password Dashboard</h1>
        
        {/* Add/Edit Credential Form - Always Visible */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 cursor-default">
              {editingId ? 'Edit Credential' : 'Add New Credential'}
            </h2>
            {error && <p className="text-red-500 mb-4 cursor-default">{error}</p>}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 cursor-default">Website Name</label>
                  <input
                    type="String"
                    placeholder="example.com"
                    value={newCredential.websiteUrl}
                    onChange={(e) =>
                      setNewCredential({ ...newCredential, websiteUrl: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500 cursor-text"
                    required
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 cursor-default">Username</label>
                  <input
                    type="text"
                    placeholder="yourname@example.com"
                    value={newCredential.username}
                    onChange={(e) =>
                      setNewCredential({ ...newCredential, username: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500 cursor-text"
                    required
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 cursor-default">Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={newCredential.password}
                      onChange={(e) =>
                        setNewCredential({ ...newCredential, password: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500 cursor-text"
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setNewCredential({ websiteUrl: '', username: '', password: '' });
                    }}
                    className="mr-2 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none transition-colors cursor-pointer"
                >
                  {editingId ? 'Update Credential' : 'Add Credential'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Saved Credentials Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 cursor-default">Your Saved Credentials</h3>
              <div className="relative w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search credentials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500 cursor-text"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 font-medium text-gray-700 cursor-default">ID</th>
                    <th className="p-3 font-medium text-gray-700 cursor-default">Website URL</th>
                    <th className="p-3 font-medium text-gray-700 cursor-default">Username</th>
                    <th className="p-3 font-medium text-gray-700 cursor-default">Password</th>
                    <th className="p-3 font-medium text-gray-700 cursor-default">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCredentials.length > 0 ? (
                    filteredCredentials.map((cred, index) => (
                      <tr key={cred._id} className="border-t hover:bg-gray-50">
                        <td className="p-3 text-gray-700 cursor-default">{index + 1}</td>
                        <td className="p-3 text-gray-700 cursor-default">{cred.websiteUrl}</td>
                        <td className="p-3 text-gray-700 cursor-default">{cred.username}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <span className="text-gray-700 cursor-default">
                              {showPasswords[cred._id] ? cred.password : '•••••••••'}
                            </span>
                            <button
                              onClick={() => togglePasswordVisibility(cred._id)}
                              className="ml-2 text-gray-500 hover:text-green-600 transition-colors cursor-pointer"
                              title={showPasswords[cred._id] ? 'Hide password' : 'Show password'}
                            >
                              {showPasswords[cred._id] ? 
                                <EyeOff size={18} /> : 
                                <Eye size={18} />
                              }
                            </button>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleEdit(cred)}
                              className="text-green-600 hover:text-green-800 transition-colors cursor-pointer"
                              title="Edit"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => initiateDelete(cred._id)}
                              className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                              title="Delete"
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-500 cursor-default">
                        {searchTerm ? 'No credentials match your search' : 'No credentials saved yet'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Confirm Deletion</h3>
              <button 
                onClick={cancelDelete}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this credential? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}