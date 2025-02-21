import React, { useState, useEffect } from "react";
import axios from "axios";
import io, { Socket } from "socket.io-client";

const Quiz = () => {
  const [quizData, setQuizData] = useState<any>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Fetch quiz data from the server when the page renders
    axios
      .get("http://localhost:5000/api/quiz")
      .then((response) => {
        console.log("Quiz data:", response.data);
        setQuizData(response.data);
      })
      .catch((err) => {
        console.error("Error fetching quiz data:", err);
      });

    // Establish WebSocket connection with the server
    const newSocket = io("http://localhost:5000/api/quiz"); 
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server:", newSocket.id);
    });

    // Listen for messages from the server
    newSocket.on("quizMessage", (message: string) => {
      console.log("Received message:", message);
      setMessages((prev) => [...prev, message]);
    });

    // Clean up WebSocket connection on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (socket) {
      socket.emit("userInput", userInput);
      console.log("Sent user input:", userInput);
      setUserInput("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Quiz Page</h1>

      {quizData ? (
        <div>
          <h2 className="text-xl mb-2">{quizData.title}</h2>
          {/* Render additional quiz data as needed */}
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(quizData, null, 2)}
          </pre>
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

      {messages.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Messages from Server:</h3>
          <ul>
            {messages.map((msg, index) => (
              <li key={index} className="p-1">
                {msg}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Quiz;
