import { useState } from "react"
import { useAuthStore, AuthTab } from "../../../store/useAuthStore"
// import { LoadingSVG } from "../../loading/svg"

const ForgotPassword = () => {
    const { setAuthTab } = useAuthStore();

    const [id, setID] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [validationState, setValidationState] = useState({
        isIdValid: true,
        isOtpValid: true,
        isPasswordValid: true
    });

    const handleForgotSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);

        const trimmedId = id.trim();
        setID(trimmedId);
        setValidationState(prevState => ({
            ...prevState,
            isIdValid: !!trimmedId
        }));
    }

    return (
        <div id='forgot'>
            <h3>Account Recover</h3>
            <form id='forgot-form' className='form__container' onSubmit={handleForgotSubmit}>
                <div className='input__container'>
                    <p>Email or Username</p>
                    <input
                        name="id"
                        value={id}
                        onChange={e => setID(e.target.value)}
                        className={`${isSubmitted && !validationState.isIdValid ? "shake" : ""}`}
                        style={{ borderColor: isSubmitted && !validationState.isIdValid ? "red" : "" }}
                        placeholder='Enter your email or username'
                    />
                </div>
                <button type='submit'>
                    {/* <LoadingSVG size={23} /> */}
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