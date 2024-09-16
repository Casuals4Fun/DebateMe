import './style.css'
import Debate from '../../components/debate'
import { DebateCard } from '../../components/debate/card'

export default function ProfilePage() {
    return (
        <div id='profile'>
            <div className='user'>
                <img src='/user1.webp' alt='avatar' />
                <h1>Aniket Das</h1>
                <h3>aniketdas</h3>
            </div>
            <Debate>
                <DebateCard />
                <DebateCard />
                <DebateCard />
                <DebateCard />
                <DebateCard />
            </Debate>
        </div>
    )
}