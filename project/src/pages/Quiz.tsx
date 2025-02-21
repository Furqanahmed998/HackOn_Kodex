import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const Quiz = () => {
  // Mock quiz data
  const mockQuiz = {
    id: '1',
    title: 'Introduction to Algebra',
    subject: 'Mathematics',
    difficulty: 'medium' as const,
    questions: [
      {
        id: '1',
        text: 'What is the value of x in the equation 2x + 5 = 13?',
        options: ['2', '4', '6', '8'],
        correctAnswer: '4',
        explanation: 'To solve 2x + 5 = 13, subtract 5 from both sides to get 2x = 8, then divide by 2 to get x = 4.'
      },
      {
        id: '2',
        text: 'Which of the following is a linear equation?',
        options: ['y = x²', 'y = 2x + 1', 'y = 1/x', 'y = √x'],
        correctAnswer: 'y = 2x + 1',
        explanation: 'A linear equation is an equation where the variable has a power of 1 and creates a straight line when graphed.'
      }
    ]
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    if (answer === mockQuiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  const question = mockQuiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === mockQuiz.questions.length - 1;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{mockQuiz.title}</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Question {currentQuestion + 1}/{mockQuiz.questions.length}</span>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                {mockQuiz.difficulty}
              </span>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-800 mb-6">{question.text}</p>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !selectedAnswer && handleAnswerSelect(option)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedAnswer === null
                      ? 'hover:bg-indigo-50 border-gray-200'
                      : option === question.correctAnswer
                      ? 'bg-green-50 border-green-500'
                      : selectedAnswer === option
                      ? 'bg-red-50 border-red-500'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                    {selectedAnswer && option === question.correctAnswer && (
                      <CheckCircle className="ml-auto h-5 w-5 text-green-500" />
                    )}
                    {selectedAnswer === option && option !== question.correctAnswer && (
                      <XCircle className="ml-auto h-5 w-5 text-red-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {showExplanation && (
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-blue-800">{question.explanation}</p>
            </div>
          )}

          {selectedAnswer && !isLastQuestion && (
            <button
              onClick={handleNextQuestion}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Next Question
            </button>
          )}

          {selectedAnswer && isLastQuestion && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
              <p className="text-lg text-gray-600">Your score: {score}/{mockQuiz.questions.length}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;