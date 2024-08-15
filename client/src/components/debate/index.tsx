import { Outlet } from 'react-router-dom'
import { useNavStore } from '../../store/useNavStore'

interface DebateProps {
    children?: React.ReactNode
}

const Debate: React.FC<DebateProps> = ({ children }) => {
    const { isSidebarClose } = useNavStore()

    return (
        <div className={`debates ${isSidebarClose ? 'column-debates' : ''}`}>
            {children || <Outlet />}
        </div>
    )
}

export default Debate