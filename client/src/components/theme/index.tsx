import './style.css'
import { Theme, useNavStore } from '../../store/nav'

const ToggleTheme = () => {
    const { theme, setTheme } = useNavStore()

    const handleToggleTheme = () => {
        const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light
        document.querySelector('body')?.setAttribute('data-theme', newTheme)
        setTheme(newTheme)
    }

    return (
        <div className='theme__button' title={theme === Theme.Dark ? 'Switch to Light mode' : 'Switch to Dark mode'}>
            <input
                name='toggle'
                type='checkbox'
                checked={theme === Theme.Light}
                readOnly
            />

            <button onClick={handleToggleTheme}>
                <div className='circle'>
                    <img src='/theme/moon.png' className='moon' />
                    <img src='/theme/sun.svg' className='sun' />
                </div>
            </button>
        </div>
    )
}

export default ToggleTheme