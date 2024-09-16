import './right-sidebar.css'
import { Link } from 'react-router-dom'
import { useNavStore } from '../../store/nav'
import Profile from './profile'
import Explore from './explore'

const RightSidebar = () => {
  const { isNavbarOpen } = useNavStore()

  return (
    <div className='right-sidebar__container'>
      <Link to='/' className='logo__container'>
        <img src='/logo.png' alt='logo' />
      </Link>

      <Profile />

      <Explore />

      {!isNavbarOpen && <div className='nav-border' />}
    </div>
  )
}

export default RightSidebar