import './right-sidebar.css'
import { Link } from 'react-router-dom'
import Profile from './profile'
import Explore from './explore'

const RightSidebar = () => {
  return (
    <div className='right-sidebar__container'>
      <Link to='/' className='logo__container'>
        <img src='/logo.png' alt='logo' />
      </Link>

      <Profile />

      <Explore />
    </div>
  )
}

export default RightSidebar