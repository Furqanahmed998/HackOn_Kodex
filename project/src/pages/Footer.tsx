import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Trophy,
  Gift,
  Crown,
  Star,
  Medal,
  Award,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Heart,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">About Us</h3>
            <p className="text-blue-200">
              Empowering achievements and celebrating success through our
              innovative rewards program.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Rewards
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  How it Works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact</h3>
            <ul className="space-y-2">
              <li className="text-blue-200">Email: contact@rewards.com</li>
              <li className="text-blue-200">Phone: (555) 123-4567</li>
              <li className="text-blue-200">Address: 123 Reward Street</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-200">
            © 2025 Rewards Program. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-blue-200">Made with</span>
            <Heart className="w-4 h-4 mx-1 text-red-400" />
            <span className="text-blue-200">by Rewards Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const rewards = [
    {
      icon: Trophy,
      title: "Gold Achievement",
      points: 1000,
      description: "Reach the highest tier of excellence in our program",
    },
    {
      icon: Gift,
      title: "Special Bonus",
      points: 500,
      description: "Unlock exclusive rewards and special perks",
    },
    {
      icon: Crown,
      title: "Leadership Crown",
      points: 750,
      description: "Lead the way and inspire others to succeed",
    },
    {
      icon: Star,
      title: "Rising Star",
      points: 250,
      description: "Show exceptional progress and potential",
    },
    {
      icon: Medal,
      title: "Expert Badge",
      points: 600,
      description: "Demonstrate mastery in your field",
    },
    {
      icon: Award,
      title: "Innovation Award",
      points: 800,
      description: "Create groundbreaking solutions",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Rewards & Achievements
          </h1>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto">
            Unlock amazing rewards as you progress through your journey. Every
            milestone brings you closer to excellence.
          </p>
        </div>
{/* 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rewards.map((reward, index) => (
            <RewardCard key={index} {...reward} />
          ))}
        </div> */}

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Your Current Progress
          </h2>
          <div className="w-full bg-blue-100 rounded-full h-4 mb-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: "65%" }}
            ></div>
          </div>
          <p className="text-blue-700 font-semibold">
            650 points earned • Next reward at 750 points
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
