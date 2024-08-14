import { useState } from 'react'
import Debate from '../../components/debate'
import { ClosedDebateCard } from '../../components/debate/closed'
import { OpenDebateCard } from '../../components/debate/open'

interface DebatesProps {
    isScrollingUp: boolean
}

enum Tabs {
    Closed = 'closed-debates',
    Open = 'open-debates'
}

const UserDebates: React.FC<DebatesProps> = ({ isScrollingUp }) => {
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
            <Debate>
                {tab === Tabs.Closed ? <ClosedDebates /> : <OpenDebates />}
            </Debate>
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