import "./claim-username.css"
import { PiArrowUpRightBold } from "react-icons/pi"
// import { LoadingSVG } from "../loading/svg"

const ClaimUsername = () => {
    const handleUsernameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <form id='claim-username' onSubmit={handleUsernameSubmit}>
            <p>Get Started</p>
            <div className='username-input'>
                <span className='domain'>debatehive.com/</span>
                <input placeholder='johndoe' />
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