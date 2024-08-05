import './style.css'
import { useNavStore } from '../../store/useNavStore'
import { ClosedDebateCard } from '../../components/card/closed-debate-card'
import { OpenDebateCard } from '../../components/card/open-debate-card'

export default function HomePage() {
  const { sidebar } = useNavStore()

  return (
    <div className={`debates ${sidebar ? 'column-debates' : ''}`}>
      <ClosedDebateCard />
      <OpenDebateCard />
      <ClosedDebateCard />
      <OpenDebateCard />
      <OpenDebateCard />
      <ClosedDebateCard />
      <OpenDebateCard />
      <ClosedDebateCard />
      <OpenDebateCard />
      <OpenDebateCard />
      <ClosedDebateCard />
      <OpenDebateCard />
      <ClosedDebateCard />
      <OpenDebateCard />
      <OpenDebateCard />
      <ClosedDebateCard />
      <OpenDebateCard />
      <ClosedDebateCard />
      <OpenDebateCard />
      <OpenDebateCard />
      <ClosedDebateCard />
      <OpenDebateCard />
      <ClosedDebateCard />
      <OpenDebateCard />
      <OpenDebateCard />
    </div>
  )
}