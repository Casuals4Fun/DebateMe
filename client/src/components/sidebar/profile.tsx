import "./profile.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNavStore } from "../../store/useNavStore";
import { AuthStatus, AuthTab, useAuthStore } from "../../store/useAuthStore";
import ToggleTheme from "../button/toggle-theme";
import useLogout from "../../hooks/useLogout";
import LoadingSkeleton from "../loading/skeleton";
import { IoMdPerson } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";

const Profile = () => {
    const navigate = useNavigate();
    const { expand, setExpand } = useNavStore();
    const { isAuthenticated, setIsAuthenticated, user, setUser, authTab, setAuthTab } = useAuthStore();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (
                expand &&
                !target.closest(".profile__modal") &&
                !target.closest(".profile__image")
            ) {
                setExpand(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [expand, setExpand]);

    return (
        <div className='profile__wrapper'>
            {isAuthenticated === AuthStatus.Authenticating ? (
                <LoadingSkeleton />
            ) : isAuthenticated === AuthStatus.Authenticated ? (
                <div
                    className='profile__image'
                    style={{
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: `${expand ? 'var(--body_color)' : 'var(--nav_border)'}`
                    }}
                    onClick={() => setExpand(!expand)}
                >
                    {user.avatar ? (
                        <img src={user.avatar} alt="" />
                    ) : (
                        <FaRegUser style={{ width: '50%', height: '50%' }} />
                    )}
                </div>
            ) : (
                <button
                    className='login-btn'
                    style={{ border: `${authTab !== AuthTab.Closed ? '2px solid var(--body_color)' : ''}` }}
                    onClick={() => setAuthTab(AuthTab.Login)}
                >
                    <GoPerson size={20} />
                    <p>Login</p>
                </button>
            )}

            {expand && (
                <div className='profile__modal'>
                    <div className='modal-profile__wrapper'>
                        <div className="profile-wrapper">
                            <div className='modal-profile__image'>
                                {user.avatar ? (
                                    <img src={user.avatar} alt="" />
                                ) : (
                                    <FaRegUser style={{ width: '50%', height: '50%' }} />
                                )}
                            </div>
                            <div className='modal-profile__info'>
                                <p>{user.first_name} {user.last_name}</p>
                                <p>{user.username}</p>
                            </div>
                        </div>
                        <ToggleTheme />
                    </div>
                    <Link
                        to='/'
                        className='modal-profile-btn'
                        onClick={() => setExpand(false)}
                    >
                        <IoMdPerson size={18} />
                        <p className='underline'>Profile</p>
                    </Link>
                    <button
                        className='modal-profile-btn'
                        onClick={() => {
                            setExpand(false);
                            useLogout(navigate, setIsAuthenticated, setUser);
                        }}
                    >
                        <PiSignOutBold size={18} />
                        <p className='underline'>Logout</p>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;
