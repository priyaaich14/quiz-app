
import React from 'react';

export default function NavigationButtons({ currentQuestion, total, onNext, onPrevious, onFinish }) {
  return (
    <div className="nav-buttons">
      {currentQuestion > 0 && (
        <button className="quiz-button" onClick={onPrevious}>
          Previous
        </button>
      )}
      {currentQuestion < total - 1 ? (
        <button className="quiz-button" onClick={onNext}>Next</button>
      ) : (
        <button className="quiz-button" onClick={onFinish}>Finish</button>
      )}
    </div>
  )
}

