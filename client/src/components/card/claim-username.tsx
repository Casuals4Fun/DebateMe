import "./claim-username.css"
import { useCallback, useState } from "react"
import { AuthTab, useAuthStore } from "../../store/useAuthStore"
import { PiArrowUpRightBold } from "react-icons/pi"
import { LoadingSVG } from "../loading/svg"

const ClaimUsername = () => {
    const { setAuthTab } = useAuthStore();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem("username") || '');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ') e.preventDefault();
    }, []);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputUsername = e.target.value;
        setUsername(inputUsername);

        const usernameRegex = /^[a-zA-Z0-9_-]+$/;
        if (inputUsername) {
            if (!usernameRegex.test(inputUsername)) {
                setErrorMessage('Username can only contain alphanumeric characters, underscores (_) and hyphens (-). No spaces or other special characters are allowed.');
            } else setErrorMessage('');
        }
    }

    const handleUsernameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 500);

        if (username && !errorMessage) {
            setLoading(true);

            localStorage.setItem("username", username);
            setTimeout(() => setAuthTab(AuthTab.Signup), 2000);
        }
    }

    return (
        <form id='claim-username' onSubmit={handleUsernameSubmit}>
            <p>Get Started</p>
            <div className='username-input'>
                <span className='domain'>debatehive.com/</span>
                <input
                    placeholder='johndoe'
                    value={username}
                    onChange={handleUsernameChange}
                    onKeyPress={handleKeyPress}
                    className={isSubmitted && (!username || errorMessage) ? "shake" : ""}
                    style={{ border: isSubmitted && (!username || errorMessage) ? "2px dotted white" : "" }}
                />
            </div>
            <button className='submit-btn' disabled={loading}>
                <span>CLAIM USERNAME</span>
                {!loading ? (
                    <PiArrowUpRightBold size={20} color='#FFFFFF' />
                ) : (
                    <LoadingSVG size={20} color='#FFFFFF' />
                )}
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
    )
}

export default ClaimUsername