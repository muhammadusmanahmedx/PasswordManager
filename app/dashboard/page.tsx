'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Eye, EyeOff, Edit, Trash, LogOut, Plus, Search, X, Shield,
  Lock, Database, AlertTriangle, CheckCircle, Copy, ExternalLink
} from 'lucide-react';
import { Credential } from '@/lib/types';
import Link from 'next/link';

interface User {
  username: string;
  email: string;
}

export default function PasswordDashboard() {
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
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // New state to prevent double-clicks

  // Password strength evaluation function
  const evaluatePasswordStrength = (password: string) => {
    if (!password) return 'weak';

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const isLongEnough = password.length >= 8;

    const strength =
      [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars, isLongEnough]
        .filter(Boolean).length;

    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch('/api/auth/user', { credentials: 'include' });
      if (res.ok) {
        const userData = await res.json();
        setCurrentUser(userData);
      } else {
        router.push('/login');
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Unable to load user data');
    }
  };

  const fetchCredentials = async () => {
    try {
      const res = await fetch('/api/credentials', { credentials: 'include' });
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
    fetchCurrentUser();
    fetchCredentials();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // New useEffect to clear error message after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (copiedField) {
      const timer = setTimeout(() => {
        setCopiedField(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedField]);

  useEffect(() => {
    setPasswordStrength(evaluatePasswordStrength(newCredential.password));
  }, [newCredential.password]);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
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
        credentials: 'include',
        body: JSON.stringify(newCredential),
      });
      if (res.ok) {
        setNewCredential({ websiteUrl: '', username: '', password: '' });
        setEditingId(null);
        setSuccessMessage(editingId ? 'Credential successfully updated!' : 'New credential successfully added!');
        await fetchCredentials();
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Failed to save credential');
      }
    } catch (err) {
      console.error('Error submitting credential:', err);
      setError('An error occurred while saving the credential');
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
    if (!deleteId || isDeleting) return;

    setIsDeleting(true); // Disable further clicks
    try {
      const res = await fetch(`/api/credentials/${deleteId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (res.ok) {
        await fetchCredentials();
        setSuccessMessage('Credential successfully deleted!');
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Failed to delete credential');
      }
    } catch (err) {
      console.error('Error deleting credential:', err);
      setError('An error occurred while deleting the credential');
    } finally {
      setIsDeleting(false); // Re-enable the button
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const generateSecurePassword = () => {
    const length = 16;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    setNewCredential({ ...newCredential, password });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
  };

  const getWebsiteIcon = (url: string) => {
    try {
      const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch {
      return '/api/placeholder/32/32';
    }
  };

  const filteredCredentials = credentials.filter(cred =>
    cred.websiteUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cred.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderPasswordStrengthIndicator = () => {
    const colors = {
      weak: 'bg-red-500',
      medium: 'bg-yellow-500',
      strong: 'bg-green-500'
    };

    return (
      <div className="mt-1">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${colors[passwordStrength]}`}
            style={{
              width: passwordStrength === 'weak' ? '33%' :
                passwordStrength === 'medium' ? '66%' : '100%'
            }}
          ></div>
        </div>
        <p className="text-xs mt-1 text-gray-600">
          Password strength:
          <span
            className={`font-medium ml-1 ${
              passwordStrength === 'weak' ? 'text-red-500' :
              passwordStrength === 'medium' ? 'text-yellow-500' : 'text-green-500'
            }`}
          >
            {passwordStrength}
          </span>
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center mb-0">
              <div className="bg-green-600 rounded-full p-2">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">PassManager</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full h-8 w-8 flex items-center justify-center mr-2">
                  <span className="text-green-600 font-semibold">
                    {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="text-gray-700 cursor-default hidden md:inline">
                  {currentUser?.username || 'User'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-green-600 transition-colors cursor-pointer"
              >
                <LogOut size={18} className="mr-1" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-6xl py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 cursor-default">Password Dashboard</h1>
          <button
            onClick={() => setShowSecurityInfo(!showSecurityInfo)}
            className="flex items-center text-green-600 hover:text-green-800 transition-colors cursor-pointer bg-green-50 px-3 py-1 rounded-full text-sm"
          >
            <Lock size={16} className="mr-1" />
            <span>Security Info</span>
          </button>
        </div>

        {/* Security Information Panel */}
        {showSecurityInfo && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-8 p-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Lock className="text-green-600 mr-2" size={20} />
              Security Information
            </h2>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-4">
              <p className="text-green-800">
                <strong>AES-256 Encryption:</strong> Your passwords are encrypted using AES-256, one of the most secure encryption standards available.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Database size={18} className="text-green-600 mr-2" />
                  Data Storage
                </h3>
                <p className="text-gray-600 text-sm">
                  Your password data is encrypted before storage. Even in the unlikely event of a data breach,
                  your credentials would remain protected behind strong encryption.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <AlertTriangle size={18} className="text-yellow-600 mr-2" />
                  Password Guidelines
                </h3>
                <ul className="text-gray-600 text-sm list-disc pl-5">
                  <li>Use a unique password for each account</li>
                  <li>Include uppercase, lowercase, numbers, and symbols</li>
                  <li>Use passwords with at least 12 characters</li>
                  <li>Avoid using personal information in your passwords</li>
                </ul>
              </div>
            </div>
            <button
              onClick={() => setShowSecurityInfo(false)}
              className="mt-4 text-green-600 hover:text-green-800 transition-colors"
            >
              Close
            </button>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow-sm flex items-center animate-fadeIn">
            <CheckCircle className="mr-2" size={20} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm flex items-center animate-fadeIn">
            <AlertTriangle className="mr-2" size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Add/Edit Credential Form */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 cursor-default flex items-center">
              {editingId ? (
                <>
                  <Edit className="text-green-600 mr-2" size={20} />
                  Edit Credential
                </>
              ) : (
                <>
                  <Plus className="text-green-600 mr-2" size={20} />
                  Add New Credential
                </>
              )}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 cursor-default">
                    Website Name
                  </label>
                  <input
                    type="text"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1 cursor-default">
                    Username
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1 cursor-default">
                    Password
                  </label>
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
                  {renderPasswordStrengthIndicator()}
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  onClick={generateSecurePassword}
                  className="text-green-600 border border-green-600 px-4 py-2 rounded hover:bg-green-50 transition-colors cursor-pointer flex items-center"
                >
                  <Lock size={16} className="mr-1" />
                  Generate Strong Password
                </button>
                <div className="flex">
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
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none transition-colors cursor-pointer flex items-center"
                  >
                    {editingId ? (
                      <>
                        <CheckCircle size={16} className="mr-1" />
                        Update Credential
                      </>
                    ) : (
                      <>
                        <Plus size={16} className="mr-1" />
                        Add Credential
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Saved Credentials Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 md:mb-0 cursor-default flex items-center">
                <Database className="text-green-600 mr-2" size={18} />
                Your Saved Credentials
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {filteredCredentials.length} items
                </span>
              </h3>
              <div className="relative w-full md:w-64">
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
                    <th className="p-3 font-medium text-gray-700 cursor-default">#</th>
                    <th className="p-3 font-medium text-gray-700 cursor-default">Website</th>
                    <th className="p-3 font-medium text-gray-700 cursor-default">Username</th>
                    <th className="p-3 font-medium text-gray-700 cursor-default">Password</th>
                    <th className="p-3 font-medium text-gray-700 cursor-default">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCredentials.length > 0 ? (
                    filteredCredentials.map((cred, index) => (
                      <tr key={cred._id} className="border-t hover:bg-gray-50 transition-colors">
                        <td className="p-3 text-gray-700 cursor-default font-medium">
                          {index + 1}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <img
                              src={getWebsiteIcon(cred.websiteUrl)}
                              alt="Site Icon"
                              className="h-5 w-5 mr-2 rounded-sm"
                            />
                            <div className="flex flex-col">
                              <span className="text-gray-800 cursor-default font-medium">
                                {cred.websiteUrl}
                              </span>
                              <a
                                href={`https://${cred.websiteUrl.replace(/^https?:\/\//, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-green-600 hover:text-green-800 flex items-center mt-1"
                              >
                                <ExternalLink size={12} className="mr-1" />
                                Visit site
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <span className="text-gray-700 cursor-default">{cred.username}</span>
                            <button
                              onClick={() => copyToClipboard(cred.username, `username-${cred._id}`)}
                              className="ml-2 text-gray-500 hover:text-green-600 transition-colors cursor-pointer"
                              title="Copy username"
                            >
                              <Copy size={14} />
                            </button>
                            {copiedField === `username-${cred._id}` && (
                              <span className="text-xs text-green-600 ml-1">Copied!</span>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <span className="text-gray-700 cursor-default font-mono">
                              {showPasswords[cred._id] ? cred.password : '•••••••••'}
                            </span>
                            <button
                              onClick={() => togglePasswordVisibility(cred._id)}
                              className="ml-2 text-gray-500 hover:text-green-600 transition-colors cursor-pointer"
                              title={showPasswords[cred._id] ? 'Hide password' : 'Show password'}
                            >
                              {showPasswords[cred._id] ?
                                <EyeOff size={14} /> :
                                <Eye size={14} />
                              }
                            </button>
                            {showPasswords[cred._id] && (
                              <button
                                onClick={() => copyToClipboard(cred.password, `password-${cred._id}`)}
                                className="ml-2 text-gray-500 hover:text-green-600 transition-colors cursor-pointer"
                                title="Copy password"
                              >
                                <Copy size={14} />
                              </button>
                            )}
                            {copiedField === `password-${cred._id}` && (
                              <span className="text-xs text-green-600 ml-1">Copied!</span>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleEdit(cred)}
                              className="text-green-600 hover:text-green-800 transition-colors cursor-pointer rounded-full p-1 hover:bg-green-50"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => initiateDelete(cred._id)}
                              className="text-red-500 hover:text-red-700 transition-colors cursor-pointer rounded-full p-1 hover:bg-red-50"
                              title="Delete"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-gray-500 cursor-default">
                        {searchTerm ? (
                          <div className="flex flex-col items-center">
                            <Search size={24} className="mb-2 text-gray-400" />
                            <p>No credentials match your search</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <Database size={24} className="mb-2 text-gray-400" />
                            <p>No credentials saved yet</p>
                            <p className="text-sm text-gray-400 mt-1">Add your first credential above</p>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Security Features Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col items-center text-center">
            <div className="bg-green-100 rounded-full p-3 mb-3">
              <Lock size={24} className="text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">AES-256 Encryption</h3>
            <p className="text-gray-600 text-sm">
              Your passwords are protected with military-grade AES-256 encryption
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col items-center text-center">
            <div className="bg-blue-100 rounded-full p-3 mb-3">
              <Shield size={24} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Secure Storage</h3>
            <p className="text-gray-600 text-sm">
              Data stored in encrypted format and protected against unauthorized access
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col items-center text-center">
            <div className="bg-purple-100 rounded-full p-3 mb-3">
              <AlertTriangle size={24} className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Password Strength</h3>
            <p className="text-gray-600 text-sm">
              Analysis and recommendations to improve your password security
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t pt-6 text-center text-gray-500 text-sm">
          <p>PassManager © 2025 - Secure password storage solution</p>
        </footer>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-red-600 flex items-center">
                <AlertTriangle size={20} className="mr-2" />
                Confirm Deletion
              </h3>
              <button
                onClick={cancelDelete}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="bg-red-50 p-4 rounded-md mb-4 flex">
              <AlertTriangle size={24} className="text-red-500 mr-3 flex-shrink-0" />
              <p className="text-gray-800">
                Are you sure you want to delete this credential? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center"
                disabled={isDeleting} // Disable button during deletion
              >
                <Trash size={16} className="mr-1" />
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Additional styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}