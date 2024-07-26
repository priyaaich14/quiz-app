import React from 'react';

export default function ProgressBar({ currentQuestion, total }) {
    const progressPercentage = (currentQuestion / total) * 100
    return (
        <div className="progress-bar-container">
            <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <p>{progressPercentage.toFixed(0)}% completed</p>
        </div>
    )
}
