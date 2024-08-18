import './left-sidebar.css'
import { useLocation, Link } from 'react-router-dom'
import { toast } from 'sonner'
import { GoPerson } from 'react-icons/go'
import { AuthStatus, AuthTab, useAuthStore } from '../../store/auth'
import { useNavStore } from '../../store/nav'
import { navLinks } from '../../data/sidebar'
import Profile from './profile'
import LoadingSkeleton from '../loading/skeleton'

interface SidebarProps {
  isVisible: boolean
}

const LeftSidebar: React.FC<SidebarProps> = ({ isVisible }) => {
  const location = useLocation()

  const { setRoute, isAuthenticated, setAuthTab } = useAuthStore()
  const { isSidebarClose } = useNavStore()

  const handleLinkClick = (name: string) => {
    if (name === 'Create Debate') {
      if (isAuthenticated === AuthStatus.Failed) {
        setRoute('/create')
        setAuthTab(AuthTab.Login)
      }
      else if (isAuthenticated === AuthStatus.Authenticating) return toast.warning('Logging in...')
    }
  }

  return (
    <aside id='left-sidebar' className={`${isVisible ? 'reveal' : 'hide'} ${isSidebarClose ? 'close' : 'open'}`}>
      <Link to='/' className='logo__wrapper'>
        <img src='/logo.png' alt='' />
      </Link>
      <nav>
        {navLinks.map(item => (
          <Link to={item.href} onClick={() => handleLinkClick(item.name)} key={item.id} title={item.name} className={location.pathname === item.href ? 'active' : ''}>
            <div className='links__wrapper'>
              <item.icon />
              <p className='underline'>{item.name}</p>
            </div>
            <div className='footer' />
          </Link>
        ))}
      </nav>
      <div className='profile__container'>
        {isAuthenticated === AuthStatus.Authenticating ? (
          <LoadingSkeleton style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        ) : isAuthenticated === AuthStatus.Authenticated ? (
          <Profile />
        ) : isAuthenticated === AuthStatus.Failed && (
          <>
            <button onClick={() => setAuthTab(AuthTab.Login)}>
              <GoPerson size={30} />
            </button>
          </>
        )}
      </div>
    </aside>
  )
}

export default LeftSidebar