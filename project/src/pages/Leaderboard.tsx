import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

const Leaderboard = () => {
  // Mock leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'Sarah Johnson', points: 2500, subjects: ['Mathematics', 'Science'] },
    { rank: 2, name: 'Michael Chen', points: 2350, subjects: ['History', 'Literature'] },
    { rank: 3, name: 'Emily Brown', points: 2200, subjects: ['Science', 'Computer Science'] },
    { rank: 4, name: 'David Wilson', points: 2100, subjects: ['Mathematics', 'Computer Science'] },
    { rank: 5, name: 'Lisa Anderson', points: 2000, subjects: ['Literature', 'History'] },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-semibold text-gray-600">{rank}</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Global Leaderboard</h1>
          
          <div className="space-y-4">
            {leaderboardData.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center p-4 rounded-lg ${
                  user.rank <= 3 ? 'bg-indigo-50' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center w-12">
                  {getRankIcon(user.rank)}
                </div>
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {user.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="px-2 py-1 bg-white rounded-full text-xs text-indigo-600 border border-indigo-200"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-indigo-600">{user.points}</span>
                  <p className="text-sm text-gray-600">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;