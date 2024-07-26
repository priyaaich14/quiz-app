import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { saveQuizResults } from './quizUtils';

export default function QuizPreview() {
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState({})
    const [editIndex, setEditIndex] = useState(null)
    const [unsavedChanges, setUnsavedChanges] = useState(false)
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        const storedQuestions = JSON.parse(localStorage.getItem('questions')) || []
        const storedAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {}
        setQuestions(storedQuestions)
        setAnswers(storedAnswers)
    }, [])

    const handleEdit = (index) => {
        setEditIndex(index)
    }

    const handleAnswerChange = (option, questionId) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: option
        }))
        setUnsavedChanges(true)
    }

    const handleSave = () => {
        setEditIndex(null)
        setUnsavedChanges(false)
        localStorage.setItem('userAnswers', JSON.stringify(answers))
    }

    const handleSubmit = () => {
        if (editIndex !== null) {
            alert('Please save your changes before submitting the quiz.')
            return
        }
        if (unsavedChanges) {
            alert('Please save your changes before submitting the quiz.')
        } else {
            saveQuizResults(answers, questions, user.username)
            localStorage.removeItem('currentQuestionIndex') // Reset to start from the first question when retaking
            localStorage.removeItem('userAnswers') // Clear user answers
            navigate('/thank-you')
        }
    }

    return (
        <div>
            <h1>Review and Edit Your Answers</h1>
            {questions.map((question, index) => (
                <div key={index}>
                    <h3>Question {index + 1}: {question.question}</h3>
                    {question.options.map((option) => (
                        <div key={option}>
                            <input
                                type="radio"
                                name={`question-${index}`}
                                value={option}
                                checked={answers[question.id] === option}
                                onChange={() => handleAnswerChange(option, question.id)}
                                disabled={editIndex !== index}
                            />
                            {option}
                        </div>
                    ))}
                    {editIndex === index ? (
                        <button onClick={handleSave}>Save</button>
                    ) : (
                        <button onClick={() => handleEdit(index)}>Edit</button>
                    )}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit Quiz</button>
        </div>
    )
}
