/**
 * Contact Page
 * Contact form with WhatsApp and call buttons
 */

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Phone, Clock, Send, MessageCircle, 
  CheckCircle, Loader2, User, Building, FileText
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const location = useLocation();
  const { t, isRTL } = useLanguage();
  const initialUnit = location.state?.unitTitle || '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    unit: initialUnit,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = isRTL ? 'الاسم مطلوب' : 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = isRTL ? 'رقم الهاتف مطلوب' : 'Phone is required';
    if (!formData.message.trim()) newErrors.message = isRTL ? 'الرسالة مطلوبة' : 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Save message to localStorage
    const newMessage = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      unit: formData.unit,
      message: formData.message,
      date: new Date().toISOString().split('T')[0],
      status: 'unread'
    };
    
    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    localStorage.setItem('contactMessages', JSON.stringify([newMessage, ...existingMessages]));
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: '',
      phone: '',
      unit: '',
      message: '',
    });
  };

  const handleWhatsApp = () => {
    const message = `Hello Vexora Team, I'm interested in learning more about your properties. Please contact me.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/201110182114?text=${encodedMessage}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+201110182114';
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t('phoneWhatsApp'),
      content: '+20 111 018 2114',
      action: handleCall,
      actionLabel: t('callNow'),
    },
    {
      icon: Clock,
      title: t('workingHours'),
      content: t('sunThu'),
      action: null,
      actionLabel: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {t('contactUs')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            {t('contactDesc')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-primary-800 rounded-2xl p-6 shadow-sm"
                >
                  <div className="w-12 h-12 bg-primary-700 rounded-xl flex items-center justify-center mb-4">
                    <info.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                  <p className="text-gray-300 mb-3">{info.content}</p>
                  {info.action && (
                    <button
                      onClick={info.action}
                      className="text-gold-400 font-medium hover:text-gold-500 transition-colors"
                    >
                      {info.actionLabel} →
                    </button>
                  )}
                </motion.div>
              ))}

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-primary-800 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="font-semibold text-gray-900 mb-4">{t('quickContact')}</h3>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{t('whatsapp')}</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCall}
                    className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{t('callNow')}</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-primary-800 rounded-2xl shadow-sm p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{isRTL ? 'تم إرسال الرسالة!' : 'Message Sent!'}</h2>
                  <p className="text-gray-600 mb-6">
                    {isRTL ? 'شكراً لتواصلك معنا. سنتواصل معك خلال 24 ساعة.' : 'Thank you for contacting us. We\'ll get back to you within 24 hours.'}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-primary"
                  >
                    {isRTL ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mb-2">{t('sendMessage')}</h2>
                  <p className="text-gray-300 mb-8">
                    {t('contactFormDesc')}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        {t('fullName')} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-primary-700 text-white placeholder-gray-400 ${
                          errors.name ? 'border-red-500' : 'border-gray-600'
                        }`}
                        placeholder={isRTL ? 'أحمد محمد' : 'John Doe'}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Phone & Unit */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-primary-700 text-white placeholder-gray-400 ${
                            errors.phone ? 'border-red-500' : 'border-gray-600'
                          }`}
                          placeholder="+20 123 456 7890"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <Building className="w-4 h-4 inline mr-2" />
                          Interested Unit
                        </label>
                        <input
                          type="text"
                          name="unit"
                          value={formData.unit}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-600 bg-primary-700 text-white rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors placeholder-gray-400"
                          placeholder="Property name or ID (optional)"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <FileText className="w-4 h-4 inline mr-2" />
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none bg-primary-700 text-white placeholder-gray-400 ${
                          errors.message ? 'border-red-500' : 'border-gray-600'
                        }`}
                        placeholder="Tell us about your requirements..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
