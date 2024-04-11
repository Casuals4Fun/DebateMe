import "./closed-debate-card.css";
import { Link } from "react-router-dom";
import DebateBar from "./debate-bar";
import useFormatNumber from "../../hooks/useFormatNumber";

const ClosedDebateCard = () => {
    return (
        <div id='closed-card'>
            <div className='left'>
                <h2>Sony is the best camera of all time.</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non labore necessitatibus reiciendis rem ad perferendis, id officia omnis voluptas eius veritatis explicabo harum! Vero porro labore quo ab aut. Nesciunt!
                    Fugiat repellat architecto pariatur fugit perspiciatis voluptas quidem autem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non labore necessitatibus reiciendis rem ad perferendis, id officia omnis voluptas eius veritatis explicabo harum! Vero porro labore quo ab aut. Nesciunt!
                    Fugiat repellat architecto pariatur fugit perspiciatis voluptas quidem autem.
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
                    <DebateBar debateFrom={423} debateBy={516} />
                </div>
                <div className='debate-info'>
                    <p>{useFormatNumber(210)} comments</p>
                    <p>5 days ago</p>
                </div>
            </div>
        </div>
    )
}

export default ClosedDebateCard