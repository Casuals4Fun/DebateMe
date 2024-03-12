import "./right-sidebar.css";
import React, { useState } from "react";
import ToggleTheme from "../button/toggle-theme";
import ExpandMenu from "../menu/expand-menu";
import Explore from "./explore";

const RightSidebar = () => {
  const [expand, setExpand] = useState(false);

  return (
    <div id='right-sidebar'>
      <div className={`expand-menu__background ${expand ? 'expand' : ''}`} />

      <SidebarContent
        expand={expand}
        setExpand={setExpand}
      />

      {expand && <ExpandMenu setExpand={setExpand} />}
    </div>
  )
}

interface SidebarContentProps {
  expand: boolean
  setExpand: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContent: React.FC<SidebarContentProps> = ({ expand, setExpand }) => {
  return (
    <div className='right-sidebar__container'>
      <div className='logo__container'>
        <img src="/logo.png" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <div className='profile-theme__container'>
          <div className='profile__wrapper'>
            <div className='profile__image'>
              <img src="/user.jpg" alt="" />
            </div>
            <div className='profile__info'>
              <p>Julie Roberts</p>
              <p>julieroberts</p>
            </div>
          </div>

          <div className={`theme__wrapper ${expand && 'expand-active'}`}>
            <ToggleTheme />
          </div>
        </div>

        <div className='menu-icon' onClick={() => setExpand(!expand)}>
          <div className={`hamburger__line ${expand ? 'animate' : ''}`} />
          <div className={`hamburger__line ${expand ? 'animate' : ''}`} />
          <div className={`hamburger__line ${expand ? 'animate' : ''}`} />
        </div>
      </div>

      <div className='explore__container'>
        <Explore />
      </div>

      {!expand && <div className='nav-border' />}
    </div>
  )
}

export default RightSidebar