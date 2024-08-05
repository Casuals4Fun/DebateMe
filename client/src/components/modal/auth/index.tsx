import './index.css'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import { useAuthStore, AuthTab, useTempStore } from '../../../store/useAuthStore'
import WavingHand from '../../../lottie/WavingHand.json'
import LoginTab from './login-tab'
import SignupTab from './signup-tab'
import ForgotPassword from './forgot-password'
import ResetPassword from './set-password'
import { IoCloseOutline } from 'react-icons/io5'

type RegisterData = {
    avatar: string | File
    username: string
    first_name: string
    last_name: string
    email: string
}

const AuthModal = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const { authTab, setAuthTab } = useAuthStore()
    const { tempUser } = useTempStore()

    const [registerData, setRegisterData] = useState<RegisterData>(() => ({
        avatar: tempUser.avatar || '',
        username: localStorage.getItem('username') || tempUser.username || '',
        first_name: tempUser.first_name || '',
        last_name: tempUser.last_name || '',
        email: tempUser.email || ''
    }))

    const handleCloseModal = () => {
        if (location.pathname !== '/auth') setAuthTab(AuthTab.Closed)
        else {
            navigate('/')
            setAuthTab(AuthTab.Closed)
        }
    }

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (location.pathname !== '/auth' && event.target === event.currentTarget) {
            setAuthTab(AuthTab.Closed)
        }
    }

    return (
        <div id='auth-modal' onClick={handleBackgroundClick}>
            <div className='auth__container'>
                <div className='left__container'>
                    <Lottie
                        animationData={WavingHand}
                        className='lottie-anim'
                        loop={true}
                    />
                </div>
                <div className='right__container'>
                    {authTab === AuthTab.Login ? (
                        <LoginTab />
                    ) : authTab === AuthTab.Signup ? (
                        <SignupTab
                            registerData={registerData}
                            setRegisterData={setRegisterData}
                        />
                    ) : authTab === AuthTab.Forgot ? (
                        <ForgotPassword />
                    ) : authTab === AuthTab.Reset && (
                        <ResetPassword />
                    )}
                </div>
                <>
                    <button onClick={handleCloseModal} className='logo__wrapper'>
                        <img src='/logo.png' alt='' />
                    </button>
                    <button
                        className='close__btn'
                        onClick={handleCloseModal}
                    >
                        <IoCloseOutline size={30} />
                    </button>
                </>
            </div>
        </div>
    )
}

export default AuthModal