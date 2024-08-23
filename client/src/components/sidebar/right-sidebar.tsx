import './right-sidebar.css'
import { Link } from 'react-router-dom'
import { useNavStore } from '../../store/nav'
import ToggleTheme from '../theme'
import Profile from './profile'
import Explore from './explore'

interface SidebarProps {
  isVisible: boolean
}

const RightSidebar: React.FC<SidebarProps> = ({ isVisible }) => {
  const { isNavbarOpen } = useNavStore()

  return (
    <div className='right-sidebar__container'>
      <Link to='/' className='logo__container'>
        <img src='/logo.png' alt='' />
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <div className='profile-theme__container'>
          <div className='theme__wrapper'>
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
  )
}

export default RightSidebar