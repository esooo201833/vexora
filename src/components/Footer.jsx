/**
 * Footer Component
 * Site footer with links, contact info, and copyright
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Camera, Briefcase, MessageCircle, Home, Building2, PhoneCall } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/units', label: 'Browse Units', icon: Building2 },
    { to: '/contact', label: 'Contact Us', icon: PhoneCall },
  ];

  const propertyTypes = [
    'Villa',
    'Apartment',
    'Chalet',
    'Penthouse',
    'Commercial',
    'Office',
  ];

  const socialLinks = [
    { icon: Globe, href: '#', label: 'Facebook' },
    { icon: Camera, href: '#', label: 'Instagram' },
    { icon: Briefcase, href: '#', label: 'LinkedIn' },
    { icon: MessageCircle, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-gold-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="text-2xl font-bold text-white">Vexora</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Your trusted partner in finding the perfect property. We connect you with premium real estate across Egypt.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 group"
                  >
                    <link.icon className="w-4 h-4 group-hover:text-gold-400 transition-colors" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Property Types</h3>
            <ul className="space-y-2">
              {propertyTypes.map((type) => (
                <li key={type}>
                  <Link
                    to={`/units?type=${type}`}
                    className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">123 Real Estate Street, New Cairo, Egypt</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <a href="tel:+201234567890" className="text-sm hover:text-white transition-colors">
                  +20 123 456 7890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <a href="mailto:info@vexora.com" className="text-sm hover:text-white transition-colors">
                  info@vexora.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <p className="text-sm text-gray-500">
              {currentYear} Vexora Estates. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <span>|</span>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
