import './App.css'
import { useRef, useEffect } from 'react'
import { useLocation, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useNavStore } from './store/nav'
import { AuthStatus, AuthTab, useAuthStore } from './store/auth'
import handleAutoLogin from './utils/auto-login'
import LeftSidebar from './components/sidebar/left-sidebar'
import RightSidebar from './components/sidebar/right-sidebar'
import AuthModal from './components/auth'
import Debate from './components/debate'
import HomePage from './pages/home'
import AuthPage from './pages/auth'
import SearchPage from './pages/search'
import CreateDebatePage from './pages/create-debate'
import HotTopicsPage from './pages/hot-topics'
import OpenTopicsPage from './pages/open-topics'
import ProfilePage from './pages/profile'
import DebatePage from './pages/profile/debate'
import { LoadingComponent } from './components/loading/svg'

export default function App() {
  const location = useLocation()
  const isDebatePage = location.pathname.split('/').length === 3 || location.pathname === '/create'

  const { theme, isNavbarOpen, isSidebarClose, setSidebarClose, isScrolling, setScrolling } = useNavStore()
  const { setUser, setIsAuthenticated, authTab, setAuthTab } = useAuthStore()

  const lastScrollTop = useRef<number>(0)

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)

    handleAutoLogin(setUser, setIsAuthenticated, setAuthTab)

    const handleScroll = () => {
      const st = window.scrollY
      setScrolling(st > lastScrollTop.current)
      lastScrollTop.current = st <= 0 ? 0 : st
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <aside id='left-sidebar' className={`${isScrolling ? 'hide' : 'reveal'} ${isSidebarClose && !isDebatePage ? 'close' : ''}`}>
        <LeftSidebar />
      </aside>
      <main className={`${isNavbarOpen ? 'expand' : ''} ${isSidebarClose ? 'w-full' : ''} ${isDebatePage ? 'w-page' : ''}`}>
        <Routes>
          <Route element={<Debate />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/hot' element={<HotTopicsPage />} />
            <Route path='/new' element={<OpenTopicsPage />} />
          </Route>
          <Route element={<Authenticated />}>
            <Route path='/create' element={<CreateDebatePage />} />
          </Route>
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/login' element={<Navigate to='/auth?type=login' />} />
          <Route path='/signup' element={<Navigate to='/auth?type=signup' />} />
          <Route path='/forgot' element={<Navigate to='/auth?type=forgot' />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path=':user_id'>
            <Route index element={<ProfilePage />} />
            <Route path=':debate_id' element={<DebatePage />} />
          </Route>
        </Routes>
      </main>
      <aside id='right-sidebar' className={`${isScrolling ? 'hide' : 'reveal'} ${isSidebarClose && !isDebatePage ? 'close' : ''} ${isDebatePage ? 'hidden' : ''}`}>
        <RightSidebar />
      </aside>

      {!isDebatePage && (
        <>
          <button className='sidebar-btn left' onClick={() => setSidebarClose(!isSidebarClose)}>
            {isSidebarClose ? <FaChevronRight size={20} /> : <FaChevronLeft size={20} />}
          </button>
          <button className='sidebar-btn right' onClick={() => setSidebarClose(!isSidebarClose)}>
            {isSidebarClose ? <FaChevronLeft size={20} /> : <FaChevronRight size={20} />}
          </button>
        </>
      )}

      {authTab !== AuthTab.Closed && <AuthModal />}

      <Toaster
        duration={3000}
        position='top-center'
        richColors
        theme={theme}
      />
    </>
  )
}

const Authenticated = () => {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated === AuthStatus.Authenticating) {
    return <LoadingComponent />
  }
  else if (isAuthenticated === AuthStatus.Failed) {
    return <Navigate to='/auth' replace />
  }

  return <Outlet />
}