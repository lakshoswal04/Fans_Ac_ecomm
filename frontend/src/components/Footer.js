import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary-dark via-primary to-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <span className="bg-white text-primary px-3 py-1 rounded-lg mr-2">CB</span>
              CoolBreeze
            </h2>
            <p className="text-white/80 mb-6">Premium quality fans and air conditioners for all your cooling needs. Experience the perfect temperature in every room.</p>
            <div className="flex space-x-3">
              <a href="#" className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold mb-6 pb-2 border-b border-white/20">Quick Links</h2>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition flex items-center">
                  <span className="mr-2">›</span>Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-white/80 hover:text-white transition flex items-center">
                  <span className="mr-2">›</span>Products
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition flex items-center">
                  <span className="mr-2">›</span>About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition flex items-center">
                  <span className="mr-2">›</span>Services
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition flex items-center">
                  <span className="mr-2">›</span>Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-xl font-bold mb-6 pb-2 border-b border-white/20">Categories</h2>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=Fans" className="text-white/80 hover:text-white transition flex items-center">
                  <span className="mr-2">›</span>Ceiling Fans
                </Link>
              </li>
              <li>
                <Link to="/products?category=Fans" className="text-white/80 hover:text-white transition flex items-center">
                  <span className="mr-2">›</span>Table Fans
                </Link>
              </li>
              <li>
                <Link to="/products?category=Fans" className="text-white/80 hover:text-white transition flex items-center">
                  <span className="mr-2">›</span>Exhaust Fans
                </Link>
              </li>
              <li>
                <Link to="/products?category=Air%20Conditioners" className="text-white/80 hover:text-white transition flex items-center">
                  <span className="mr-2">›</span>Split AC Units
                </Link>
              </li>
              <li>
                <Link to="/products?category=Air%20Conditioners" className="text-white/80 hover:text-white transition flex items-center">
                  <span className="mr-2">›</span>Window AC Units
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-bold mb-6 pb-2 border-b border-white/20">Contact Us</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-white/10 rounded-full p-2 mr-3">
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <span className="text-white/80">
                  123 Cooling Street, Breeze City, 10001, USA
                </span>
              </li>
              <li className="flex items-center">
                <div className="bg-white/10 rounded-full p-2 mr-3">
                  <FaPhone className="text-white" />
                </div>
                <span className="text-white/80">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <div className="bg-white/10 rounded-full p-2 mr-3">
                  <FaEnvelope className="text-white" />
                </div>
                <span className="text-white/80">info@coolbreeze.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-white/10 my-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-white/70 text-sm">
          <p>&copy; {new Date().getFullYear()} CoolBreeze. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 