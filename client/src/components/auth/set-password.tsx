import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { AuthStatus, AuthTab, useAuthStore } from '../../store/auth'
import { LoadingSVG } from '../loading/svg'

const SetPassword = () => {
  const navigate = useNavigate()

  const { setUser, setIsAuthenticated, setAuthTab } = useAuthStore()

  const [resetData, setResetData] = useState({
    new: '',
    confirm: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [validationState, setValidationState] = useState({
    isNewValid: true,
    isConfirmValid: true
  })

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setResetData(prevState => ({
      ...prevState,
      [name]: value
    }))

    setValidationState(prevState => ({
      ...prevState,
      [`is${name.charAt(0).toUpperCase() + name.slice(1)}Valid`]: !!value
    }))
  }, [])

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitted(true)

    const trimmedNew = resetData.new.trim()
    const trimmedConfirm = resetData.confirm.trim()

    setResetData(prevState => ({
      ...prevState,
      new: trimmedNew,
      confirm: trimmedConfirm
    }))

    setValidationState({
      isNewValid: !!trimmedNew,
      isConfirmValid: !!trimmedConfirm
    })

    if (trimmedNew !== trimmedConfirm) {
      setTimeout(() => setIsSubmitted(false), 500)
      return toast.error('Password does not match')
    }
    else {
      if (trimmedNew.length < 6) {
        setTimeout(() => setIsSubmitted(false), 500)
        return toast.warning('Password should be atleast 6 digits')
      }

      await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/set-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: new URLSearchParams(location.search).get('token'), password: trimmedNew })
      }).then(res => res.json())
        .then(response => {
          if (response.success) {
            localStorage.setItem('token', response.data.token)
            setUser(response.data.user)
            setIsAuthenticated(AuthStatus.Authenticated)
            setAuthTab(AuthTab.Closed)
            navigate('/')
            toast.success(response.message)
          }
          else {
            if (response.message === 'Validation failed') {
              return toast.error(`${response.errors[0].field.charAt(0).toUpperCase() + response.errors[0].field.slice(1)} ${response.errors[0].message}`)
            }
            toast.error(response.message)
          }
        })
        .finally(() => setIsSubmitted(false))
    }
  }

  return (
    <div id='reset'>
      <h3>Set Password</h3>
      <form id='forgot-form' className='form__container' onSubmit={handleFormSubmit}>
        <div className='input__container'>
          <p>New Password</p>
          <input
            name='new'
            type='password'
            value={resetData.new}
            onChange={handleInputChange}
            className={`${isSubmitted && !validationState.isNewValid ? 'shake' : ''}`}
            style={{ borderColor: isSubmitted && !validationState.isNewValid ? 'red' : '' }}
          />
        </div>
        <div className='input__container'>
          <p>Confirm Password</p>
          <input
            name='confirm'
            type='password'
            value={resetData.confirm}
            onChange={handleInputChange}
            className={`${isSubmitted && !validationState.isConfirmValid ? 'shake' : ''}`}
            style={{ borderColor: isSubmitted && !validationState.isConfirmValid ? 'red' : '' }}
          />
        </div>
        <button
          type='submit'
          disabled={isSubmitted}
          style={{ cursor: `${isSubmitted ? 'not-allowed' : ''}` }}
        >
          {isSubmitted ? <LoadingSVG size={23} /> : 'Proceed'}
        </button>
        <div className='extra-btn'>
          <p>
            <span onClick={() => navigate('/auth?type=login')}>
              Go Back
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SetPassword