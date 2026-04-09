/**
 * UnitCard Component
 * Displays a real estate unit in card format with hover animations
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize, MapPin, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatPrice } from '../data/units';

const UnitCard = ({ unit }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % unit.images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + unit.images.length) % unit.images.length);
  };

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <Link to={`/unit/${unit.id}`} className="block">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={unit.images[currentImageIndex]}
            alt={unit.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              unit.status === 'Ready to Move'
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 text-white'
            }`}>
              {unit.status}
            </span>
          </div>

          {/* Type Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800">
              {unit.type}
            </span>
          </div>

          {/* Like Button */}
          <button
            onClick={toggleLike}
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-white hover:scale-110"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>

          {/* Image Navigation */}
          {unit.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-md transition-all duration-300 hover:bg-white ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-md transition-all duration-300 hover:bg-white ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {unit.images.length > 1 && (
            <div className="absolute bottom-4 left-4 flex space-x-1">
              {unit.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {unit.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{unit.location}</span>
          </div>

          {/* Features */}
          <div className="flex items-center space-x-4 text-gray-600 text-sm mb-4">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span>{unit.bedrooms} Beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span>{unit.bathrooms} Baths</span>
            </div>
            <div className="flex items-center">
              <Maximize className="w-4 h-4 mr-1" />
              <span>{unit.size} m²</span>
            </div>
          </div>

          {/* Price & Developer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div>
              <p className="text-2xl font-bold text-primary-600">
                {formatPrice(unit.price)}
              </p>
              <p className="text-xs text-gray-500">{unit.finishing}</p>
            </div>
            <span className="text-xs text-gray-400">{unit.developer}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default UnitCard;
