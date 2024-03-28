import React, { useState, useCallback } from "react";
import { AuthTab, useAuthStore } from "../../store/useAuthStore";
import useFileHandler from "../../utils/useFileHandler";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { GrCloudUpload } from "react-icons/gr";
import { RegisterDataProps } from "../../types";

const BriefInfo: React.FC<RegisterDataProps> = ({ registerData, setRegisterData }) => {
    const { setAuthTab } = useAuthStore();

    const [term, setTerm] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [validationState, setValidationState] = useState({
        isUsernameValid: true,
        isFirstNameValid: true,
        isLastNameValid: true
    });

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData(prevState => ({
            ...prevState,
            [name]: value
        }));

        setValidationState(prevState => ({
            ...prevState,
            [`is${name.charAt(0).toUpperCase() + name.slice(1)}Valid`]: !!value
        }));
    }, []);

    const handleAvatarChange = useFileHandler(5);

    const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const base64String = await handleAvatarChange(e);
        setRegisterData(prevState => ({
            ...prevState,
            avatar: base64String || ""
        }));
    };

    const handleFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);

        const trimmedUsername = registerData.username.trim();
        const trimmedFirstName = registerData.first_name.trim();
        const trimmedLastName = registerData.last_name.trim();

        setRegisterData(prev => ({
            ...prev,
            username: trimmedUsername,
            first_name: trimmedFirstName,
            last_name: trimmedLastName
        }));

        setValidationState({
            isUsernameValid: !!trimmedUsername,
            isFirstNameValid: !!trimmedFirstName,
            isLastNameValid: !!trimmedLastName
        });

        if (!term) return;

        if (trimmedUsername && trimmedFirstName && trimmedLastName) {
            // console.log(registerData.email, registerData.password, registerData.avatar, trimmedUsername, trimmedFirstName, trimmedLastName)
        }
    }, [registerData, term, setAuthTab]);

    return (
        <div id='brief'>
            <div className='auth__header'>
                <h3>Brief Info</h3>
                <p>Change Email or Password? <span onClick={() => setAuthTab(AuthTab.Signup)}>Go Back</span></p>
            </div>
            <form className='form__container' onSubmit={handleFormSubmit}>
                <div className='avatar-username__container'>
                    <div
                        className='avatar__container'
                        onClick={() => document.getElementById('user-avatar')?.click()}
                    >
                        <input
                            type="file"
                            id="user-avatar"
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                        />
                        {registerData.avatar ? (
                            <img
                                src={registerData.avatar}
                                alt="Avatar"
                                style={{ width: '50px', height: '50px', objectFit: 'cover', border: '2px solid var(--body_color)', borderRadius: '50%' }}
                            />
                        ) : <IoPersonCircleOutline size={50} />}
                        <div className='upload-btn'>
                            {registerData.avatar ? <MdModeEdit size={15} /> : <GrCloudUpload size={15} />}
                        </div>
                    </div>
                    <div className='input__container'>
                        <p>Username</p>
                        <input
                            type="text"
                            name="username"
                            value={registerData.username}
                            onChange={handleInputChange}
                            className={`${isSubmitted && !validationState.isUsernameValid ? "shake" : ""}`}
                            style={{ borderColor: isSubmitted && !validationState.isUsernameValid ? "red" : "" }}
                            placeholder={isSubmitted && !validationState.isUsernameValid ? 'Required' : ''}
                        />
                    </div>
                </div>
                <div className='input__container'>
                    <p>First Name</p>
                    <input
                        type="text"
                        name="first_name"
                        value={registerData.first_name}
                        onChange={handleInputChange}
                        className={`${isSubmitted && !validationState.isFirstNameValid ? "shake" : ""}`}
                        style={{ borderColor: isSubmitted && !validationState.isFirstNameValid ? "red" : "" }}
                        placeholder={isSubmitted && !validationState.isFirstNameValid ? 'Required' : ''}
                    />
                </div>
                <div className='input__container'>
                    <p>Last Name</p>
                    <input
                        type="text"
                        name="last_name"
                        value={registerData.last_name}
                        onChange={handleInputChange}
                        className={`${isSubmitted && !validationState.isLastNameValid ? "shake" : ""}`}
                        style={{ borderColor: isSubmitted && !validationState.isLastNameValid ? "red" : "" }}
                        placeholder={isSubmitted && !validationState.isLastNameValid ? 'Required' : ''}
                    />
                </div>
                <div className='terms__container'>
                    <div className='checkbox__conatiner' onClick={() => setTerm(!term)}>
                        <input type='checkbox'
                            checked={term}
                            readOnly
                        />
                        <span
                            className={`checkmark ${isSubmitted && !term ? "shake" : ""}`}
                            style={{ borderColor: isSubmitted && !term ? "red" : "" }}
                        />
                    </div>
                    <p>Accept <span>Terms & Conditions</span></p>
                </div>
                <button type='submit'>
                    Create my Account
                </button>
            </form>
        </div>
    );
};

export default React.memo(BriefInfo);