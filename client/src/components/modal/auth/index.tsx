import "./index.css"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Lottie from "lottie-react"
import { useAuthStore, AuthTab, useTempStore } from "../../../store/useAuthStore"
import { Theme, useNavStore } from "../../../store/useNavStore"
import WavingHand from "../../../lottie/WavingHand.json"
import LoginTab from "./login-tab"
import SignupTab from "./signup-tab"
import BriefInfo from "./brief-info"
import { IoClose } from "react-icons/io5"

type RegisterData = {
    email: string;
    password: string;
    avatar: string | File;
    username: string;
    first_name: string;
    last_name: string;
};

const AuthModal = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { authTab, setAuthTab } = useAuthStore();
    const { theme, setTheme } = useNavStore();
    const { tempUser } = useTempStore();

    const [registerData, setRegisterData] = useState<RegisterData>(() => ({
        email: tempUser.email || "",
        password: "",
        avatar: tempUser.avatar || "",
        username: tempUser.username || "",
        first_name: tempUser.first_name || "",
        last_name: tempUser.last_name || ""
    }));

    const handleToggleTheme = () => {
        const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;
        document.querySelector("body")?.setAttribute('data-theme', newTheme);
        setTheme(newTheme);
    };

    const handleCloseModal = () => {
        if (location.pathname !== '/auth') setAuthTab(AuthTab.Closed);
        else {
            navigate('/');
            setAuthTab(AuthTab.Closed);
        }
    };

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (location.pathname !== '/auth' && event.target === event.currentTarget) {
            setAuthTab(AuthTab.Closed);
        }
    };

    return (
        <div id='auth-modal' onClick={handleBackgroundClick}>
            <div className='auth__container'>
                <div className='left__container'>
                    <Lottie
                        animationData={WavingHand}
                        className="lottie-anim"
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
                    ) : authTab === AuthTab.Info && (
                        <BriefInfo
                            registerData={registerData}
                            setRegisterData={setRegisterData}
                        />
                    )}
                </div>
                <>
                    <button onClick={handleCloseModal} className='logo__wrapper'>
                        <img src="/logo.png" alt="" />
                    </button>
                    <button
                        className='theme-btn'
                        onClick={handleToggleTheme}
                        title={theme === Theme.Dark ? 'Switch to Light mode' : 'Switch to Dark mode'}
                    >
                        {theme === Theme.Dark ? <img className="sun" src="theme/sun.svg" alt="" /> : <img className="moon" src="theme/moon.png" alt="" />}
                    </button>
                    <button
                        className='close__btn'
                        onClick={handleCloseModal}
                    >
                        <IoClose size={30} />
                    </button>
                </>
            </div>
        </div>
    )
}

export default AuthModal