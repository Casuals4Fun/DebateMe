import React, { useState, useCallback } from "react"
import { RegisterDataProps } from "../../../types"
import { toast } from "sonner"
import { AuthStatus, AuthTab, useAuthStore, useTempStore } from "../../../store/useAuthStore"
import { FcGoogle } from "react-icons/fc"
import { LoadingSVG } from "../../loading/svg"

const SignupTab: React.FC<RegisterDataProps> = ({ registerData, setRegisterData }) => {
    const { setAuthTab, isAuthenticated } = useAuthStore();
    const { tempUser } = useTempStore();

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
    }, [setRegisterData]);

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
    }, [registerData, setRegisterData, setAuthTab]);

    return (
        <div id='signup'>
            <h3>Register</h3>
            {!tempUser.email && (
                <>
                    <button
                        disabled={isAuthenticated === AuthStatus.Authenticating}
                        className='google-btn'
                        onClick={() => window.location.href = `${import.meta.env.VITE_SERVER_URL}/api/auth/google`}
                    >
                        {isAuthenticated === AuthStatus.Authenticating ? <LoadingSVG size={23} /> : (
                            <>
                                <FcGoogle size={25} />
                                <span>Signup with Google</span>
                            </>
                        )}
                    </button>
                    <div className='or-divider'>
                        <div className='divider' />
                        <p>or</p>
                        <div className='divider' />
                    </div>
                </>
            )}
            <form id='signup-form' className='form__container' style={{ marginTop: tempUser.email ? '20px' : '' }} onSubmit={handleNextTab}>
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
                <button type='submit' disabled={isAuthenticated === AuthStatus.Authenticating}>
                    {isAuthenticated === AuthStatus.Authenticating ? <LoadingSVG size={23} /> : 'Continue'}
                </button>
                <div className='extra-btn'>
                    <p>Already have an account? <span onClick={() => setAuthTab(AuthTab.Login)}>Log In</span></p>
                </div>
            </form>
        </div>
    );
};

export default SignupTab;