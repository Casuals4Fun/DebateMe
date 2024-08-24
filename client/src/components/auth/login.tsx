import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { FcGoogle } from 'react-icons/fc'
import { AuthStatus, AuthTab, useAuthStore } from '../../store/auth'
import { LoadingSVG } from '../loading/svg'

const Login = () => {
    const navigate = useNavigate()

    const { setAuthTab, isAuthenticated, setIsAuthenticated, setUser } = useAuthStore()

    const [loginData, setLoginData] = useState({
        id: '',
        password: ''
    })

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [validationState, setValidationState] = useState({
        isIdValid: true,
        isPasswordValid: true
    })

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }))

        setValidationState(prevState => ({
            ...prevState,
            [`is${name.charAt(0).toUpperCase() + name.slice(1)}Valid`]: !!value
        }))
    }, [])

    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ') e.preventDefault()
    }, [])

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitted(true)

        const trimmedId = loginData.id.trim()
        const trimmedPassword = loginData.password.trim()

        setLoginData(prevState => ({
            ...prevState,
            id: trimmedId,
            password: trimmedPassword
        }))

        setValidationState({
            isIdValid: !!trimmedId,
            isPasswordValid: !!trimmedPassword
        })

        if (trimmedId && trimmedPassword) {
            setIsAuthenticated(AuthStatus.Authenticating)
            await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: trimmedId, password: trimmedPassword })
            })
                .then(res => res.json())
                .then(response => {
                    if (response.success) {
                        localStorage.setItem('token', response.data.token)
                        setUser(response.data.user)
                        setIsAuthenticated(AuthStatus.Authenticated)
                        setAuthTab(AuthTab.Closed)
                        navigate(localStorage.getItem('route') || '/')
                    }
                    else {
                        setIsAuthenticated(AuthStatus.Failed)
                        if (response.message === 'Validation failed') {
                            return toast.error(`${response.errors[0].field.charAt(0).toUpperCase() + response.errors[0].field.slice(1)} ${response.errors[0].message}`)
                        }
                        toast.error(response.message)
                    }
                })
                .catch(() => setIsAuthenticated(AuthStatus.Failed))
                .finally(() => setIsSubmitted(false))
        }
        else setTimeout(() => setIsSubmitted(false), 500)
    }

    return (
        <div id='login'>
            <h3>Login</h3>
            <button
                className='google-btn'
                onClick={() => {
                    setIsAuthenticated(AuthStatus.Authenticating)
                    window.location.href = `${import.meta.env.VITE_SERVER_URL}/api/auth/google`
                }}
            >
                {isAuthenticated === AuthStatus.Authenticating && !isSubmitted ? <LoadingSVG size={23} /> : (
                    <>
                        <FcGoogle size={25} />
                        <span>Continue with Google</span>
                    </>
                )}
            </button>
            <div className='or-divider'>
                <div className='divider' />
                <p>or</p>
                <div className='divider' />
            </div>
            <form id='login-form' className='form__container' onSubmit={handleLoginSubmit}>
                <div className='input__container'>
                    <p>Email or Username</p>
                    <input
                        name='id'
                        value={loginData.id}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className={`${isSubmitted && !validationState.isIdValid ? 'shake' : ''}`}
                        style={{ borderColor: isSubmitted && !validationState.isIdValid ? 'red' : '' }}
                    />
                </div>
                <div className='input__container'>
                    <p>Password</p>
                    <input
                        type='password'
                        name='password'
                        value={loginData.password}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className={`${isSubmitted && !validationState.isPasswordValid ? 'shake' : ''}`}
                        style={{ borderColor: isSubmitted && !validationState.isPasswordValid ? 'red' : '' }}
                    />
                </div>
                <button
                    type='submit'
                    disabled={isAuthenticated === AuthStatus.Authenticating}
                    style={{ cursor: `${isAuthenticated === AuthStatus.Authenticating ? 'not-allowed' : ''}` }}
                >
                    {isAuthenticated === AuthStatus.Authenticating && isSubmitted ? <LoadingSVG size={23} /> : 'Login'}
                </button>
                <div className='extra-btn'>
                    <p>New here? <span onClick={() => navigate('/auth?type=signup')}>Create Account</span></p>
                    <p><span onClick={() => navigate('/auth?type=forgot')}>Forgot Password</span></p>
                </div>
            </form>
        </div>
    )
}

export default Login