/**
 * Layout Component
 * Wraps all pages with Navbar and Footer
 */

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-grow"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;
