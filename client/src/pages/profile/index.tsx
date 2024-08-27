import './style.css'
import Debate from '../../components/debate'
import { CloseDebateCard } from '../../components/debate/close'
import { OpenDebateCard } from '../../components/debate/open'

export default function ProfilePage() {
    return (
        <div id='profile'>
            <div className='user'>
                <img src='/user1.webp' alt='avatar' />
                <h1>Aniket Das</h1>
                <h3>aniketdas</h3>
            </div>
            <Debate>
                <CloseDebateCard />
                <OpenDebateCard />
                <CloseDebateCard />
                <OpenDebateCard />
                <CloseDebateCard />
                <OpenDebateCard />
                <CloseDebateCard />
                <OpenDebateCard />
                <CloseDebateCard />
                <OpenDebateCard />
            </Debate>
        </div>
    )
}