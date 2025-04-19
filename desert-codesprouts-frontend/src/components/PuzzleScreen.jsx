import React from 'react';
import './PuzzleScreen.css'; // optional, for styling

const PuzzleScreen = ({ puzzle, onAnswer }) => {
    return (
        <div className="puzzle-screen">
            <h2>{puzzle.question}</h2>
            {puzzle.options.map((opt, index) => (
                <div
                    key={index}
                    className="puzzle-option"
                    onClick={() => onAnswer(opt.isCorrect)}
                >
                    {opt.text}
                </div>
            ))}
        </div>
    );
};

export default PuzzleScreen;
