// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ProgressBar from './ProgressBar';
// import NavigationButtons from './NavigationButtons';
// import { saveQuizResults } from './quizUtils';  // Make sure this import is correct

// export default function Quiz() {
//     const [questions, setQuestions] = useState([])
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
//     const [answers, setAnswers] = useState({})
//     const navigate = useNavigate()

//     useEffect(() => {
//         const fetchQuestions = () => {
//             const loadedQuestions = JSON.parse(localStorage.getItem('questions')) || []
//             setQuestions(loadedQuestions)
//         }

//         const storedAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {}
//         const storedIndex = JSON.parse(localStorage.getItem('currentQuestionIndex')) || 0

//         fetchQuestions()
//         setAnswers(storedAnswers)
//         setCurrentQuestionIndex(storedIndex)
//     }, [])

//     const handleAnswerChange = (option, questionId) => {
//         const newAnswers = {
//             ...answers,
//             [questionId]: option
//         }
//         setAnswers(newAnswers)
//         localStorage.setItem('userAnswers', JSON.stringify(newAnswers))
//     }

//     const handleNext = () => {
//         const newIndex = currentQuestionIndex + 1
//         setCurrentQuestionIndex(newIndex)
//         localStorage.setItem('currentQuestionIndex', JSON.stringify(newIndex))
//     }

//     const handlePrevious = () => {
//         const newIndex = currentQuestionIndex - 1
//         setCurrentQuestionIndex(newIndex)
//         localStorage.setItem('currentQuestionIndex', JSON.stringify(newIndex))
//     }

//     const handleFinish = () => {
//         saveQuizResults(answers, questions) // Save quiz results
//         localStorage.setItem('userAnswers', JSON.stringify(answers))
//         localStorage.removeItem('currentQuestionIndex')
//         navigate('/preview')
//     }

//     if (!questions.length) {
//         return <p>Loading questions...</p>
//     }

//     const currentQuestion = questions[currentQuestionIndex]

//     return (
//         <div className="quiz-container">
//             <h2>Quiz</h2>
//             <div className="progress-bar-container">
//                 <ProgressBar currentQuestion={currentQuestionIndex + 1} total={questions.length} />
//             </div>
//             <div className="question-display">
//                 <p>{`${currentQuestionIndex + 1}. ${currentQuestion.question}`}</p>
//                 <div className="options-container">
//                     {currentQuestion.options.map((option, index) => (
//                         <label key={index} className="option-label">
//                             <input
//                                 type="radio"
//                                 name={`question${currentQuestion.id}`}
//                                 value={option}
//                                 checked={answers[currentQuestion.id] === option}
//                                 onChange={() => handleAnswerChange(option, currentQuestion.id)}
//                                 disabled={answers[currentQuestion.id] !== undefined}
//                             />
//                             {option}
//                         </label>
//                     ))}
//                 </div>
//             </div>
//             <NavigationButtons
//                 currentQuestion={currentQuestionIndex}
//                 setCurrentQuestion={setCurrentQuestionIndex}
//                 total={questions.length}
//                 onNext={handleNext}
//                 onPrevious={handlePrevious}
//                 onFinish={handleFinish}
//             />
//         </div>
//     )
// }


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import NavigationButtons from './NavigationButtons';
import { shuffleArray } from './shuffle'; // Import the shuffle utility function

export default function Quiz() {
    const [questions, setQuestions] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const fetchQuestions = () => {
            const loadedQuestions = JSON.parse(localStorage.getItem('questions')) || []
            const shuffledQuestions = shuffleArray(loadedQuestions) // Shuffle the questions
            setQuestions(shuffledQuestions)
        }

        fetchQuestions()
    }, [])

    const handleAnswerChange = (option, questionId) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: option
        }))
    }

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        }
    }

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1)
        }
    }

    const handleFinish = () => {
        localStorage.setItem('userAnswers', JSON.stringify(answers))
        navigate('/preview')
    }

    if (!questions.length) {
        return <p>Loading questions...</p>
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="quiz-container">
            <h2>Quiz</h2>
            <div className="progress-bar-container">
                <ProgressBar currentQuestion={currentQuestionIndex + 1} total={questions.length} />
            </div>
            <div className="question-display">
                <p>{`${currentQuestionIndex + 1}. ${currentQuestion.question}`}</p>
                <div className="options-container">
                    {currentQuestion.options.map((option, index) => (
                        <label key={index} className="option-label">
                            <input
                                type="radio"
                                name={`question${currentQuestion.id}`}
                                value={option}
                                checked={answers[currentQuestion.id] === option}
                                onChange={() => handleAnswerChange(option, currentQuestion.id)}
                                disabled={answers[currentQuestion.id] !== undefined}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            </div>
            <NavigationButtons
                currentQuestion={currentQuestionIndex}
                setCurrentQuestion={setCurrentQuestionIndex}
                total={questions.length}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onFinish={handleFinish}
            />
        </div>
    )
}
