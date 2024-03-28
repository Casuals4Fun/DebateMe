import React, { useState, useCallback } from "react";
import { AuthTab, useAuthStore } from "../../store/useAuthStore";
// import { useToastStore } from "../../store/useToastStore";
import { FcGoogle } from "react-icons/fc";

const LoginTab = () => {
    const { setAuthTab } = useAuthStore();
    // const { addToast } = useToastStore();

    const [loginData, setLoginData] = useState({
        id: "",
        password: ""
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [validationState, setValidationState] = useState({
        isIdValid: true,
        isPasswordValid: true
    });

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));

        setValidationState(prevState => ({
            ...prevState,
            [`is${name.charAt(0).toUpperCase() + name.slice(1)}Valid`]: !!value
        }));
    }, []);

    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);

        const trimmedId = loginData.id.trim();
        const trimmedPassword = loginData.password.trim();

        setLoginData(prevState => ({
            ...prevState,
            id: trimmedId,
            password: trimmedPassword
        }));

        setValidationState({
            isIdValid: !!trimmedId,
            isPasswordValid: !!trimmedPassword
        });

        if (trimmedId && trimmedPassword) {
            // console.log(trimmedId, trimmedPassword);
        }
    };

    return (
        <div id='login'>
            <div className='auth__header'>
                <h3>Login</h3>
                <p>New here? <span onClick={() => setAuthTab(AuthTab.Signup)}>Create Account</span></p>
            </div>
            <form className='form__container' onSubmit={handleLoginSubmit}>
                <div className='input__container'>
                    <p>Email or Username</p>
                    <input
                        name="id"
                        value={loginData.id}
                        onChange={handleInputChange}
                        className={`${isSubmitted && !validationState.isIdValid ? "shake" : ""}`}
                        style={{ borderColor: isSubmitted && !validationState.isIdValid ? "red" : "" }}
                        placeholder={isSubmitted && !validationState.isIdValid ? 'Required' : ''}
                    />
                </div>
                <div className='input__container'>
                    <p>Password</p>
                    <input
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleInputChange}
                        className={`${isSubmitted && !validationState.isPasswordValid ? "shake" : ""}`}
                        style={{ borderColor: isSubmitted && !validationState.isPasswordValid ? "red" : "" }}
                        placeholder={isSubmitted && !validationState.isPasswordValid ? 'Required' : ''}
                    />
                </div>
                <button type='submit'>
                    Log in
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

export default LoginTab;