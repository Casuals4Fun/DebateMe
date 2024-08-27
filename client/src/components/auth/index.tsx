import './style.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import { IoCloseOutline } from 'react-icons/io5'
import { useAuthStore, AuthTab } from '../../store/auth'
import WavingHand from '../../lottie/WavingHand.json'
import Login from './login'
import Signup from './signup'
import ForgotPassword from './forgot-password'
import SetPassword from './set-password'

const AuthModal = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const { authTab, setAuthTab } = useAuthStore()

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
                    {authTab === AuthTab.Login ? <Login />
                        : authTab === AuthTab.Signup ? <Signup />
                            : authTab === AuthTab.Forgot ? <ForgotPassword />
                                : authTab === AuthTab.Reset && <SetPassword />
                    }
                </div>

                <button onClick={handleCloseModal} className='logo__wrapper'>
                    <img src='/logo.png' alt='logo' />
                </button>
                <button
                    className='close__btn'
                    onClick={handleCloseModal}
                >
                    <IoCloseOutline size={30} />
                </button>
            </div>
        </div>
    )
}

export default AuthModal