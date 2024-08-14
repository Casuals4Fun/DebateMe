import './style.css'
import UserDebates from './debates'

interface ProfileProps {
    isScrollingUp: boolean
}

export default function ProfilePage({ isScrollingUp }: ProfileProps) {
    return (
        <div id='profile'>
            <div className='user'>
                <img src='/user1.webp' alt='' />
                <h1>Aniket Das</h1>
                <h3>@aniketdas</h3>
            </div>
            <UserDebates isScrollingUp={isScrollingUp} />
        </div>
    )
}