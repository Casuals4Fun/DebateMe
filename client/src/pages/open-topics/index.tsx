import './style.css'
import { useNavStore } from '../../store/useNavStore'
import { OpenDebateCard, OpenDebateLoadingCard } from '../../components/card/open-debate-card'

export default function OpenTopicsPage() {
    const { isSidebarClose } = useNavStore()

    return (
        <div className={`debates ${isSidebarClose ? 'column-debates' : ''}`}>
            <OpenDebateLoadingCard />
            <OpenDebateCard />
            <OpenDebateLoadingCard />
            <OpenDebateCard />
            <OpenDebateLoadingCard />
            <OpenDebateCard />
            <OpenDebateLoadingCard />
            <OpenDebateCard />
            <OpenDebateLoadingCard />
            <OpenDebateCard />
            <OpenDebateLoadingCard />
            <OpenDebateCard />
            <OpenDebateLoadingCard />
            <OpenDebateCard />
            <OpenDebateLoadingCard />
            <OpenDebateCard />
            <OpenDebateLoadingCard />
            <OpenDebateCard />
            <OpenDebateLoadingCard />
            <OpenDebateCard />
        </div>
    )
}