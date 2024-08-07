import './claim-username.css'
import { useCallback, useState } from 'react'
import { AuthTab, useAuthStore } from '../../store/useAuthStore'
import { toast } from 'sonner'
import { PiArrowUpRightBold } from 'react-icons/pi'
import { LoadingSVG } from '../loading/svg'
import { useNavStore } from '../../store/useNavStore'
import { usernameRegex } from '../../data/regex'

const ClaimUsername = () => {
    const { setAuthTab } = useAuthStore()
    const { sidebar } = useNavStore()

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [username, setUsername] = useState(localStorage.getItem('username') || '')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', content: '' })

    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ') e.preventDefault()
    }, [])

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputUsername = e.target.value
        setUsername(inputUsername)

        if (inputUsername) {
            if (!usernameRegex.test(inputUsername)) {
                setMessage({ type: 'error', content: 'Username can only contain alphanumeric characters, underscores (_) and hyphens (-). No spaces or other special characters are allowed.' })
            } else setMessage({ type: '', content: '' })
        }
    }

    const handleUsernameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitted(true)
        setTimeout(() => setIsSubmitted(false), 500)

        if (username && message.type !== 'error') {
            setLoading(true)

            await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/check-username`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            })
                .then(res => res.json())
                .then(response => {
                    if (response.success) {
                        localStorage.setItem('username', username)
                        setAuthTab(AuthTab.Signup)
                        setMessage({ type: 'success', content: response.message })
                        toast.success('Register your account to claim username')
                    } else setMessage({ type: 'error', content: response.message })
                })
                .catch(() => setMessage({ type: 'error', content: 'Something went wrong. Try again later!' }))
                .finally(() => setLoading(false))
        }
    }

    return (
        <form id='claim-username' className={sidebar ? 'hide' : ''} onSubmit={handleUsernameSubmit}>
            <p>Get Started</p>
            <div className='username-input'>
                <span className='domain'>debateme.app/</span>
                <input
                    name='username'
                    placeholder='johndoe'
                    autoComplete='on'
                    value={username}
                    onChange={handleUsernameChange}
                    onKeyPress={handleKeyPress}
                    className={isSubmitted && (!username || message.type === 'error') ? 'shake' : ''}
                    style={{ border: isSubmitted && (!username || message.type === 'error') ? '2px dotted var(--username-color)' : '' }}
                />
            </div>
            <button className='submit-btn' disabled={loading}>
                <span>CLAIM PROFILE</span>
                {!loading ? (
                    <PiArrowUpRightBold size={20} />
                ) : (
                    <LoadingSVG size={20} />
                )}
            </button>
            {message.content && <p style={{ color: message.type === 'error' ? 'red' : 'green' }}>{message.content}</p>}
        </form>
    )
}

export default ClaimUsername