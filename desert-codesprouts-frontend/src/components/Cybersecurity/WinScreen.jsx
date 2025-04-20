import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

const WinScreen = ({ onRestart }) => {
    const [width, height] = useWindowSize();

    return (
        <div className="result-screen">
            <Confetti width={width} height={height} />
            <h1>🎉 You Solved the Mystery!</h1>
            <p>Congratulations, detective! The school’s data is safe again.</p>
            <button className="next-btn" onClick={onRestart}>Play Again</button>
        </div>
    );
};

export default WinScreen;