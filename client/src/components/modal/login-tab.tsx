import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthStatus, AuthTab, useAuthStore } from "../../store/useAuthStore";
import { FcGoogle } from "react-icons/fc";

const LoginTab = () => {
    const navigate = useNavigate();

    const { route, setAuthTab, setIsAuthenticated, setUser } = useAuthStore();

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

    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ') e.preventDefault();
    }, []);

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
            await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: trimmedId, password: trimmedPassword })
            })
                .then(res => res.json())
                .then(response => {
                    if (response.success) {
                        setUser(response.data.user);
                        setIsAuthenticated(AuthStatus.Authenticating);
                        localStorage.setItem('token', response.data.token);
                        setAuthTab(AuthTab.Closed);
                        if (route) navigate(route);
                        else navigate('/');
                        // TODO: Success toast - `${response.message}`
                    }
                    else {
                        setIsAuthenticated(AuthStatus.Failed);
                        if (response.message === 'Validation failed') {
                            // TODO: Error toast - `${response.errors[0].field.charAt(0).toUpperCase() + response.errors[0].field.slice(1)} ${response.errors[0].message}`
                        }
                        // TODO: Error toast - `${response.message}`
                    }
                })
                .catch(err => {
                    setIsAuthenticated(AuthStatus.Failed);
                    console.log(`Catch Error\n ${err}`)
                })
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
                        onKeyPress={handleKeyPress}
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
                        onKeyPress={handleKeyPress}
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
