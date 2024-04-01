import "./auth-modal.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthStore, AuthTab } from "../../store/useAuthStore";
import LoginTab from "./login-tab";
import SignupTab from "./signup-tab";
import BriefInfo from "./brief-info";
import { IoClose } from "react-icons/io5";

const AuthModal = () => {
    const location = useLocation();
    const { authTab, setAuthTab } = useAuthStore();

    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        avatar: "",
        username: "",
        first_name: "",
        last_name: ""
    });

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (location.pathname !== '/auth' && event.target === event.currentTarget) {
            setAuthTab(AuthTab.Closed);
        }
    };

    return (
        <div id='auth-modal' onClick={handleBackgroundClick}>
            <div className='auth__container'>
                <div className='left__container'>
                    WelcomeTab
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
                {location.pathname !== '/auth' && (
                    <button
                        className='close__btn'
                        onClick={() => setAuthTab(AuthTab.Closed)}
                    >
                        <IoClose size={25} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default AuthModal