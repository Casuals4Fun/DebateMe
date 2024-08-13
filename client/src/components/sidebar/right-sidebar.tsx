import './right-sidebar.css'
import { Link } from 'react-router-dom'
import { useNavStore } from '../../store/useNavStore'
import ToggleTheme from '../button/toggle-theme'
import Profile from './profile'
import Explore from './explore'

interface SidebarProps {
  isVisible: boolean
}

const RightSidebar: React.FC<SidebarProps> = ({ isVisible }) => {
  const { isNavbarOpen, isSidebarClose } = useNavStore()

  return (
    <div id='right-sidebar' className={`${isVisible ? 'reveal' : 'hide'} ${isSidebarClose ? 'close' : 'open'}`}>
      <div className='right-sidebar__container'>
        <Link to='/' className='logo__container'>
          <img src='/logo.png' alt='' />
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div className='profile-theme__container'>
            <div className={`theme__wrapper`}>
              <ToggleTheme />
            </div>

            <Profile isVisible={isVisible} />
          </div>
        </div>

        <div className='explore__container'>
          <Explore />
        </div>

        {!isNavbarOpen && <div className='nav-border' />}
      </div>
    </div>
  )
}

export default RightSidebar