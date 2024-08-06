import { useNavStore } from "../../store/useNavStore"
import { ClosedDebateCard } from "../../components/card/closed-debate-card"
import { OpenDebateCard } from "../../components/card/open-debate-card"

interface DebatesProps {
    isScrollingUp: boolean
}

const UserDebates: React.FC<DebatesProps> = ({ isScrollingUp }) => {
    const { sidebar } = useNavStore()

    return (
        <div>
            <div className={`profile-btns ${isScrollingUp ? '' : 'top'}`}>
                <button>Closed Debates</button>
                <button>Open Debates</button>
            </div>
            <div className={`debates ${sidebar ? 'column-debates' : ''}`}>
                <ClosedDebateCard />
                <OpenDebateCard />
                <ClosedDebateCard />
                <OpenDebateCard />
                <ClosedDebateCard />
                <OpenDebateCard />
                <ClosedDebateCard />
                <OpenDebateCard />
            </div>
        </div>
    )
}

export default UserDebates