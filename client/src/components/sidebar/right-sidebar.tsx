import "./right-sidebar.css";
import { RxHamburgerMenu } from "react-icons/rx";


const RightSidebar = () => {
  return (
    <div id='right-sidebar'>
      <div className='logo__container'>
        <img src="/logo.png" alt="Logo" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <div className='profile-theme__container'>
          <div className='profile__wrapper'>
            <img src="/user.jpg" alt="User" className='profile__image' />
            <div className='profile__info'>
              <p>Julie Roberts</p>
              <p>julieroberts</p>
            </div>
          </div>

          <div className='theme__wrapper'>
            <div className='theme__button'>

            </div>
          </div>
        </div>

        <RxHamburgerMenu className='menu-icon' />
      </div>
    </div>
  )
}

export default RightSidebar