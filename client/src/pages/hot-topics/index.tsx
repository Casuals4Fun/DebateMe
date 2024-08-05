import './style.css'
import { useNavStore } from '../../store/useNavStore'
import { ClosedDebateCard, ClosedDebateLoadingCard } from '../../components/card/closed-debate-card'

export default function HotTopicsPage() {
    const { sidebar } = useNavStore()

    return (
        <div className={`debates ${sidebar ? 'column-debates' : ''}`}>
            <ClosedDebateLoadingCard />
            <ClosedDebateCard />
            <ClosedDebateLoadingCard />
            <ClosedDebateCard />
            <ClosedDebateLoadingCard />
            <ClosedDebateCard />
            <ClosedDebateLoadingCard />
            <ClosedDebateCard />
            <ClosedDebateLoadingCard />
            <ClosedDebateCard />
            <ClosedDebateLoadingCard />
            <ClosedDebateCard />
            <ClosedDebateLoadingCard />
            <ClosedDebateCard />
            <ClosedDebateLoadingCard />
            <ClosedDebateCard />
            <ClosedDebateLoadingCard />
            <ClosedDebateCard />
            <ClosedDebateLoadingCard />
            <ClosedDebateCard />
        </div>
    )
}