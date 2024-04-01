import React, { useState, useCallback } from "react";
import { RegisterDataProps } from "../../types";
import { AuthTab, useAuthStore } from "../../store/useAuthStore";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

const SignupTab: React.FC<RegisterDataProps> = ({ registerData, setRegisterData }) => {
    const { setAuthTab } = useAuthStore();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [validationState, setValidationState] = useState({
        isEmailValid: true,
        isPasswordValid: true
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

    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ') e.preventDefault();
    }, []);

    const handleNextTab = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);

        const trimmedEmail = registerData.email.trim();
        const trimmedPassword = registerData.password.trim();

        setRegisterData(prevState => ({
            ...prevState,
            email: trimmedEmail,
            password: trimmedPassword
        }));

        setValidationState({
            isEmailValid: !!trimmedEmail,
            isPasswordValid: !!trimmedPassword
        });

        if (trimmedEmail && trimmedPassword) {
            if (trimmedPassword.length < 6) {
                return toast.warning('Password should be atleast 6 digits')
            }
            setAuthTab(AuthTab.Info);
        }
    }, [registerData, setAuthTab]);

    return (
        <div id='signup'>
            <div className='auth__header'>
                <h3>Register</h3>
                <p>Already have an account? <span onClick={() => setAuthTab(AuthTab.Login)}>Log In</span></p>
            </div>
            <form className='form__container' onSubmit={handleNextTab}>
                <div className='input__container'>
                    <p>Email</p>
                    <input
                        type="email"
                        name="email"
                        value={registerData.email}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className={`${isSubmitted && !validationState.isEmailValid ? "shake" : ""}`}
                        style={{ borderColor: isSubmitted && !validationState.isEmailValid ? "red" : "" }}
                        placeholder={isSubmitted && !validationState.isEmailValid ? 'Required' : ''}
                    />
                </div>
                <div className='input__container'>
                    <p>Password</p>
                    <input
                        type="password"
                        name="password"
                        value={registerData.password}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className={`${isSubmitted && !validationState.isPasswordValid ? "shake" : ""}`}
                        style={{ borderColor: isSubmitted && !validationState.isPasswordValid ? "red" : "" }}
                        placeholder={isSubmitted && !validationState.isPasswordValid ? 'Required' : ''}
                    />
                </div>
                <button type='submit'>
                    Continue
                </button>
            </form>
            <div className='or-divider'>
                <div className='divider' />
                <p>or</p>
                <div className='divider' />
            </div>
            <button className='google-btn'>
                <FcGoogle size={23} />
                <span>Continue with Google</span>
            </button>
        </div>
    );
};

export default React.memo(SignupTab);