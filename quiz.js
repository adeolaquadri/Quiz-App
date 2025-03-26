import React, { useState, useEffect } from "react";
import axios from "axios";

const QuizComponent = ({ quizId, userId }) => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({}); // Stores selected answers
  const [submitted, setSubmitted] = useState(false);

  // Fetch quiz questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quizzes/${quizId}/questions`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [quizId]);

  // Handle answer selection
  const handleAnswerChange = (questionId, selectedAnswer) => {
    setUserAnswers({ ...userAnswers, [questionId]: selectedAnswer });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Object.keys(userAnswers).length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    try {
      const answersArray = Object.keys(userAnswers).map((questionId) => ({
        userId,
        quizId,
        questionId,
        selectedAnswer: userAnswers[questionId],
      }));

      await axios.post("http://localhost:5000/api/answers/submit", { answers: answersArray });

      setSubmitted(true);
      alert("Quiz submitted successfully!");
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  return (
    <div>
      <h2>Quiz</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={question._id}>
              <h4>
                {index + 1}. {question.question}
              </h4>
              {Object.entries(question.options).map(([key, value]) => (
                <label key={key} style={{ display: "block" }}>
                  <input
                    type="radio"
                    name={`question-${question._id}`}
                    value={key}
                    checked={userAnswers[question._id] === key}
                    onChange={() => handleAnswerChange(question._id, key)}
                  />
                  {value}
                </label>
              ))}
            </div>
          ))}
          <button type="submit">Submit Quiz</button>
        </form>
      ) : (
        <h3>Thank you for taking the quiz!</h3>
      )}
    </div>
  );
};

export default QuizComponent;
