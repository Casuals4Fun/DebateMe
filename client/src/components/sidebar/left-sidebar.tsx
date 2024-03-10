import "./left-sidebar.css";
import { useLocation, Link } from "react-router-dom";
import { leftSidebarLinks } from "../../data/left-sidebar-links";

const LeftSidebar = () => {
  const location = useLocation();

  return (
    <div id='left-sidebar'>
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
    </div>
  )
}

export default LeftSidebar