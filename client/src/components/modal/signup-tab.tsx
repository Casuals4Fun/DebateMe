import { AuthTab, useAuthStore } from "../../store/useAuthStore";
import { FcGoogle } from "react-icons/fc";

const SignupTab = () => {
    const { setAuthTab } = useAuthStore();

    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div id='signup'>
            <div className='auth__header'>
                <h3>Register</h3>
                <p>Already have an account? <span onClick={() => setAuthTab(AuthTab.Login)}>Log In</span></p>
            </div>
            <form className='form__container' onSubmit={handleLoginSubmit}>
                <div className='input__container'>
                    <p>Email</p>
                    <input />
                </div>
                <div className='input__container'>
                    <p>Password</p>
                    <input />
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
    )
}

export default SignupTab