import "./style.css"
import { useNavStore } from "../../store/useNavStore"
import { OpenDebateCard, OpenDebateLoadingCard } from "../../components/card/open-debate-card"

export default function OpenTopicsPage() {
    const { sidebar } = useNavStore();

    return (
        <div className={`debates ${sidebar ? '' : 'column-debates'}`}>
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