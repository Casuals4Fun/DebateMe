import "./closed-debate-card.css";
import React from "react";

interface CardProps {
    isHotTopic?: boolean;
}

const ClosedDebateCard: React.FC<CardProps> = () => {
    return (
        <div id='closed-card'>
            <div className='left'>
                <h2>Sony is the best camera in the current segment in the current scenario</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Los nemo unde labore deleniti minima laboriosam harum.</p>
                <button>View</button>
            </div>
            <div className='divider' />
            <div className='right'>
                <div className='user-info'>
                    <div className='debate-from'>
                        <img src="/user1.webp" alt="" />
                        <p>Aniket Das</p>
                    </div>
                    <div className='debate-by'>
                        <img src="/user2.jpeg" alt="" />
                        <p>Pratik Prasad</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClosedDebateCard