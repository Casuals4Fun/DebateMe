import "./left-sidebar.css";
import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { leftSidebarLinks } from "../../data/left-sidebar-links";
import Profile from "./profile";
import { AuthTab, useAuthStore } from "../../store/useAuthStore";

const LeftSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [expand, setExpand] = useState(false);
  const { isAuthenticated, setAuthTab } = useAuthStore();

  const handleLinkClick = (href: string, name: string) => {
    if (name === "Create Debate") {
      if (!isAuthenticated) setAuthTab(AuthTab.Login);
      else navigate(href);
    }
    else navigate(href);
  };

  return (
    <div id='left-sidebar'>
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
        <Profile expand={expand} setExpand={setExpand} />
      </div>
    </div>
  )
}

export default LeftSidebar