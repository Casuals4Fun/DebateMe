import './profile.css'
import React, { useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useNavStore } from '../../store/useNavStore'
import { AuthStatus, AuthTab, useAuthStore } from '../../store/useAuthStore'
import ToggleTheme from '../button/toggle-theme'
import LoadingSkeleton from '../loading/skeleton'
import { IoMdPerson } from 'react-icons/io'
import { PiBellSimpleFill, PiSignOutBold } from 'react-icons/pi'
import { GoPerson } from 'react-icons/go'
import { FaRegUser } from 'react-icons/fa'

interface ProfileProps {
    isVisible?: boolean
}

const Profile: React.FC<ProfileProps> = ({ isVisible }) => {
    const navigate = useNavigate()
    const { expand, setExpand } = useNavStore()
    const { isAuthenticated, setIsAuthenticated, user, setUser, authTab, setAuthTab } = useAuthStore()

    const handleToggleMenu = useCallback(() => {
        setExpand(!expand)
        const mainElement = document.querySelector('#main') as HTMLElement
        if (mainElement) {
            if (window.matchMedia('(max-width: 480px)').matches) {
                if (expand) mainElement.style.overflow = ''
                else mainElement.style.overflow = 'hidden'
            }
            else mainElement.style.overflow = ''
        }
    }, [expand, setExpand])

    const handleLogout = () => {
        handleToggleMenu()
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
            if (expand && !target.closest('.profile__modal') && !target.closest('.profile__image')) {
                handleToggleMenu()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [expand, handleToggleMenu])

    return (
        <div className='profile__wrapper'>
            <Link
                to='/notifications'
                className='notification-btn'
                style={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: location.pathname === '/notifications' ? 'var(--body_color)' : 'transparent'
                }}
            >
                <PiBellSimpleFill size={20} />
            </Link>
            {isAuthenticated === AuthStatus.Authenticating ? (
                <LoadingSkeleton style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            ) : isAuthenticated === AuthStatus.Authenticated ? (
                <>
                    <div
                        className='profile__image'
                        style={{
                            borderWidth: '2px',
                            borderStyle: 'solid',
                            borderColor: `${expand ? 'var(--body_color)' : 'transparent'}`
                        }}
                        onClick={handleToggleMenu}
                    >
                        {user.avatar ? (
                            <img src={user.avatar} alt='' loading='lazy' referrerPolicy='no-referrer' />
                        ) : (
                            <FaRegUser style={{ width: '50%', height: '50%' }} />
                        )}
                    </div>
                </>
            ) : authTab === AuthTab.Closed && (
                <>
                    <button
                        className='auth-btn'
                        style={{ border: `${authTab !== AuthTab.Closed ? '2px solid var(--body_color)' : ''}` }}
                        onClick={() => setAuthTab(AuthTab.Login)}
                    >
                        <GoPerson size={20} />
                        <p>Join Community</p>
                    </button>
                </>
            )}

            {expand && (
                <div className={`profile__modal ${isVisible ? 'shift-down' : 'shift-up'}`}>
                    <div className='modal-profile__wrapper'>
                        <div className='profile-wrapper'>
                            <Link to={user.username} className='modal-profile__image' onClick={handleToggleMenu}>
                                {user.avatar ? (
                                    <img src={user.avatar} alt='' loading='lazy' referrerPolicy='no-referrer' />
                                ) : (
                                    <FaRegUser style={{ width: '50%', height: '50%' }} />
                                )}
                            </Link>
                            <div className='modal-profile__info'>
                                <Link to={user.username} onClick={handleToggleMenu}>{user.first_name} {user.last_name}</Link>
                                <Link to={user.username} onClick={handleToggleMenu}>{user.username}</Link>
                            </div>
                        </div>
                        <ToggleTheme />
                    </div>
                    <Link
                        to={user.username}
                        className='modal-profile-btn'
                        onClick={handleToggleMenu}
                    >
                        <IoMdPerson size={18} />
                        <p className='underline'>Profile</p>
                    </Link>
                    <button
                        className='modal-profile-btn'
                        onClick={handleLogout}
                    >
                        <PiSignOutBold size={18} />
                        <p className='underline'>Logout</p>
                    </button>
                </div>
            )}
        </div>
    )
}

export default Profile