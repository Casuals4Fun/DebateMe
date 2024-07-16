import { useState, useCallback } from "react";
import { useAuthStore, AuthTab } from "../../../store/useAuthStore";

const ForgotPassword = () => {
    const { setAuthTab } = useAuthStore();

    const [forgotData, setForgotData] = useState({
        email: "",
        username: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [validationState, setValidationState] = useState({
        isEmailValid: true,
        isUsernameValid: true
    });

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForgotData(prevState => ({
            ...prevState,
            [name]: value
        }));

        setValidationState(prevState => ({
            ...prevState,
            [`is${name.charAt(0).toUpperCase() + name.slice(1)}Valid`]: !!value
        }));
    }, []);

    const handleForgotSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);

        const trimmedEmail = forgotData.email.trim();
        const trimmedUsername = forgotData.username.trim();

        setForgotData(prevState => ({
            ...prevState,
            email: trimmedEmail,
            username: trimmedUsername
        }));

        setValidationState({
            isEmailValid: !!trimmedEmail,
            isUsernameValid: !!trimmedUsername
        });

        if (trimmedEmail || trimmedUsername) {
            // Perform further actions for forgot password
        }
    };

    return (
        <div id='forgot'>
            <h3>Account Recover</h3>
            <form id='forgot-form' className='form__container' onSubmit={handleForgotSubmit}>
                <div className='input__container'>
                    <p>Email</p>
                    <input
                        name="email"
                        value={forgotData.email}
                        onChange={handleInputChange}
                        className={`${isSubmitted && !validationState.isEmailValid ? "shake" : ""}`}
                        style={{ borderColor: isSubmitted && !validationState.isEmailValid ? "red" : "" }}
                        placeholder='Enter your email'
                    />
                </div>
                <div className='or-divider'>
                    <div className='divider' />
                    <p>or</p>
                    <div className='divider' />
                </div>
                <div className='input__container'>
                    <p>Username</p>
                    <input
                        name="username"
                        value={forgotData.username}
                        onChange={handleInputChange}
                        className={`${isSubmitted && !validationState.isUsernameValid ? "shake" : ""}`}
                        style={{ borderColor: isSubmitted && !validationState.isUsernameValid ? "red" : "" }}
                        placeholder='Enter your username'
                    />
                </div>
                <button type='submit'>
                    Check
                </button>
                <div className='extra-btn'>
                    <p><span onClick={() => setAuthTab(AuthTab.Login)}>Go Back</span></p>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;