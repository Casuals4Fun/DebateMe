import "./claim-username.css"
import { useCallback, useState } from "react"
import { PiArrowUpRightBold } from "react-icons/pi"
// import { LoadingSVG } from "../loading/svg"

const ClaimUsername = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [username, setUsername] = useState('');

    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ') e.preventDefault();
    }, []);

    const handleUsernameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 500);

        if (username.trim()) {
            
        }
    }

    return (
        <form id='claim-username' onSubmit={handleUsernameSubmit}>
            <p>Get Started</p>
            <div className={`username-input ${isSubmitted && !username.trim() ? "shake" : ""}`}>
                <span className='domain'>debatehive.com/</span>
                <input
                    placeholder='johndoe'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{ border: isSubmitted && !username.trim() ? "2px dotted white" : "" }}
                />
            </div>
            <button className='submit-btn'>
                <span>CLAIM USERNAME</span>
                <PiArrowUpRightBold size={20} color='#FFFFFF' />
                {/* <LoadingSVG size={20} color='#FFFFFF' /> */}
            </button>
        </form>
    )
}

export default ClaimUsername