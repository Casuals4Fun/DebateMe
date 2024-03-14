import "./left-sidebar.css";
import { useLocation, Link } from "react-router-dom";
import { leftSidebarLinks } from "../../data/left-sidebar-links";
import Profile from "./profile";
import { useState } from "react";

const LeftSidebar = () => {
  const location = useLocation();
  const [expand, setExpand] = useState(false);

  return (
    <div id='left-sidebar'>
      <Link to='/' className='logo__wrapper'>
        <img src="/logo.png" alt="" />
      </Link>
      <ul>
        {leftSidebarLinks.map(item => (
          <li key={item.id} title={item.name}>
            <Link to={item.href} className='links__wrapper'>
              <item.icon />
              <p className={`${location.pathname === item.href ? 'name-active' : ''} underline`}>
                {item.name}
              </p>
            </Link>
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