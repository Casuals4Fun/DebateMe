import "./closed-debate-card.css";
import React from "react";

interface CardProps {
    isHotTopic?: boolean;
}

const ClosedDebateCard: React.FC<CardProps> = () => {
    return (
        <div id='closed-card'>
            <div className='left'>
                <h2>Sony is the best camera. Sony is the best camera.</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero suscipit eos, nemo unde labore deleniti minima laboriosam harum.</p>
            </div>
            <div className='divider' />
            <div className='right'>
                Down/Right
            </div>
        </div>
    )
}

export default ClosedDebateCard