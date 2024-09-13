import './close.css'
import { useNavigate } from 'react-router-dom'
import { MdModeComment } from 'react-icons/md'
import { useNavStore } from '../../store/nav'
import DebateBar from './bar'
import useFormatNumber from '../../hooks/useFormatNumber'
import LoadingSkeleton from '../loading/skeleton'

const CloseDebateCard = () => {
    const navigate = useNavigate()
    const { isSidebarClose } = useNavStore()

    return (
        <div id='closed-card' className={isSidebarClose ? 'card-break' : ''}>
            <div className='left'>
                <h2 onClick={() => navigate('/aniketdas/Sony is the best camera of all time')}>
                    Sony is the best camera of all time.
                </h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non labore necessitatibus reiciendis rem ad perferendis, id officia omnis voluptas eius veritatis explicabo harum! Vero porro labore quo ab aut. Nesciunt!
                    Fugiat repellat architecto pariatur fugit perspiciatis voluptas quidem autem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non labore necessitatibus reiciendis rem ad perferendis, id officia omnis voluptas eius veritatis explicabo harum! Vero porro labore quo ab aut. Nesciunt!
                    Fugiat repellat architecto pariatur fugit perspiciatis voluptas quidem autem.
                </p>
            </div>
            <div className='right'>
                <div className='user-info'>
                    <div className='debate-from'>
                        <img src='/user2.jpeg' alt='avatar' loading='lazy' onClick={() => navigate('/pratikprasad')} />
                        <p onClick={() => navigate('/pratikprasad')}>Pratik Prasad</p>
                        <p onClick={() => navigate('/pratikprasad')}>pratikprasad</p>
                    </div>
                    <div className='debate-by'>
                        <img src='/user1.webp' alt='avatar' loading='lazy' onClick={() => navigate('/aniketdas')} />
                        <p onClick={() => navigate('/aniketdas')}>Aniket Das</p>
                        <p onClick={() => navigate('/aniketdas')}>aniketdas</p>
                    </div>
                </div>
                <div className='debate-bar__container'>
                    <DebateBar debateFrom={5160} debateBy={4230} />
                </div>
                <div className='debate-info'>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '15px', fontWeight: '600' }}>
                        <MdModeComment size={15} />
                        <p>{useFormatNumber(1300)}</p>
                    </div>
                    <p className='created-at'>5 days ago</p>
                </div>
            </div>
        </div>
    )
}

const CloseDebateLoadingCard = () => {
    const { isSidebarClose } = useNavStore()

    return (
        <div id='closed-card-loading' className={isSidebarClose ? 'card-break' : ''}>
            <div className='left'>
                <div className='topic'>
                    <LoadingSkeleton />
                </div>
                <div className='description'>
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                </div>
            </div>
            <div className='right'>
                <div className='user-info'>
                    <div className='debater'>
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                    </div>
                    <div className='debater'>
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                    </div>
                </div>
                <div className='debate-bar'>
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                </div>
                <div className='debate-info'>
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                </div>
            </div>
        </div>
    )
}

export { CloseDebateCard, CloseDebateLoadingCard }