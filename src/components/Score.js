import React, { useReducer, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const initialState = {
    scores: [],
    loading: true
}

function scoreReducer(state, action) {
    switch (action.type) {
        case 'LOAD_SCORES':
            return {
                ...state,
                scores: action.payload,
                loading: false
            }
        case 'RESET_QUIZ':
            return {
                ...initialState
            }
        default:
            return state
    }
}

export default function Score() {
    const { user } = useContext(AuthContext)
    const [state, dispatch] = useReducer(scoreReducer, initialState)
    const navigate = useNavigate()

    useEffect(() => {
        const attempts = JSON.parse(localStorage.getItem('attempts')) || {}
        const userScores = attempts[user.username] || []
        const filteredScores = userScores.filter(score => score.score !== undefined && score.score !== null && score.score !== "")
        dispatch({ type: 'LOAD_SCORES', payload: filteredScores })
    }, [user.username])

    const handleRetakeQuiz = () => {
        localStorage.removeItem('currentQuestionIndex')
        localStorage.removeItem('userAnswers')
        navigate('/quiz')
    }

    if (state.loading) {
        return <p>Loading scores...</p>
    }

    return (
        <div>
            <h2>Your Scores</h2>
            {state.scores.length > 0 ? (
                <ul>
                    {state.scores.map((score, index) => (
                        <li key={index}>
                            Attempt {index + 1}: {score.score} points, taken on {new Date(score.date).toLocaleString()}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No score available. Please take the quiz to see your score.</p>
            )}
            <button className="quiz-button" onClick={handleRetakeQuiz}>Retake Quiz</button>
            <button onClick={() => navigate('/user')}>Back to Home</button>
        </div>
    )
}
