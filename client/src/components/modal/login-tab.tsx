import { AuthTab, useAuthStore } from "../../store/useAuthStore";
import { FcGoogle } from "react-icons/fc";

const LoginTab = () => {
    const { setAuthTab } = useAuthStore();

    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div id='login'>
            <div className='auth__header'>
                <h3>Login</h3>
                <p>New here? <span onClick={() => setAuthTab(AuthTab.Signup)}>Create Account</span></p>
            </div>
            <form className='form__container' onSubmit={handleLoginSubmit}>
                <div className='input__container'>
                    <p>Email or Username</p>
                    <input />
                </div>
                <div className='input__container'>
                    <p>Password</p>
                    <input />
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
    )
}

export default LoginTab