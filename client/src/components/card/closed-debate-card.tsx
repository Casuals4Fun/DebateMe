import "./closed-debate-card.css";
import React from "react";
import { Link } from "react-router-dom";
import DebateBar from "./debate-bar";

interface CardProps {
    isHotTopic?: boolean;
}

const ClosedDebateCard: React.FC<CardProps> = () => {
    return (
        <div id='closed-card'>
            <div className='left'>
                <h2>Sony is the best camera</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Los nemo unde labore deleniti minima laboriosam harum.</p>
                <Link to='/'>View</Link>
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
                <div className='debate-bar__container'>
                    <DebateBar debateFrom={1250} debateBy={2725} />
                </div>
            </div>
        </div>
    )
}

export default ClosedDebateCard