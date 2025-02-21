import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Initialize quizData with data from navigation state if available
  const [quizData, setQuizData] = useState<any>(location.state?.data || null);
  const [userInput, setUserInput] = useState("");
  
  useEffect(() => {
    // If quizData is not already available (via navigation), fetch from the server
    if (!quizData) {
      axios
        .get("http://localhost:5000/api/gemini/courseinfo")
        .then((response) => {
          console.log("Quiz data:", response.data);
          setQuizData(response.data);
        })
        .catch((err) => {
          console.error("Error fetching quiz data:", err);
        });
    }
  }, [quizData]);

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api", { userInput })
      .then((response) => {
        console.log("Server response:", response.data);
        // Optionally update quizData via response or re-fetch from server
      })
      .catch((err) => {
        console.error("Error sending user input:", err);
      });
    setUserInput("");
  };

  // Function to remove "*" and split by newline
const formatQuizData = (data: string): JSX.Element[] => {
  return data.split("\\n").map((line, index) => (
    <p key={index} className="mb-2">
      {line}
    </p>
  ));
};
 const convertDataToString = (data: any): string => {
   const jsonString = JSON.stringify(data, null, 2);
   return jsonString.replace(/\*/g, "");
 };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Quiz Page</h1>

      {quizData ? (
        <div>
          <h2 className="text-xl mb-2 text_api">{quizData.title}</h2>
          <div className="p-4 rounded">
            <pre>
              {quizData}
            </pre>
          </div>
        </div>
      ) : (
        <p>Loading quiz data...</p>
      )}

      <div className="mt-6">
        <form onSubmit={handleInputSubmit}>
          <input
            type="text"
            placeholder="Enter your answer or input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="mt-2 w-full bg-indigo-600 text-white py-2 rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Quiz;
