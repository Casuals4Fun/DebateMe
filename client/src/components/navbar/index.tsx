import './style.css';
import { Theme, useNavStore } from '../../store/useNavStore';

const Navbar = () => {
  const { theme, setTheme } = useNavStore();

  const handleToggleTheme = () => {
    const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;
    document.querySelector("body")?.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  }

  return (
    <nav id='navbar'>
      <div className='navbar__left'>
        <img src="/logo.png" alt="logo" />
      </div>

      <div className='navbar__right'>
        <button onClick={handleToggleTheme}>
          Change to {theme === Theme.Light ? Theme.Dark : Theme.Light} mode
        </button>
      </div>
    </nav>
  )
}

export default Navbar;