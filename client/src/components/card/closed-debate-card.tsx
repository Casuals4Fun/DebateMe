import "./closed-debate-card.css";
import React from "react";
import { Link } from "react-router-dom";
import DebateBar from "./debate-bar";
import useFormatNumber from "../../utils/useFormatNumber";

interface CardProps { }

const ClosedDebateCard: React.FC<CardProps> = () => {
    return (
        <div id='closed-card'>
            <div className='left'>
                <h2>Sony is the best camera</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non labore necessitatibus reiciendis rem ad perferendis.
                </p>
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
                    <DebateBar debateFrom={4000000} debateBy={6000000} />
                </div>
                <div className='debate-info'>
                    <p>{useFormatNumber(2100)} comments</p>
                    <p>5 days ago</p>
                </div>
            </div>
        </div>
    )
}

export default ClosedDebateCard