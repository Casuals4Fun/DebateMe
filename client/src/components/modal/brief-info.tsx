import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthStatus, AuthTab, useAuthStore, useTempStore } from "../../store/useAuthStore";
import { RegisterDataProps } from "../../types";
import useFileHandler from "../../hooks/useFileHandler";
import { toast } from "sonner";
import LoadingSVG from "../loading/svg";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { GrCloudUpload } from "react-icons/gr";

const BriefInfo: React.FC<RegisterDataProps> = ({ registerData, setRegisterData }) => {
    const navigate = useNavigate();

    const { setAuthTab, setUser, setIsAuthenticated } = useAuthStore();
    const { clearTempUser } = useTempStore();

    const [term, setTerm] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [validationState, setValidationState] = useState({
        isUsernameValid: true,
        isFirstNameValid: true,
        isLastNameValid: true
    });
    const [loading, setLoading] = useState<boolean>(false);

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
    }, [setRegisterData]);

    const handleAvatarChange = useFileHandler(5);
    const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const base64String = await handleAvatarChange(e);
        setRegisterData(prevState => ({
            ...prevState,
            avatar: base64String || ""
        }));
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
            setLoading(true);
            await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: registerData.email,
                    password: registerData.password,
                    avatar: registerData.avatar,
                    username: trimmedUsername,
                    first_name: trimmedFirstName,
                    last_name: trimmedLastName
                })
            })
                .then(res => res.json())
                .then(response => {
                    if (response.success) {
                        clearTempUser();
                        toast.success(response.message);

                        setUser(response.data.user);
                        localStorage.setItem('token', response.data.token);
                        setAuthTab(AuthTab.Closed);
                        setIsAuthenticated(AuthStatus.Authenticated);

                        navigate('/');
                    }
                    else {
                        setIsAuthenticated(AuthStatus.Failed);
                        if (response.message === 'Validation failed') {
                            return toast.error(`${response.errors[0].field.charAt(0).toUpperCase() + response.errors[0].field.slice(1)} ${response.errors[0].message}`)
                        }
                        toast.error(response.message)
                    }
                })
                .catch(() => {
                    setLoading(false);
                    setIsAuthenticated(AuthStatus.Failed);
                });
        }
    };

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
                        // onClick={() => document.getElementById('user-avatar')?.click()}
                        onClick={() => toast.warning('Feature coming soon.')}
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
                <button type='submit' disabled={loading}>
                    {loading ? <LoadingSVG size={23} /> : 'Create my Account'}
                </button>
            </form>
        </div>
    );
};

export default BriefInfo;