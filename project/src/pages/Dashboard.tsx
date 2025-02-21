import React from 'react';
import { useAuthStore } from '../store/authStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Award, Brain, Target } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuthStore();

  // Mock data for the dashboard
  const progressData = [
    { subject: 'Mathematics', score: 85 },
    { subject: 'Science', score: 92 },
    { subject: 'History', score: 78 },
    { subject: 'Literature', score: 88 },
  ];

  const recentAchievements = [
    { id: 1, name: 'Quick Learner', description: 'Completed 5 quizzes in one day' },
    { id: 2, name: 'Math Wizard', description: 'Scored 100% in Advanced Algebra' },
    { id: 3, name: 'Science Explorer', description: 'Completed all Physics modules' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Track your progress and achievements</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center mb-4">
            <Target className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold">Current Level</h2>
          </div>
          <p className="text-3xl font-bold text-indigo-600">Level 5</p>
          <p className="text-gray-600">2,500 XP to next level</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center mb-4">
            <Brain className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold">Quizzes Completed</h2>
          </div>
          <p className="text-3xl font-bold text-indigo-600">24</p>
          <p className="text-gray-600">Last quiz: 2 hours ago</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center mb-4">
            <Award className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold">Achievements</h2>
          </div>
          <p className="text-3xl font-bold text-indigo-600">12</p>
          <p className="text-gray-600">3 new this week</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Subject Progress</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
          <div className="space-y-4">
            {recentAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-start p-3 bg-gray-50 rounded-lg"
              >
                <Award className="h-5 w-5 text-indigo-600 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;