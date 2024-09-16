import './card.css'
import { useNavigate } from 'react-router-dom'
import { IoMdMore } from 'react-icons/io'
import { MdModeComment } from 'react-icons/md'
import { IoCaretUpSharp } from 'react-icons/io5'
import useFormatNumber from '../../hooks/useFormatNumber'
import LoadingSkeleton from '../loading/skeleton'

const DebateCard = () => {
    const navigate = useNavigate()

    return (
        <article id='debate-card'>
            <div className='debate-header'>
                <h2 onClick={() => navigate('/aniketdas/Artificial Intelligence – Is AI good for society or not')}>
                    Artificial Intelligence – Is AI good for society or not?
                </h2>
                <button className='more-btn'>
                    <IoMdMore color='var(--card_color)' />
                </button>
            </div>
            <p className='debate-body' onClick={() => navigate('/aniketdas/Artificial Intelligence – Is AI good for society or not')}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non labore necessitatibus reiciendis rem ad perferendis, id officia omnis voluptas eius veritatis explicabo harum! Vero porro labore quo ab aut. Nesciunt!
                Fugiat repellat architecto pariatur fugit perspiciatis voluptas quidem autem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non labore necessitatibus reiciendis rem ad perferendis, id officia omnis voluptas eius veritatis explicabo harum! Vero porro labore quo ab aut. Nesciunt!
                Fugiat repellat architecto pariatur fugit perspiciatis voluptas quidem autem.
            </p>
            <div className='user-info'>
                <img src='/user.jpg' alt='avatar' loading='lazy' onClick={() => navigate('/julieroberts')} />
                <div className='user-detail'>
                    <p onClick={() => navigate('/julieroberts')}>Julie Roberts</p>
                    <p onClick={() => navigate('/julieroberts')}>julieroberts</p>
                </div>
            </div>
            <div className='debate-footer'>
                <div className='debate-info'>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', cursor: 'default' }}>
                        <IoCaretUpSharp size={20} />
                        <p>{useFormatNumber(4500)}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'default' }}>
                        <MdModeComment size={15} />
                        <p>{useFormatNumber(1300)}</p>
                    </div>
                </div>
                <p className='created-date'>15 mins ago</p>
            </div>
        </article>
    )
}

const DebateLoadingCard = () => {
    return (
        <div id='debate-card-loading'>
            <div className='debate-header'>
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
        </div>
    )
}

export { DebateCard, DebateLoadingCard }