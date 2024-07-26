
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import initialQuestions from '../data/questions.json'; // Ensure this path is correct

export default function AllQuestions() {
    const [questions, setQuestions] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        console.log('Loading questions...')
        const savedQuestions = JSON.parse(localStorage.getItem('questions')) || initialQuestions
        console.log('Questions loaded:', savedQuestions)
        localStorage.setItem('questions', JSON.stringify(savedQuestions))
        setQuestions(savedQuestions)
    }, [])

    const handleDelete = (id) => {
        const updatedQuestions = questions.filter(question => question.id !== id)
        localStorage.setItem('questions', JSON.stringify(updatedQuestions))
        setQuestions(updatedQuestions)
    }

    return (
        <div>
            <h2>All Questions</h2>
            <div className="top-buttons">
                <button onClick={() => navigate('/admin/add-question')}>Add Question</button>
                <button onClick={() => navigate('/admin')}>Back to Home</button>
            </div>
            <ol>
                {questions.map((question, index) => (
                    <li key={question.id}>
                        <p>{question.question}</p>
                        <ol className="options" type="A">
                            {question.options.map((option, idx) => (
                                <li key={idx}>{option}</li>
                            ))}
                        </ol>
                        <div className="question-buttons">
                            <button onClick={() => handleDelete(question.id)}>Delete</button>
                            <button onClick={() => navigate(`/admin/edit-question/${question.id}`)}>Edit</button>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    )
}



// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { QuestionContext } from '../context/QuestionContext';

// export default function AllQuestions() {
//     const { questions, deleteQuestion } = useContext(QuestionContext);
//     const navigate = useNavigate();

//     return (
//         <div>
//             <h2>All Questions</h2>
//             <div className="top-buttons">
//                 <button onClick={() => navigate('/admin/add-question')}>Add Question</button>
//                 <button onClick={() => navigate('/admin')}>Back to Home</button>
//             </div>
//             <ol>
//                 {questions.map((question, index) => (
//                     <li key={question.id}>
//                         <p>{question.question}</p>
//                         <ol className="options" type="A">
//                             {question.options.map((option, idx) => (
//                                 <li key={idx}>{option}</li>
//                             ))}
//                         </ol>
//                         <div className="question-buttons">
//                             <button onClick={() => deleteQuestion(question.id)}>Delete</button>
//                             <button onClick={() => navigate(`/admin/edit-question/${question.id}`)}>Edit</button>
//                         </div>
//                     </li>
//                 ))}
//             </ol>
//         </div>
//     );
// }
