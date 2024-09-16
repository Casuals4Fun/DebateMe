import './left-sidebar.css'
import { useLocation, Link } from 'react-router-dom'
import { toast } from 'sonner'
import { GoPerson, GoPersonFill } from 'react-icons/go'
import { AuthStatus, AuthTab, useAuthStore } from '../../store/auth'
import { navLinks } from '../../data/sidebar'

const LeftSidebar = () => {
  const location = useLocation()

  const { isAuthenticated, setAuthTab } = useAuthStore()

  const handleLinkClick = (name: string, href: string) => {
    if (name === 'New Debate' || name === 'Notifications') {
      if (isAuthenticated === AuthStatus.Failed) {
        localStorage.setItem('route', href)
        setAuthTab(AuthTab.Login)
      }
      else if (isAuthenticated === AuthStatus.Authenticating) return toast.warning('Logging in...')
    }
  }

  return (
    <>
      <Link to='/' className='logo'>
        <img src='/logo.png' alt='DebateMe' />
      </Link>
      <nav>
        {navLinks.map(item => (
          <Link
            key={item.id}
            title={item.name}
            className={location.pathname === item.href ? 'active' : ''}
            to={item.name === 'New Debate' || item.name === 'Notifications' ? isAuthenticated === AuthStatus.Authenticated ? item.href : '#' : item.href}
            onClick={() => handleLinkClick(item.name, item.href)}
          >
            <div className='links__wrapper'>
              {location.pathname === item.href ? <item.icon2 /> : <item.icon1 />}
              <p className='underline'>{item.name}</p>
            </div>
            <div className='footer' />
          </Link>
        ))}
        <Link
          title='Account'
          to='#'
          className='links__wrapper'
          onClick={() => {
            if (isAuthenticated === AuthStatus.Failed) {
              localStorage.removeItem('route')
              setAuthTab(AuthTab.Login)
            }
            else { }
          }}
        >
          {false ? <GoPersonFill /> : <GoPerson />}
          <p>Account</p>
        </Link>
      </nav>
    </>
  )
}

export default LeftSidebar