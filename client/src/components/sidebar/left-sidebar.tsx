import './left-sidebar.css'
import { useLocation, Link } from 'react-router-dom'
import { toast } from 'sonner'
import { GoPerson } from 'react-icons/go'
import { AuthStatus, AuthTab, useAuthStore } from '../../store/auth'
import { navLinks } from '../../data/sidebar'
import Profile from './profile'
import LoadingSkeleton from '../loading/skeleton'

const LeftSidebar = () => {
  const location = useLocation()

  const { isAuthenticated, setAuthTab } = useAuthStore()

  const handleLinkClick = (name: string) => {
    if (name === 'Create Debate') {
      if (isAuthenticated === AuthStatus.Failed) {
        localStorage.setItem('route', '/create')
        setAuthTab(AuthTab.Login)
      }
      else if (isAuthenticated === AuthStatus.Authenticating) return toast.warning('Logging in...')
    }
  }

  return (
    <>
      <Link to='/' className='logo__wrapper'>
        <img src='/logo.png' alt='logo' />
      </Link>
      <nav>
        {navLinks.map(item => (
          <Link
            key={item.id}
            title={item.name}
            className={location.pathname === item.href ? 'active' : ''}
            to={item.name === 'Create Debate' ? isAuthenticated === AuthStatus.Authenticated ? item.href : '#' : item.href}
            onClick={() => handleLinkClick(item.name)}
          >
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
          <button onClick={() => setAuthTab(AuthTab.Login)}>
            <GoPerson size={30} />
          </button>
        )}
      </div>
    </>
  )
}

export default LeftSidebar