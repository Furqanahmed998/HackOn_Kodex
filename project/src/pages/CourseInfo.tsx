import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import axios from "axios";

const CourseInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    topics: "",
    currentProficiency: "Beginner",
    desiredLearningLevel: "Beginner",
    educationLevel: "University Student",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.topics.trim()) {
      setError("Please enter at least one topic.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/gemini/courseinfo",
        { formData }
      );
      console.log("Gemini API Response:", response.data);
      navigate("/quiz", {
        state: { courseInfo: formData, geminiResponse: response.data },
      });
    } catch (err) {
      console.error(err);
      setError("Submission failed. Please try again.");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center justify-center mb-8">
          <BookOpen className="h-8 w-8 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">
            Course Information
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topics Input */}
          <div>
            <label
              htmlFor="topics"
              className="block text-sm font-medium text-gray-700"
            >
              Topics You Want to Learn (separate by commas)
            </label>
            <input
              id="topics"
              name="topics"
              value={formData.topics}
              onChange={handleChange}
              placeholder="e.g., Physics, Philosophy, Python"
          
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
                      />
                
          </div>

          {/* Current Proficiency */}
          <div>
            <label
              htmlFor="currentProficiency"
              className="block text-sm font-medium text-gray-700"
            >
              Your Current Proficiency
            </label>
            <select
              id="currentProficiency"
              name="currentProficiency"
              value={formData.currentProficiency}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Desired Learning Level */}
          <div>
            <label
              htmlFor="desiredLearningLevel"
              className="block text-sm font-medium text-gray-700"
            >
              Desired Learning Level
            </label>
            <select
              id="desiredLearningLevel"
              name="desiredLearningLevel"
              value={formData.desiredLearningLevel}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Education Level */}
          <div>
            <label
              htmlFor="educationLevel"
              className="block text-sm font-medium text-gray-700"
            >
              Education Level
            </label>
            <select
              id="educationLevel"
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="University Student">University Student</option>
              <option value="Graduate">Graduate</option>
              <option value="Post Graduate Student">
                Post Graduate Student
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go to Quiz
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Want to go back?{" "}
          <Link to="/" className="text-indigo-600 hover:text-indigo-500">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CourseInfo;
