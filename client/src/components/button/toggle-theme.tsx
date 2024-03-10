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
        <div className='theme__button' onClick={handleToggleTheme}>

        </div>
    )
}

export default ToggleTheme