/**
 * Vexora Estates - Real Estate Application
 * Main App component with routing configuration
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Units from './pages/Units';
import UnitDetail from './pages/UnitDetail';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/units" element={<Units />} />
              <Route path="/unit/:id" element={<UnitDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              {/* Catch-all route for 404 */}
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                    <p className="text-gray-600 mb-6">Page not found</p>
                    <a href="/" className="btn-primary">Go Home</a>
                  </div>
                </div>
              } />
            </Routes>
          </Layout>
        </AnimatePresence>
      </Router>
    </LanguageProvider>
  );
}

export default App;
