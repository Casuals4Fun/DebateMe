import "./profile.css";
import { Link } from "react-router-dom";
import ToggleTheme from "../button/toggle-theme";
import { IoMdPerson } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";

interface ProfileProps {
    expand: boolean
    setExpand: React.Dispatch<React.SetStateAction<boolean>>
}

const Profile: React.FC<ProfileProps> = ({ expand, setExpand }) => {
    return (
        <div className='profile__wrapper'>
            <div
                className='profile__image'
                onClick={() => setExpand(!expand)}
            >
                <img src="/user.jpg" alt="" />
            </div>
            <div className='profile__info'>
                <p>Julie Roberts</p>
                <p>julieroberts</p>
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
                    <Link to='/' className='modal-profile-btn'>
                        <IoMdPerson size={18} />
                        <p className='underline'>Profile</p>
                    </Link>
                    <Link to='/' className='modal-profile-btn'>
                        <PiSignOutBold size={18} />
                        <p className='underline'>Logout</p>
                    </Link>
                    {/* <ToggleTheme /> */}
                </div>
            )}
        </div>
    )
}

export default Profile