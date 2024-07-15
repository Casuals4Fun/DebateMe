import "./open-debate-card.css"
import { useNavigate, Link } from "react-router-dom"
import { useNavStore } from "../../store/useNavStore"
import { MdModeComment } from "react-icons/md"
import { IoCaretUpSharp } from "react-icons/io5"
import useFormatNumber from "../../hooks/useFormatNumber"
import LoadingSkeleton from "../loading/skeleton"

const OpenDebateCard = () => {
    const navigate = useNavigate();
    const { sidebar } = useNavStore();

    const handleProfileClick = (username: string) => {
        navigate(`/${username}`);
    }

    return (
        <div id='open-card' className={sidebar ? '' : 'card-break'}>
            <div className='debate-header'>
                <h2 title='Artificial Intelligence – Is AI good for society or not? ↗' onClick={() => navigate('/')}>
                    Artificial Intelligence – Is AI good for society or not?
                </h2>
                <Link to='/'>Debate</Link>
            </div>
            <p className='debate-body'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non labore necessitatibus reiciendis rem ad perferendis, id officia omnis voluptas eius veritatis explicabo harum! Vero porro labore quo ab aut. Nesciunt!
                Fugiat repellat architecto pariatur fugit perspiciatis voluptas quidem autem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non labore necessitatibus reiciendis rem ad perferendis, id officia omnis voluptas eius veritatis explicabo harum! Vero porro labore quo ab aut. Nesciunt!
                Fugiat repellat architecto pariatur fugit perspiciatis voluptas quidem autem.
            </p>
            <div className='user-info'>
                <img src="/user.jpg" alt="" loading="lazy" onClick={() => handleProfileClick('julieroberts')} />
                <div className='user-detail'>
                    <p onClick={() => handleProfileClick('julieroberts')}>Julie Roberts</p>
                    <p onClick={() => handleProfileClick('julieroberts')}>julieroberts</p>
                </div>
            </div>
            <div className='debate-footer'>
                <div className='debate-info'>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <IoCaretUpSharp size={20} />
                        <p>{useFormatNumber(4500)}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <MdModeComment size={15} />
                        <p>{useFormatNumber(1300)}</p>
                    </div>
                </div>
                <p className='created-date'>15 mins ago</p>
            </div>
            <div className='divider' />
        </div>
    )
}

const OpenDebateLoadingCard = () => {
    const { sidebar } = useNavStore();

    return (
        <div id='open-card-loading' className={sidebar ? '' : 'card-break'}>
            <div className='debate-header'>
                <LoadingSkeleton />
                <LoadingSkeleton />
            </div>
            <div className='debate-body'>
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
            </div>
            <div className='user-info'>
                <div className='img'>
                    <LoadingSkeleton />
                </div>
                <div className='user-detail'>
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                </div>
            </div>
            <div className='debate-footer'>
                <div className='debate-info'>
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                </div>
                <div className='created-date'>
                    <LoadingSkeleton />
                </div>
            </div>
            <div className='divider' />
        </div>
    )
}

export { OpenDebateCard, OpenDebateLoadingCard }