import { useState, useCallback } from "react"
import { useAuthStore, AuthTab } from "../../../store/useAuthStore"
import { toast } from "sonner"
import { LoadingSVG } from "../../loading/svg";
import { emailRegex } from "../../../data/regex"

const ForgotPassword = () => {
    const { setAuthTab } = useAuthStore();

    const [forgotData, setForgotData] = useState({
        email: "",
        username: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [validationState, setValidationState] = useState(true);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForgotData(() => ({
            email: name === "email" ? value : "",
            username: name === "username" ? value : ""
        }));

        setValidationState(!!value);
    }, []);

    const handleForgotSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);

        const trimmedEmail = forgotData.email.trim();
        const trimmedUsername = forgotData.username.trim();

        setForgotData(prevState => ({
            ...prevState,
            email: trimmedEmail,
            username: trimmedUsername
        }));

        setValidationState(!!trimmedEmail || !!trimmedUsername);

        if (trimmedEmail && !emailRegex.test(trimmedEmail)) {
            setIsSubmitted(false);
            return toast.warning('Invalid email address');
        }

        if (trimmedEmail || trimmedUsername) {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/recover-account`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(trimmedEmail ? { email: trimmedEmail } : { username: trimmedUsername })
                });

                const response = await res.json();
                if (response.success) {
                    toast.success(response.message);
                } else {
                    if (response.message === 'Validation failed') {
                        toast.error(`${response.errors[0].message.charAt(0).toUpperCase() + response.errors[0].message.slice(1)}`);
                    } else {
                        toast.error(response.message);
                    }
                }
            } catch (error) {
                toast.error('Something went wrong');
            } finally {
                setIsSubmitted(false);
            }
        } else {
            setTimeout(() => setIsSubmitted(false), 500);
        }
    };

    return (
        <div id='forgot'>
            <h3>Recover Account</h3>
            <form id='forgot-form' className='form__container' onSubmit={handleForgotSubmit}>
                <div className='input__container'>
                    <p>Email</p>
                    <input
                        name="email"
                        value={forgotData.email}
                        onChange={handleInputChange}
                        className={`${isSubmitted && !validationState ? "shake" : ""}`}
                        style={{ borderColor: isSubmitted && !validationState ? "red" : "" }}
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
                        className={`${isSubmitted && !validationState ? "shake" : ""}`}
                        style={{ borderColor: isSubmitted && !validationState ? "red" : "" }}
                    />
                </div>
                <button
                    type='submit'
                    disabled={isSubmitted}
                    style={{ cursor: `${isSubmitted ? 'not-allowed' : ''}` }}
                >
                    {isSubmitted ? <LoadingSVG size={23} /> : 'Check'}
                </button>
                <div className='extra-btn'>
                    <p><span onClick={() => setAuthTab(AuthTab.Login)}>Go Back</span></p>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;