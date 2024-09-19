import './profile.css'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoPerson } from 'react-icons/go'
import { RiNotification4Line } from 'react-icons/ri'
import { IoSettingsOutline } from 'react-icons/io5'
import { AiOutlineLogout } from 'react-icons/ai'
import { useNavStore } from '../../store/nav'
import { AuthStatus, AuthTab, useAuthStore } from '../../store/auth'
import ToggleTheme from '../theme'
import LoadingSkeleton from '../loading/skeleton'

const Profile = () => {
    const navigate = useNavigate()
    const { isNavbarOpen, setNavbarOpen } = useNavStore()
    const { isAuthenticated, setIsAuthenticated, user, setUser, authTab, setAuthTab } = useAuthStore()

    const handleNavbar = () => {
        document.body.style.overflow = isNavbarOpen ? 'auto' : 'hidden'
        setNavbarOpen(!isNavbarOpen)
    }

    const handleLogout = () => {
        handleNavbar()
        navigate('/')
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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (isNavbarOpen && !target.closest('.profile__modal') && !target.closest('.profile__image') && !target.closest('#left-sidebar')) {
                document.body.style.overflow = 'auto'
                setNavbarOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isNavbarOpen, setNavbarOpen])

    return (
        <div className='profile__wrapper'>
            {isAuthenticated === AuthStatus.Authenticating ? (
                <LoadingSkeleton style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            ) : isAuthenticated === AuthStatus.Authenticated ? (
                <button
                    className='profile__image'
                    style={{
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: `${isNavbarOpen ? 'var(--body_color)' : 'transparent'}`
                    }}
                    onClick={handleNavbar}
                >
                    {user.avatar ? (
                        <img src={user.avatar} alt='avatar' loading='lazy' referrerPolicy='no-referrer' />
                    ) : (
                        <GoPerson style={{ width: '50%', height: '50%' }} />
                    )}
                </button>
            ) : authTab === AuthTab.Closed && (
                <button
                    className='auth-btn'
                    style={{ border: `${authTab !== AuthTab.Closed ? '2px solid var(--body_color)' : ''}` }}
                    onClick={() => setAuthTab(AuthTab.Login)}
                >
                    <GoPerson size={20} />
                </button>
            )}

            {isNavbarOpen && (
                <div className='profile__modal'>
                    <div className='modal-profile__wrapper'>
                        <div className='profile-wrapper'>
                            <Link to={user.username} className='modal-profile__image' onClick={handleNavbar}>
                                {user.avatar ? (
                                    <img src={user.avatar} alt='avatar' loading='lazy' referrerPolicy='no-referrer' />
                                ) : (
                                    <GoPerson style={{ width: '50%', height: '50%' }} />
                                )}
                            </Link>
                            <div className='modal-profile__info'>
                                <Link to={user.username} onClick={handleNavbar}>{user.first_name} {user.last_name}</Link>
                                <Link to={user.username} onClick={handleNavbar}>{user.username}</Link>
                            </div>
                        </div>
                        <ToggleTheme />
                    </div>
                    <Link
                        to='/notifications'
                        className='modal-profile-btn'
                        onClick={handleNavbar}
                    >
                        <RiNotification4Line size={20} />
                        <p>Notifications</p>
                    </Link>
                    <Link
                        to='/settings'
                        className='modal-profile-btn'
                        onClick={handleNavbar}
                    >
                        <IoSettingsOutline size={20} />
                        <p>Settings</p>
                    </Link>
                    <button
                        className='modal-profile-btn'
                        onClick={handleLogout}
                    >
                        <AiOutlineLogout size={20} />
                        <p>Logout</p>
                    </button>
                </div>
            )}
        </div>
    )
}

export default Profile