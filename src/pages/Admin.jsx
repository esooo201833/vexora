/**
 * Admin Dashboard
 * Manage messages and view units
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageSquare, Building2, 
  Search, Eye, Trash2, CheckCircle, Mail,
  ChevronLeft, ChevronRight, Phone, Calendar,
  LogIn, Lock, User, LogOut
} from 'lucide-react';
import { units } from '../data/units';

const ADMIN_EMAIL = 'admin@test.com';
const ADMIN_PASSWORD = '33145612';

// Mock messages data - in production, this would come from a backend
const MOCK_MESSAGES = [
  { id: 1, name: 'Ahmed Mohamed', email: 'ahmed@test.com', phone: '+20 123 456 7890', unit: 'TOWN in Tawny', message: 'I am interested in this property', date: '2026-04-09', status: 'unread' },
  { id: 2, name: 'Sara Ali', email: 'sara@test.com', phone: '+20 111 222 3333', unit: 'Villa in Hyde Park', message: 'Is this still available?', date: '2026-04-08', status: 'read' },
];

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Check if already logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email === ADMIN_EMAIL && loginForm.password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem('adminLoggedIn', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    setLoginForm({ email: '', password: '' });
  };

  // Load messages from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('contactMessages');
    if (stored) {
      const parsed = JSON.parse(stored);
      setMessages(prev => [...parsed, ...prev]);
    }
  }, []);

  const stats = {
    totalMessages: messages.length,
    unreadMessages: messages.filter(m => m.status === 'unread').length,
    totalUnits: units.length,
    featuredUnits: units.filter(u => u.featured).length,
  };

  const filteredMessages = messages.filter(msg => 
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUnits = units.filter(unit =>
    unit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginatedUnits = filteredUnits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const markAsRead = (id) => {
    setMessages(messages.map(m => m.id === id ? { ...m, status: 'read' } : m));
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter(m => m.id !== id));
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  const totalPages = Math.ceil(
    (activeTab === 'messages' ? filteredMessages.length : filteredUnits.length) / itemsPerPage
  );

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-600 mt-2">Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Email
              </label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="admin@test.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>
            {loginError && (
              <p className="text-red-500 text-sm">{loginError}</p>
            )}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-900 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-white/80 mt-2">Manage messages and properties</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Messages', value: stats.totalMessages, icon: MessageSquare, color: 'bg-blue-500' },
            { label: 'Unread', value: stats.unreadMessages, icon: Mail, color: 'bg-red-500' },
            { label: 'Total Units', value: stats.totalUnits, icon: Building2, color: 'bg-green-500' },
            { label: 'Featured', value: stats.featuredUnits, icon: CheckCircle, color: 'bg-yellow-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-primary-800 rounded-xl p-6 shadow-sm"
            >
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-primary-800 rounded-xl shadow-sm mb-6">
          <div className="flex border-b">
            {[
              { id: 'messages', label: 'Messages', icon: MessageSquare },
              { id: 'units', label: 'Units', icon: Building2 },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setCurrentPage(1); setSelectedMessage(null); }}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'text-primary-600 border-b-2 border-primary-600' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {activeTab === 'messages' ? (
              <div className="space-y-4">
                {paginatedMessages.map(message => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedMessage?.id === message.id 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    } ${message.status === 'unread' ? 'bg-blue-50/50' : ''}`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{message.name}</h3>
                          {message.status === 'unread' && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">New</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          <Phone className="w-4 h-4 inline mr-1" />
                          {message.phone}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          <Building2 className="w-4 h-4 inline mr-1" />
                          {message.unit}
                        </p>
                        <p className="text-gray-700 text-sm">{message.message}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {message.date}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Link 
                          to={`/unit/${units.find(u => u.title === message.unit)?.id || ''}`}
                          className="p-2 text-blue-400 hover:bg-primary-700 rounded-lg transition-colors"
                          title="View Unit"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        {message.status === 'unread' && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); markAsRead(message.id); }}
                            className="p-2 text-green-400 hover:bg-primary-700 rounded-lg transition-colors"
                            title="Mark as Read"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteMessage(message.id); }}
                          className="p-2 text-red-400 hover:bg-primary-700 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {paginatedMessages.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No messages found</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedUnits.map(unit => (
                  <motion.div
                    key={unit.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 rounded-xl border border-gray-200 hover:border-primary-300 transition-all"
                  >
                    <img src={unit.images[0]} alt={unit.title} className="w-full h-32 object-cover rounded-lg mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-1">{unit.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{unit.location}</p>
                    <p className="text-primary-600 font-semibold mb-3">
                      {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(unit.price)}
                    </p>
                    <Link 
                      to={`/unit/${unit.id}`}
                      className="flex items-center justify-center space-x-2 w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Unit</span>
                    </Link>
                  </motion.div>
                ))}
                {paginatedUnits.length === 0 && (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No units found</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center space-x-2 px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-2 px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
