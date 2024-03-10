import "./left-sidebar.css";
import { leftSidebarLinks } from "../../data/left-sidebar-links";
import { Link } from "react-router-dom";


const LeftSidebar = () => {
  return (
    <div id='left-sidebar'>
      <ul>
        {leftSidebarLinks.map(item => (
          <li key={item.id}>
            <Link to={item.href} className='links__wrapper'>
              <item.icon />
              <p>{item.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LeftSidebar