'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff, Edit, Trash } from 'lucide-react';
import { Credential } from '@/lib/types';

export default function PasswordTable() {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [newCredential, setNewCredential] = useState({
    websiteUrl: '',
    username: '',
    password: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState('');

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

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/credentials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchCredentials();
      } else {
        setError('Failed to delete credential');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {editingId ? 'Edit Credential' : 'Add Credential'}
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="url"
            placeholder="Website URL"
            value={newCredential.websiteUrl}
            onChange={(e) =>
              setNewCredential({ ...newCredential, websiteUrl: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={newCredential.username}
            onChange={(e) =>
              setNewCredential({ ...newCredential, username: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={newCredential.password}
            onChange={(e) =>
              setNewCredential({ ...newCredential, password: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId ? 'Update' : 'Add'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setNewCredential({ websiteUrl: '', username: '', password: '' });
            }}
            className="mt-4 ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Website URL</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Password</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {credentials.map((cred) => (
            <tr key={cred._id}>
              <td className="border p-2">{cred._id}</td>
              <td className="border p-2">{cred.websiteUrl}</td>
              <td className="border p-2">{cred.username}</td>
              <td className="border p-2 flex items-center">
                {showPasswords[cred._id] ? cred.password : '••••••••'}
                <button
                  onClick={() => togglePasswordVisibility(cred._id)}
                  className="ml-2"
                >
                  {showPasswords[cred._id] ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(cred)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(cred._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}