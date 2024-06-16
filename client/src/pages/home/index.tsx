import "./style.css"
import { AuthStatus, useAuthStore } from "../../store/useAuthStore"
import { useNavStore } from "../../store/useNavStore";
import ClaimUsername from "../../components/card/claim-username";
import { ClosedDebateCard } from "../../components/card/closed-debate-card"
import { OpenDebateCard } from "../../components/card/open-debate-card"

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();
  const { sidebar } = useNavStore();

  return (
    <div className={`debates ${sidebar ? '' : 'grid-debates'}`}>
      {(isAuthenticated === AuthStatus.Authenticating || isAuthenticated === AuthStatus.Failed) && (
        <ClaimUsername />
      )}
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