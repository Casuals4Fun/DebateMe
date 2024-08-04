import "./toggle-theme.css"
import { Theme, useNavStore } from "../../store/useNavStore"

const ToggleTheme = () => {
    const { theme, setTheme } = useNavStore()

    const handleToggleTheme = () => {
        const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light
        document.querySelector("body")?.setAttribute('data-theme', newTheme)
        setTheme(newTheme)
    }

    return (
        <div className='theme__button' title={theme === Theme.Dark ? 'Switch to Light mode' : 'Switch to Dark mode'}>
            <input
                name='toggle'
                className='toggle-activator'
                type='checkbox'
                checked={theme === Theme.Light}
                readOnly
            />

            <div className='display' onClick={handleToggleTheme}>
                <div className='toggle-btn'>
                    <div className='circle'>
                        <img src='/theme/moon.png' className='moon' />
                        <img src='/theme/sun.svg' className='sun' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToggleTheme