import './style.css'
import { Outlet } from 'react-router-dom'
import { useNavStore } from '../../store/nav'

interface DebateProps {
    children?: React.ReactNode
}

const Debate: React.FC<DebateProps> = ({ children }) => {
    const { isSidebarClose } = useNavStore()

    return (
        <div className={`debates ${isSidebarClose ? 'column' : ''}`}>
            {children || <Outlet />}
        </div>
    )
}

export default Debate