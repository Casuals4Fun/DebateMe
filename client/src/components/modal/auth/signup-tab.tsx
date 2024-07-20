import React, { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { RegisterDataProps } from "../../../types"
import { toast } from "sonner"
import { AuthTab, useAuthStore, useTempStore } from "../../../store/useAuthStore"
import { LoadingSVG } from "../../loading/svg"
import { specialCharRegex, usernameRegex, emailRegex } from "../../../data/regex"
import { MdModeEdit } from "react-icons/md"
import { GrCloudUpload } from "react-icons/gr"
import { IoPersonCircleOutline } from "react-icons/io5"

const SignupTab: React.FC<RegisterDataProps> = ({ registerData, setRegisterData }) => {
    const navigate = useNavigate();

    const { setAuthTab } = useAuthStore();
    const { clearTempUser } = useTempStore();

    const [term, setTerm] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [validationState, setValidationState] = useState({
        isUsernameValid: true,
        isFirstNameValid: true,
        isLastNameValid: true,
        isEmailValid: true,
    });

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let isValid = true;
        if (name === 'username') {
            isValid = value.length > 0 && usernameRegex.test(value);
        } else if (name === 'first_name' || name === 'last_name') {
            isValid = value.length > 0 && !specialCharRegex.test(value);
        }

        if (!isValid && value.length > 0) {
            return toast.warning('Special characters not allowed.');
        }

        setRegisterData(prevState => ({
            ...prevState,
            [name]: value
        }));

        setValidationState(prevState => ({
            ...prevState,
            [`is${name.charAt(0).toUpperCase() + name.slice(1)}Valid`]: !!value
        }));
    }, [setRegisterData]);

    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ') e.preventDefault();
    }, []);

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            if (file) {
                setRegisterData(prevState => ({
                    ...prevState,
                    avatar: file
                }));
            }
        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);

        const trimmedUsername = registerData.username.trim();
        const trimmedFirstName = registerData.first_name.trim();
        const trimmedLastName = registerData.last_name.trim();
        const trimmedEmail = registerData.email.trim();

        setRegisterData(prev => ({
            ...prev,
            username: trimmedUsername,
            first_name: trimmedFirstName,
            last_name: trimmedLastName,
            email: trimmedEmail
        }));

        setValidationState({
            isUsernameValid: !!trimmedUsername,
            isFirstNameValid: !!trimmedFirstName,
            isLastNameValid: !!trimmedLastName,
            isEmailValid: !!trimmedEmail
        });

        if (trimmedUsername && trimmedFirstName && trimmedLastName && trimmedEmail && term) {
            if (!emailRegex.test(trimmedEmail)) {
                setTimeout(() => setIsSubmitted(false), 500);
                return toast.warning('Invalid email address');
            }

            const formData = new FormData();
            formData.append('avatar', registerData.avatar);
            formData.append('username', trimmedUsername);
            formData.append('first_name', trimmedFirstName);
            formData.append('last_name', trimmedLastName);
            formData.append('email', trimmedEmail);

            await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(response => {
                    if (response.success) {
                        clearTempUser();
                        setAuthTab(AuthTab.Login);
                        localStorage.removeItem('username');
                        toast.success(response.message);
                        navigate('/');
                    }
                    else {
                        if (response.message === 'Validation failed') {
                            return toast.error(`${response.errors[0].field.charAt(0).toUpperCase() + response.errors[0].field.slice(1)} ${response.errors[0].message}`)
                        }
                        toast.error(response.message)
                    }
                })
                .finally(() => setIsSubmitted(false));
        } else {
            setTimeout(() => setIsSubmitted(false), 500);
            return;
        }
    };

    return (
        <div id='signup'>
            <h3>Register</h3>
            <form id='signup-form' className='form__container' onSubmit={handleFormSubmit}>
                <div className='flex'>
                    <div
                        className='avatar__container'
                        onClick={() => document.getElementById('user-avatar')?.click()}
                    >
                        <input
                            type='file'
                            id='user-avatar'
                            accept='image/*'
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                        />
                        {registerData.avatar ? (
                            typeof registerData.avatar === 'string' ? (
                                <img
                                    src={registerData.avatar}
                                    alt='avatar'
                                    style={{ width: '50px', height: '50px', objectFit: 'cover', border: '2px solid var(--body_color)', borderRadius: '50%' }}
                                />
                            ) : (
                                <img
                                    src={URL.createObjectURL(registerData.avatar)}
                                    alt='avatar'
                                    style={{ width: '50px', height: '50px', objectFit: 'cover', border: '2px solid var(--body_color)', borderRadius: '50%' }}
                                />
                            )
                        ) : <IoPersonCircleOutline size={50} />}
                        <div className='upload-btn'>
                            {registerData.avatar ? <MdModeEdit size={15} /> : <GrCloudUpload size={15} />}
                        </div>
                    </div>
                    <div className='input__container'>
                        <p>Username</p>
                        <input
                            type='text'
                            name='username'
                            value={registerData.username}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            className={`${isSubmitted && !validationState.isUsernameValid ? 'shake' : ''}`}
                            style={{ borderColor: isSubmitted && !validationState.isUsernameValid ? 'red' : '' }}
                            placeholder={isSubmitted && !validationState.isUsernameValid ? 'Required' : ''}
                        />
                    </div>
                </div>
                <div className='input__container'>
                    <p>First Name</p>
                    <input
                        type='text'
                        name='first_name'
                        value={registerData.first_name}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className={`${isSubmitted && !validationState.isFirstNameValid ? 'shake' : ''}`}
                        style={{ borderColor: isSubmitted && !validationState.isFirstNameValid ? 'red' : '' }}
                        placeholder={isSubmitted && !validationState.isFirstNameValid ? 'Required' : ''}
                    />
                </div>
                <div className='input__container'>
                    <p>Last Name</p>
                    <input
                        type='text'
                        name='last_name'
                        value={registerData.last_name}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className={`${isSubmitted && !validationState.isLastNameValid ? 'shake' : ''}`}
                        style={{ borderColor: isSubmitted && !validationState.isLastNameValid ? 'red' : '' }}
                        placeholder={isSubmitted && !validationState.isLastNameValid ? 'Required' : ''}
                    />
                </div>
                <div className='input__container'>
                    <p>Email</p>
                    <input
                        type='email'
                        name='email'
                        value={registerData.email}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className={`${isSubmitted && !validationState.isEmailValid ? 'shake' : ''}`}
                        style={{ borderColor: isSubmitted && !validationState.isEmailValid ? 'red' : '' }}
                        placeholder={isSubmitted && !validationState.isEmailValid ? 'Required' : ''}
                    />
                </div>
                <div className='terms__container'>
                    <div className='checkbox__conatiner' onClick={() => setTerm(!term)}>
                        <input type='checkbox'
                            checked={term}
                            readOnly
                        />
                        <span
                            className={`checkmark ${isSubmitted && !term ? 'shake' : ''}`}
                            style={{ borderColor: isSubmitted && !term ? 'red' : '' }}
                        />
                    </div>
                    <p>Accept <span>Terms & Conditions</span></p>
                </div>
                <button
                    type='submit'
                    disabled={isSubmitted}
                    style={{ cursor: `${isSubmitted ? 'not-allowed' : ''}` }}
                >
                    {isSubmitted ? <LoadingSVG size={23} /> : 'Create my Account'}
                </button>
                <div className='extra-btn'>
                    <p>Already have an account? <span onClick={() => navigate('/auth?type=login')}>Log In</span></p>
                </div>
            </form>
        </div>
    );
};

export default SignupTab;