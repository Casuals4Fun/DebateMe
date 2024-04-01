import "./profile.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNavStore } from "../../store/useNavStore";
import { useAuthStore } from "../../store/useAuthStore";
import ToggleTheme from "../button/toggle-theme";
import useLogout from "../../hooks/useLogout";
import { IoMdPerson } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";

const Profile = () => {
    const navigate = useNavigate();
    const { expand, setExpand } = useNavStore();
    const { setIsAuthenticated, setUser } = useAuthStore();

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
            <div
                className='profile__image'
                onClick={() => setExpand(!expand)}
            >
                <img src="/user.jpg" alt="" />
            </div>

            {expand && (
                <div className='profile__modal'>
                    <div className='modal-profile__wrapper'>
                        <div className="profile-wrapper">
                            <div className='modal-profile__image'>
                                <img src="/user.jpg" alt="" />
                            </div>
                            <div className='modal-profile__info'>
                                <p>Julie Roberts</p>
                                <p>julieroberts</p>
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
