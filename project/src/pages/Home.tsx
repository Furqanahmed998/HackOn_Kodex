import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Award, BarChart3, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Learn Smarter with AI-Powered Education
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Personalized learning paths, adaptive quizzes, and real-time feedback to help you master any subject.
        </p>
        <Link
          to="/register"
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Start Learning Now
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 py-12">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Brain className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Adaptive Learning</h3>
          <p className="text-gray-600">
            Our AI adjusts to your learning pace and style, ensuring optimal progress.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Award className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Earn Achievements</h3>
          <p className="text-gray-600">
            Get rewarded for your progress with badges and climb the leaderboard.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <BarChart3 className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
          <p className="text-gray-600">
            Visualize your learning journey with detailed analytics and insights.
          </p>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-2xl p-8 mt-12">
        <div className="flex items-center justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your learning?</h2>
            <p className="text-gray-600 mb-6">
              Join thousands of students who are already experiencing the future of education.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              <span>Get Started</span>
              <Zap className="h-5 w-5" />
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80"
            alt="Students learning"
            className="hidden md:block w-72 h-72 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;