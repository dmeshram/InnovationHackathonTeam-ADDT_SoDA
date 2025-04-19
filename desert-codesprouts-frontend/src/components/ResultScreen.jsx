import React from 'react';

const ResultScreen = ({ isCorrect, onNext }) => {
    return (
        <div className="result-screen">
            <h2>{isCorrect ? '✅ Correct!' : '❌ Incorrect!'}</h2>
            <p>
                {isCorrect
                    ? 'Nice work! You spotted the right answer.'
                    : 'Oops! Review the clues more carefully.'}
            </p>
            <button onClick={onNext} className="next-btn">Next Puzzle</button>
        </div>
    );
};

export default ResultScreen;
