/**
 * Footer Component
 * Site footer with links, contact info, and copyright
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Globe, Camera, Briefcase, MessageCircle, Home, Building2, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const quickLinks = [
    { to: '/', label: t('home'), icon: Home },
    { to: '/units', label: t('browseUnits'), icon: Building2 },
    { to: '/contact', label: t('contactUs'), icon: PhoneCall },
  ];

  const propertyTypes = [
    t('villa'),
    t('apartment'),
    t('chalet'),
    t('penthouse'),
    t('commercial'),
    t('office'),
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
              <img src="/logo.jpg" alt="Vexora" className="h-12 w-auto object-contain rounded-lg" />
            </Link>
            <p className="text-sm leading-relaxed">
              {t('footerText')}
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
            <h3 className="text-white font-semibold text-lg mb-4">{t('quickLinks')}</h3>
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
            <h3 className="text-white font-semibold text-lg mb-4">{t('propertyTypes')}</h3>
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
            <h3 className="text-white font-semibold text-lg mb-4">{t('contactUs')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <a href="tel:+201110182114" className="text-sm hover:text-white transition-colors">
                  +20 111 018 2114
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <a href="https://wa.me/201110182114" className="text-sm hover:text-white transition-colors">
                  WhatsApp: +20 111 018 2114
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
