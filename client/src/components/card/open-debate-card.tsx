import "./open-debate-card.css";
import { Link } from "react-router-dom";

const OpenDebateCard = () => {
    return (
        <div id='open-card'>
            <div className='debate-header'>
                <h2>
                    Artificial Intelligence – Is AI good for society or not?
                </h2>
                <Link to='/'>
                    Debate
                </Link>
            </div>
            <p className='debate-body'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non labore necessitatibus reiciendis rem ad perferendis, id officia omnis voluptas eius veritatis explicabo harum! Vero porro labore quo ab aut. Nesciunt!
                Fugiat repellat architecto pariatur fugit perspiciatis voluptas quidem autem.
            </p>
            <div className='debate-footer'>
                <div className='user-info'>
                    <img src="/user.jpg" alt="" />
                    <div>
                        <p>Julie Roberts</p>
                        <p>julieroberts</p>
                    </div>
                </div>
                <p>15 mins ago</p>
            </div>
        </div>
    )
}

export default OpenDebateCard