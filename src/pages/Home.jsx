/**
 * Home Page
 * Landing page with hero section, about us, and featured units
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Home as HomeIcon, Users, Award, MapPin, CheckCircle, Building, Phone } from 'lucide-react';
import UnitCard from '../components/UnitCard';
import { units, getFeaturedUnits } from '../data/units';

const Home = () => {
  const featuredUnits = getFeaturedUnits();

  const stats = [
    { icon: Building, value: '500+', label: 'Properties Listed' },
    { icon: Users, value: '1000+', label: 'Happy Clients' },
    { icon: Award, value: '12+', label: 'Years Experience' },
    { icon: MapPin, value: '50+', label: 'Cities Covered' },
  ];

  const features = [
    {
      icon: HomeIcon,
      title: 'Premium Properties',
      description: 'Access to exclusive listings in prime locations across Egypt.',
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Professional agents to help you make informed decisions.',
    },
    {
      icon: CheckCircle,
      title: 'Trusted Partners',
      description: 'Verified developers and secure transaction processes.',
    },
    {
      icon: Award,
      title: 'Best Deals',
      description: 'Competitive prices and flexible payment plans.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920"
            alt="Luxury Home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                Welcome to Vexora Estates
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Find Your
              <span className="block text-gold-400">Dream Home</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/90 mb-8 max-w-lg"
            >
              Discover premium properties across Egypt's most sought-after locations. 
              Your perfect home is just a click away.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/units">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg"
                >
                  <span>Browse Properties</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  <span>Contact Us</span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-primary-50 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary-600 font-semibold mb-4 block">About Us</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Vexora Estates is a premier real estate platform dedicated to connecting buyers with their dream properties. 
                With over a decade of experience in the Egyptian real estate market, we have established ourselves as trusted 
                advisors for both local and international clients.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our mission is to simplify the property search process by providing comprehensive listings, 
                detailed information, and expert guidance. Whether you're looking for a family villa, 
                a beachfront chalet, or a commercial investment, we have the perfect property for you.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
                  alt="Modern Interior"
                  className="w-full h-auto"
                />
              </div>
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt={`Agent ${i}`}
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Expert Agents</p>
                    <p className="text-sm text-gray-500">Ready to help</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  "We found our dream home through Vexora. The process was seamless!"
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Units Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary-600 font-semibold mb-4 block">Featured Listings</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of premium properties, chosen for their exceptional value and prime locations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredUnits.slice(0, 6).map((unit, index) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <UnitCard unit={unit} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/units">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                <span>View All Properties</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Find Your Perfect Home?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let our experts guide you through the process. Get personalized recommendations based on your preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/units">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Start Browsing
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gold-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gold-600 transition-colors shadow-lg"
                >
                  Schedule a Call
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
