import './left-sidebar.css'
import { useLocation, Link } from 'react-router-dom'
import { toast } from 'sonner'
import { GoPerson } from 'react-icons/go'
import { IoIosArrowBack } from 'react-icons/io'
import { RiNotification4Fill, RiNotification4Line } from 'react-icons/ri'
import { IoSettingsOutline, IoSettingsSharp } from 'react-icons/io5'
import { AiOutlineLogout } from 'react-icons/ai'
import { AuthStatus, AuthTab, useAuthStore } from '../../store/auth'
import { useNavStore } from '../../store/nav'
import { navLinks } from '../../data/sidebar'
import LoadingSkeleton from '../loading/skeleton'

const LeftSidebar = () => {
  const location = useLocation()

  const { isAuthenticated, setIsAuthenticated, user, setUser, setAuthTab } = useAuthStore()
  const { isNavbarOpen, setNavbarOpen } = useNavStore()

  const handleLinkClick = (name: string, href: string) => {
    if (name === 'New Debate') {
      if (isAuthenticated === AuthStatus.Failed) {
        localStorage.setItem('route', href)
        setAuthTab(AuthTab.Login)
      }
      else if (isAuthenticated === AuthStatus.Authenticating) return toast.warning('Logging in...')
    }
  }

  const handleLogout = () => {
    setNavbarOpen(false)
    setIsAuthenticated(AuthStatus.Failed)
    setUser({
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      avatar: ''
    })
    localStorage.removeItem('token')
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
            to={item.name === 'New Debate' ? isAuthenticated === AuthStatus.Authenticated ? item.href : '#' : item.href}
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
            else setNavbarOpen(true)
          }}
        >
          {isAuthenticated === AuthStatus.Authenticating ? (
            <LoadingSkeleton style={{ width: '25px', height: '25px', borderRadius: '50%' }} />
          ) : isAuthenticated === AuthStatus.Failed ? <GoPerson /> : user.avatar ? (
            <img src={user.avatar} alt='avatar' loading='lazy' referrerPolicy='no-referrer' />
          ) : <GoPerson />}
          {isAuthenticated === AuthStatus.Authenticating ? (
            <LoadingSkeleton style={{ width: '75px', height: '25px', borderRadius: '20px' }} />
          ) : <p>Account</p>}
        </Link>

        {isNavbarOpen && (
          <div className='account'>
            <Link
              title='Back'
              to='#'
              className='links__wrapper'
              onClick={() => setNavbarOpen(false)}
            >
              <IoIosArrowBack />
              <p>Back</p>
            </Link>
            <Link
              title='Profile'
              to={user.username}
              className={location.pathname === `/${user.username}` ? 'active' : ''}
            >
              <div className='links__wrapper'>
                {user.avatar ? (
                  <img src={user.avatar} alt='avatar' loading='lazy' referrerPolicy='no-referrer' />
                ) : <GoPerson />}
                <p className='underline'>Profile</p>
              </div>
            </Link>
            <Link to='#' />
            <Link
              title='Notifications'
              to='/notifications'
              className={location.pathname === '/notifications' ? 'active' : ''}
            >
              <div className='links__wrapper'>
                {location.pathname === '/notifications' ? <RiNotification4Fill /> : <RiNotification4Line />}
                <p className='underline'>Notifications</p>
              </div>
            </Link>
            <Link
              title='Settings'
              to='/settings'
              className={location.pathname === '/settings' ? 'active' : ''}
            >
              <div className='links__wrapper'>
                {location.pathname === '/settings' ? <IoSettingsSharp /> : <IoSettingsOutline />}
                <p className='underline'>Settings</p>
              </div>
            </Link>
            <Link
              title='Logout'
              to='#'
              className='links__wrapper'
              onClick={handleLogout}
            >
              <AiOutlineLogout />
              <p>Logout</p>
            </Link>
          </div>
        )}
      </nav>
    </>
  )
}

export default LeftSidebar