/**
 * Logo Component
 * Customizable logo component
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = '', isScrolled = false }) => {
  const logoSrc = '/logo.jpg';

  return (
    <Link to="/" className={`flex items-center space-x-2 ${className}`}>
      <img 
        src={logoSrc} 
        alt="Vexora" 
        className="h-10 w-auto object-contain rounded-lg"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      
      {/* Fallback Logo Design */}
      <div className="hidden items-center">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-gold-500 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">V</span>
        </div>
        <span className={`ml-2 text-xl font-bold transition-colors duration-300 ${
          isScrolled ? 'text-primary-700' : 'text-white'
        }`}>
          Vexora
        </span>
      </div>
    </Link>
  );
};

export default Logo;
