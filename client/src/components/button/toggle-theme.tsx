import "./toggle-theme.css";
import { Theme, useNavStore } from "../../store/useNavStore";

const ToggleTheme = () => {
    const { theme, setTheme } = useNavStore();

    const handleToggleTheme = () => {
        const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;
        document.querySelector("body")?.setAttribute('data-theme', newTheme);
        setTheme(newTheme);
    }

    return (
        <div className='theme__button'>
            <input className='toggle-activator' type="checkbox" id="toggle" />

            <div className="display" onClick={handleToggleTheme}>
                <label className='toggle-background' htmlFor="toggle">
                    <div className="circle">
                        <img src="/theme/moon.png" className="moon" />
                        <img src="/theme/sun.svg" className="sun" />
                    </div>
                </label>
            </div>
        </div>
    )
}

export default ToggleTheme