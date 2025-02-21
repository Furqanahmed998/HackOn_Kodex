import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Trophy, Brain, Lightbulb } from "lucide-react";

const data = [
  { name: "Q1", Aptitude: 76, "Logical Reasoning": 35 },
  { name: "Q2", Aptitude: 90, "Logical Reasoning": 45 },
  { name: "Q3", Aptitude: 65, "Logical Reasoning": 80 },
  { name: "Q4", Aptitude: 85, "Logical Reasoning": 60 },
  { name: "Q5", Aptitude: 70, "Logical Reasoning": 55 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100">
        <p className="text-sm font-medium text-gray-600">{`Question ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}%`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ScoreCard = ({
  title,
  score,
  icon: Icon,
}: {
  title: string;
  score: number;
  icon: React.ElementType;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl p-6 shadow-sm"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 bg-blue-100 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <h3 className="text-sm text-blue-900">{title}</h3>
        <p className="text-2xl font-semibold text-blue-700">{score}%</p>
      </div>
    </div>
  </motion.div>
);

function Progress() {
  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-100 rounded-full">
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-900">Good Result!</h2>
              <p className="text-blue-700">Overall Score: 8.5/10</p>
            </div>
          </div>
        </motion.div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreCard title="Aptitude" score={76} icon={Brain} />
          <ScoreCard title="Logical Reasoning" score={35} icon={Lightbulb} />
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Questions Details Report
          </h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
                barGap={8}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#1e40af", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#1e40af", fontSize: 12 }}
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{
                    paddingTop: "20px",
                  }}
                />
                <Bar
                  dataKey="Aptitude"
                  fill="#2563eb"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={35}
                />
                <Bar
                  dataKey="Logical Reasoning"
                  fill="#60a5fa"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={35}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Progress;
