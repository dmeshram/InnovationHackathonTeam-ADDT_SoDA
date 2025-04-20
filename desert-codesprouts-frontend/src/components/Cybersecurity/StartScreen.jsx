import React from 'react';

const StartScreen = ({ onStart }) => {
    return (
        <div className="start-screen">
            <h1>🧠 Mystery in the Matrix</h1>
            <p>Someone hacked the school's lab system... Can you find the culprit?</p>
            <button onClick={onStart} className="start-btn">Start Investigation</button>
        </div>
    );
};

export default StartScreen;