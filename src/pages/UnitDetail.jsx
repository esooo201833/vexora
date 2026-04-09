/**
 * Unit Detail Page
 * Detailed view of a single property with image gallery and contact options
 */

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Bed, Bath, Maximize, MapPin, Home, Calendar, 
  Check, Phone, MessageCircle, Mail, Share2, Heart,
  Building, User, CheckCircle, FileText
} from 'lucide-react';
import ImageGallery from '../components/ImageGallery';
import { getUnitById, formatPrice } from '../data/units';

const UnitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const unit = getUnitById(id);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!unit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
          <Link to="/units">
            <button className="btn-primary">
              Browse Properties
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const message = `Hello, I'm interested in the property: ${unit.title} (ID: ${unit.id}) priced at ${formatPrice(unit.price)}. Please provide more information.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/201234567890?text=${encodedMessage}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+201234567890';
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: unit.title,
          text: `Check out this property: ${unit.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      {/* Navigation Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/units" className="hover:text-primary-600 transition-colors">Properties</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{unit.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                unit.status === 'Ready to Move'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {unit.status}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                {unit.type}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{unit.title}</h1>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2 text-primary-600" />
              <span className="text-lg">{unit.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLiked(!isLiked)}
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Share2 className="w-6 h-6 text-gray-600" />
            </motion.button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ImageGallery images={unit.images} title={unit.title} />
            </motion.div>

            {/* Quick Info Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <Bed className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                <p className="text-2xl font-bold text-gray-900">{unit.bedrooms}</p>
                <p className="text-sm text-gray-600">Bedrooms</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <Bath className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                <p className="text-2xl font-bold text-gray-900">{unit.bathrooms}</p>
                <p className="text-sm text-gray-600">Bathrooms</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <Maximize className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                <p className="text-2xl font-bold text-gray-900">{unit.size}</p>
                <p className="text-sm text-gray-600">Sq. Meters</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <Home className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                <p className="text-2xl font-bold text-gray-900">{unit.rooms}</p>
                <p className="text-sm text-gray-600">Total Rooms</p>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="flex border-b border-gray-200">
                {['overview', 'features', 'payment'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 px-6 font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
                      <p className="text-gray-600 leading-relaxed">{unit.description}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Building className="w-5 h-5 text-primary-600" />
                        <div>
                          <p className="text-sm text-gray-500">Developer</p>
                          <p className="font-medium text-gray-900">{unit.developer}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-primary-600" />
                        <div>
                          <p className="text-sm text-gray-500">Delivery Date</p>
                          <p className="font-medium text-gray-900">
                            {unit.deliveryDate === 'Ready' ? 'Ready to Move' : unit.deliveryDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary-600" />
                        <div>
                          <p className="text-sm text-gray-500">Finishing</p>
                          <p className="font-medium text-gray-900">{unit.finishing}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-primary-600" />
                        <div>
                          <p className="text-sm text-gray-500">Property ID</p>
                          <p className="font-medium text-gray-900">#{unit.id}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'features' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Property Features</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {unit.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'payment' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="bg-primary-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Plan</h3>
                      <div className="flex items-start space-x-3">
                        <FileText className="w-6 h-6 text-primary-600 mt-1" />
                        <div>
                          <p className="font-medium text-gray-900 text-lg">{unit.paymentPlan}</p>
                          <p className="text-gray-600 mt-2">
                            Flexible payment options available. Contact us for more details about 
                            financing and installment plans.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-200 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">Total Price</p>
                        <p className="text-2xl font-bold text-primary-600">{formatPrice(unit.price)}</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">Price per Sqm</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatPrice(Math.round(unit.price / unit.size))}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky top-24 space-y-6"
            >
              {/* Price Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <p className="text-3xl font-bold text-primary-600 mb-4">{formatPrice(unit.price)}</p>
                
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp Inquiry</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCall}
                    className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call Now</span>
                  </motion.button>
                  
                  <Link to="/contact" state={{ unitId: unit.id, unitTitle: unit.title }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center space-x-2 bg-gold-500 text-white py-3 rounded-xl font-semibold hover:bg-gold-600 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Send Inquiry</span>
                    </motion.button>
                  </Link>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitDetail;
