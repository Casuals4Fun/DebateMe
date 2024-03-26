import { useState } from "react";
import { AuthTab, useAuthStore } from "../../store/useAuthStore";
import useFileHandler from "../../utils/useFileHandler";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { GrCloudUpload } from "react-icons/gr";

const BriefInfo = () => {
    const { setAuthTab } = useAuthStore();

    const [avatar, setAvatar] = useState<string | null>(null);
    const [term, setTerm] = useState<boolean>(false);

    return (
        <div id='brief'>
            <div className='auth__header'>
                <h3>Brief Info</h3>
                <p>Change Email or Password? <span onClick={() => setAuthTab(AuthTab.Signup)}>Go Back</span></p>
            </div>
            <form className='form__container'>
                <div className='avatar-username__container'>
                    <div
                        className='avatar__container'
                        onClick={() => document.getElementById('user-avatar')?.click()}
                    >
                        <input
                            type="file"
                            id="user-avatar"
                            style={{ display: 'none' }}
                            onChange={useFileHandler(setAvatar, 5)}
                        />
                        {avatar ? (
                            <img
                                src={avatar}
                                alt="Avatar"
                                style={{ width: '50px', height: '50px', objectFit: 'cover', border: '2px solid var(--body_color)', borderRadius: '50%' }}
                            />
                        ) : <IoPersonCircleOutline size={50} />}
                        <div className='upload-btn'>
                            {avatar ? <MdModeEdit size={15} /> : <GrCloudUpload size={15} />}
                        </div>
                    </div>
                    <div className='input__container'>
                        <p>Username</p>
                        <input />
                    </div>
                </div>
                <div className='input__container'>
                    <p>First Name</p>
                    <input />
                </div>
                <div className='input__container'>
                    <p>Last Name</p>
                    <input />
                </div>
                <div className='terms__container'>
                    <div className='checkbox__conatiner' onClick={() => setTerm(!term)}>
                        <input type='checkbox'
                            checked={term}
                            readOnly
                        />
                        <span className='checkmark' />
                    </div>
                    <p>Accept <span>Terms & Conditions</span></p>
                </div>
                <button type='submit'>
                    Create my Account
                </button>
            </form>
        </div>
    )
}

export default BriefInfo;