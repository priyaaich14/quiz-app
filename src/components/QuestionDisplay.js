import React from 'react';

export default function QuestionDisplay({ questionIndex, answers, setAnswers }) {
  // Assume that questions have been correctly loaded and updated in localStorage
  const questions = JSON.parse(localStorage.getItem('questions')) || []

  if (questions.length === 0) {
    return <p>No questions available.</p> // Display message when no questions are available
  }

  const question = questions[questionIndex]

  const handleOptionChange = (option) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = option
    setAnswers(newAnswers)
  }

  return (
    <div>
      {/* <h3>{`${questionIndex + 1}: ${question.question}`}</h3> // Include question number */}
      <ol type="A">
      {question.options.map((option, index) => (
      <li key={index}>
      <label>
      <input
      type="radio"
      name={`question-${questionIndex}`}
      value={option}
      checked={answers[questionIndex] === option}
      onChange={() => handleOptionChange(option)}
      />
      {option}
      </label>
      </li>
      ))}
      </ol>
    </div>
  )
}
