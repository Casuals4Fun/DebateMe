import { useState } from 'react'
import { useNavStore } from '../../store/useNavStore'
import { ClosedDebateCard } from '../../components/card/closed-debate-card'
import { OpenDebateCard } from '../../components/card/open-debate-card'

interface DebatesProps {
    isScrollingUp: boolean
}

enum Tabs {
    Closed = 'closed-debates',
    Open = 'open-debates'
}

const UserDebates: React.FC<DebatesProps> = ({ isScrollingUp }) => {
    const { sidebar } = useNavStore()

    const [tab, setTab] = useState<Tabs>(Tabs.Closed)

    return (
        <div>
            <div className={`profile-btns ${isScrollingUp ? '' : 'top'}`}>
                <button
                    style={{ textDecoration: tab === Tabs.Closed ? 'underline' : '' }}
                    onClick={() => setTab(Tabs.Closed)}
                >
                    Closed Debates
                </button>
                <button
                    style={{ textDecoration: tab === Tabs.Open ? 'underline' : '' }}
                    onClick={() => setTab(Tabs.Open)}
                >
                    Open Debates
                </button>
            </div>
            <div className={`debates ${sidebar ? 'column-debates' : ''}`}>
                {tab === Tabs.Closed ? <ClosedDebates /> : <OpenDebates />}
            </div>
        </div>
    )
}

const ClosedDebates = () => {
    return (
        <>
            <ClosedDebateCard />
            <ClosedDebateCard />
            <ClosedDebateCard />
            <ClosedDebateCard />
            <ClosedDebateCard />
        </>
    )
}

const OpenDebates = () => {
    return (
        <>
            <OpenDebateCard />
            <OpenDebateCard />
            <OpenDebateCard />
            <OpenDebateCard />
            <OpenDebateCard />
        </>
    )
}

export default UserDebates