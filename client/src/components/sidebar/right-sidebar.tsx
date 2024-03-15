import "./right-sidebar.css";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import ToggleTheme from "../button/toggle-theme";
// import ExpandMenu from "../menu/expand-menu";
import Profile from "./profile";
import Explore from "./explore";

const RightSidebar = () => {
  const [expand, setExpand] = useState(false);

  return (
    <div id='right-sidebar'>
      {/* <div className={`expand-menu__background ${expand ? 'expand' : ''}`} /> */}

      <SidebarContent
        expand={expand}
        setExpand={setExpand}
      />

      {/* {expand && <ExpandMenu setExpand={setExpand} />} */}
    </div>
  )
}

interface SidebarContentProps {
  expand: boolean
  setExpand: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContent: React.FC<SidebarContentProps> = ({ expand, setExpand }) => {
  const location = useLocation();

  return (
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
          {/* <div className={`theme__wrapper ${expand && 'expand-active'}`}> */}
          <div className={`theme__wrapper`}>
            <ToggleTheme />
          </div>

          <Profile
            expand={expand}
            setExpand={setExpand}
          />
        </div>

        {/* <div className='menu-icon' onClick={() => setExpand(!expand)}>
          <div className={`hamburger__line ${expand ? 'animate' : ''}`} />
          <div className={`hamburger__line ${expand ? 'animate' : ''}`} />
          <div className={`hamburger__line ${expand ? 'animate' : ''}`} />
        </div> */}
      </div>

      <div className='explore__container'>
        <Explore />
      </div>

      {!expand && <div className='nav-border' />}
    </div>
  )
}

export default RightSidebar