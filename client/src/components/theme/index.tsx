import './style.css'
import { Theme, useNavStore } from '../../store/nav'

const ToggleTheme = () => {
    const { theme, setTheme } = useNavStore()

    return (
        <div className='theme__button' title={theme === Theme.Dark ? 'Switch to Light mode' : 'Switch to Dark mode'}>
            <input
                name='toggle'
                type='checkbox'
                checked={theme === Theme.Light}
                readOnly
            />

            <button onClick={() => setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light)}>
                <div className='circle'>
                    <img src='/theme/moon.png' className='moon' alt='moon' />
                    <img src='/theme/sun.svg' className='sun' alt='sun' />
                </div>
            </button>
        </div>
    )
}

export default ToggleTheme