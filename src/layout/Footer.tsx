'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import categories from '@/data/categories';
import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiYoutube,
  FiMail,
  FiMapPin,
  FiPhone,
  FiHeart,
} from 'react-icons/fi';

const socialLinks = [
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiFacebook, href: '#', label: 'Facebook' },
  { icon: FiYoutube, href: '#', label: 'Youtube' },
];

const quickLinks = [
  { name: 'About Us', href: '#about' },
  { name: 'Careers', href: '#careers' },
  { name: 'Press', href: '#press' },
  { name: 'Sustainability', href: '#sustainability' },
];

const supportLinks = [
  { name: 'Contact Us', href: '#contact' },
  { name: 'FAQs', href: '#faqs' },
  { name: 'Shipping', href: '#shipping' },
  { name: 'Returns', href: '#returns' },
];

export default function Footer() {
  return (
    <footer className="relative bg-card border-t border-border overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--rose-gold)] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--champagne)] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-border">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-light mb-2">Join the Beauty Club</h3>
              <p className="text-muted-foreground">Subscribe for exclusive offers, beauty tips, and early access to new products.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-4 bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--rose-gold)] min-w-[300px]"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-[var(--rose-gold)] text-white font-medium rounded-full hover:bg-[var(--rose-dark)] transition-colors whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-light tracking-widest gradient-text">LUXE BEAUTY</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Discover luxury beauty that celebrates your unique radiance. Our carefully curated collection features the finest skincare, makeup, and fragrances from around the world.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-[var(--rose-gold)] hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-[var(--rose-gold)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-6">Support</h4>
            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-[var(--rose-gold)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-6">Categories</h4>
            <ul className="space-y-3">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`#${category.slug}`}
                    className="text-muted-foreground hover:text-[var(--rose-gold)] transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FiMapPin className="w-4 h-4 text-[var(--rose-gold)]" />
              <span>123 Beauty Avenue, New York, NY 10001</span>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone className="w-4 h-4 text-[var(--rose-gold)]" />
              <span>+1 (800) LUXE-BEAUTY</span>
            </div>
            <div className="flex items-center gap-2">
              <FiMail className="w-4 h-4 text-[var(--rose-gold)]" />
              <span>hello@luxebeauty.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Luxe Beauty. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#privacy" className="hover:text-[var(--rose-gold)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-[var(--rose-gold)] transition-colors">
              Terms of Service
            </Link>
            <Link href="#cookies" className="hover:text-[var(--rose-gold)] transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>

        {/* Made with Love */}
        <div className="pb-6 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            Made with <FiHeart className="w-3 h-3 text-[var(--rose-gold)]" /> for beauty lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
