import "./right-sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import ToggleTheme from "../button/toggle-theme";
import Profile from "./profile";
import Explore from "./explore";
import { useNavStore } from "../../store/useNavStore";

const RightSidebar = () => {
  const location = useLocation();
  const { expand, setExpand } = useNavStore();

  return (
    <div id='right-sidebar'>
      <div className='right-sidebar__container'>
        <Link to='/' className='logo__container'>
          <img src="/logo.png" />
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div className='search-button' style={{ borderColor: `${location.pathname === "/search" ? "var(--body_color)" : ""}` }}>
            <Link to='/search' onClick={() => setExpand(false)}>
              <IoSearch size={15} />
            </Link>
          </div>

          <div className='profile-theme__container'>
            <div className={`theme__wrapper`}>
              <ToggleTheme />
            </div>

            <Profile />
          </div>
        </div>

        <div className='explore__container'>
          <Explore />
        </div>

        {!expand && <div className='nav-border' />}
      </div>
    </div>
  )
}

export default RightSidebar