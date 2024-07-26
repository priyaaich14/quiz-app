import React, { createContext, useState, useEffect } from 'react';
import initialQuestions from '../data/questions.json'; // Ensure this path is correct

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);

    const fetchQuestions = () => {
        const savedQuestions = JSON.parse(localStorage.getItem('questions')) || initialQuestions;
        localStorage.setItem('questions', JSON.stringify(savedQuestions));
        setQuestions(savedQuestions);
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const addQuestion = (newQuestion) => {
        const updatedQuestions = [...questions, newQuestion];
        localStorage.setItem('questions', JSON.stringify(updatedQuestions));
        setQuestions(updatedQuestions);
    };

    const deleteQuestion = (id) => {
        const updatedQuestions = questions.filter(question => question.id !== id);
        localStorage.setItem('questions', JSON.stringify(updatedQuestions));
        setQuestions(updatedQuestions);
    };

    const editQuestion = (updatedQuestion) => {
        const updatedQuestions = questions.map(question =>
            question.id === updatedQuestion.id ? updatedQuestion : question
        );
        localStorage.setItem('questions', JSON.stringify(updatedQuestions));
        setQuestions(updatedQuestions);
    };

    return (
        <QuestionContext.Provider value={{ questions, addQuestion, deleteQuestion, editQuestion }}>
            {children}
        </QuestionContext.Provider>
    );
};
