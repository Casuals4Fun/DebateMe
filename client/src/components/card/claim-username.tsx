import "./claim-username.css"
import { PiArrowUpRightBold } from "react-icons/pi";

const ClaimUsername = () => {
    const handleUsernameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <form id='claim-username' onSubmit={handleUsernameSubmit}>
            <p>Claim your own username</p>
            <div className='username-input'>
                <span className='domain'>debatehive.com/</span>
                <input placeholder='johndoe' />
            </div>
            <button className='submit-btn'>
                <span>CLAIM</span>
                <PiArrowUpRightBold size={20} color='#FFFFFF' />
            </button>
        </form>
    )
}

export default ClaimUsername