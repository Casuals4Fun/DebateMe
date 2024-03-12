import "./left-sidebar.css";
import { useLocation, Link } from "react-router-dom";
import { leftSidebarLinks } from "../../data/left-sidebar-links";
import ToggleTheme from "../button/toggle-theme";

const LeftSidebar = () => {
  const location = useLocation();

  return (
    <div id='left-sidebar'>
      <div className='logo__wrapper'>
        <img src="/logo.png" alt="" />
      </div>
      <ul>
        {leftSidebarLinks.map(item => (
          <li key={item.id}>
            <Link to={item.href} className='links__wrapper'>
              <item.icon />
              <p className={`${location.pathname === item.href ? 'name-active' : ''} underline`}>{item.name}</p>
            </Link>
            <div className={`${location.pathname === item.href ? 'footer-active' : ''}`} />
          </li>
        ))}
      </ul>
      <div className='theme__wrapper'>
        <ToggleTheme />
      </div>
    </div>
  )
}

export default LeftSidebar