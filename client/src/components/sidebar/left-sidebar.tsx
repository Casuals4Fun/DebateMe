import "./left-sidebar.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { AuthStatus, AuthTab, useAuthStore } from "../../store/useAuthStore";
import { Theme, useNavStore } from "../../store/useNavStore";
import { toast } from "sonner";
import { leftSidebarLinks } from "../../data/left-sidebar-links";
import Profile from "./profile";
import { GoPerson } from "react-icons/go";
import LoadingSkeleton from "../loading/skeleton";

interface SidebarProps {
  isVisible: boolean
}

const LeftSidebar: React.FC<SidebarProps> = ({ isVisible }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { setRoute, isAuthenticated, setAuthTab } = useAuthStore();
  const { theme, setTheme } = useNavStore();

  const handleLinkClick = (href: string, name: string) => {
    if (name === "Create Debate" || name === "Notifications") {
      if (isAuthenticated === AuthStatus.Failed) {
        setRoute(href);
        setAuthTab(AuthTab.Login);
      }
      else if (isAuthenticated === AuthStatus.Authenticated) navigate(href);
      else return toast.warning('Try again...');
    }
    else navigate(href);
  };

  const handleToggleTheme = () => {
    const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;
    document.querySelector("body")?.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  }

  return (
    <div id='left-sidebar' className={isVisible ? 'reveal' : 'hide'}>
      <Link to='/' className='logo__wrapper'>
        <img src="/logo.png" alt="" />
      </Link>
      <ul>
        {leftSidebarLinks.map(item => (
          <li key={item.id} title={item.name}>
            <div onClick={() => handleLinkClick(item.href, item.name)} className='links__wrapper'>
              <item.icon />
              <p className={`${location.pathname === item.href ? 'name-active' : ''} underline`}>
                {item.name}
              </p>
            </div>
            <div className={`${location.pathname === item.href ? 'footer-active' : ''}`} />
          </li>
        ))}
      </ul>
      <div className='profile__container'>
        {isAuthenticated === AuthStatus.Authenticating ? (
          <LoadingSkeleton style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        ) : isAuthenticated === AuthStatus.Authenticated ? (
          <Profile />
        ) : isAuthenticated === AuthStatus.Failed && (
          <>
            <button
              className='theme-btn'
              onClick={handleToggleTheme}
              title={theme === Theme.Dark ? 'Switch to Light mode' : 'Switch to Dark mode'}
            >
              {theme === Theme.Dark ? <img className="sun" src="theme/sun.svg" alt="" /> : <img className="moon" src="theme/moon.png" alt="" />}
            </button>
            <button onClick={() => setAuthTab(AuthTab.Login)}>
              <GoPerson size={30} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default LeftSidebar