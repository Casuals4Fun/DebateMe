import "./left-sidebar.css"
import { useLocation, Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { AuthStatus, AuthTab, useAuthStore } from "../../store/useAuthStore"
import { useNavStore } from "../../store/useNavStore"
import { leftSidebarLinks } from "../../data/left-sidebar-links"
import Profile from "./profile"
import { GoPerson } from "react-icons/go"
import LoadingSkeleton from "../loading/skeleton"

interface SidebarProps {
  isVisible: boolean
}

const LeftSidebar: React.FC<SidebarProps> = ({ isVisible }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { setRoute, isAuthenticated, setAuthTab } = useAuthStore();
  const { sidebar } = useNavStore();

  const handleLinkClick = (href: string, name: string) => {
    if (name === "Create Debate") {
      if (isAuthenticated === AuthStatus.Failed) {
        setRoute(href);
        setAuthTab(AuthTab.Login);
      }
      else if (isAuthenticated === AuthStatus.Authenticated) navigate(href);
      else return toast.warning('Try again...');
    }
    else navigate(href);
  };

  return (
    <div id='left-sidebar' className={`${isVisible ? 'reveal' : 'hide'} ${sidebar ? 'close' : 'open'}`}>
      <Link to='/' className='logo__wrapper'>
        <img src='/logo.png' alt='' />
      </Link>
      <ul>
        {leftSidebarLinks.map(item => (
          <li key={item.id} title={item.name} className={location.pathname === item.href ? 'active' : ''}>
            <div onClick={() => handleLinkClick(item.href, item.name)} className='links__wrapper'>
              <item.icon />
              <p className="underline">{item.name}</p>
            </div>
            <div className="footer" />
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