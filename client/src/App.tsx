import './App.css'
import { useRef, useState, useEffect } from 'react'
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
  const isDebatePage = useLocation().pathname.split('/').length === 3

  const { theme, isNavbarOpen, isSidebarClose, setSidebarClose } = useNavStore()
  const { setUser, setIsAuthenticated, authTab, setAuthTab } = useAuthStore()

  const mainRef = useRef<HTMLDivElement>(null)
  const lastScrollTop = useRef<number>(0)
  const [isScrollingUp, setIsScrollingUp] = useState<boolean>(true)

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)

    handleAutoLogin(setUser, setIsAuthenticated, setAuthTab)

    const handleScroll = () => {
      const st = mainRef.current?.scrollTop ?? 0
      setIsScrollingUp(st <= lastScrollTop.current)
      lastScrollTop.current = Math.max(st, 0)
    }

    const mainElement = mainRef.current
    mainElement?.addEventListener('scroll', handleScroll, { passive: true })
    return () => mainElement?.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <aside id='left-sidebar' className={`${isScrollingUp ? 'reveal' : 'hide'} ${isSidebarClose && !isDebatePage ? 'close' : ''}`}>
        <LeftSidebar />
      </aside>
      <main ref={mainRef} className={`${isNavbarOpen ? 'expand' : ''} ${isSidebarClose ? 'w-full' : ''} ${isDebatePage ? 'w-page' : ''}`}>
        <Routes>
          <Route element={<Debate />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/hot-topics' element={<HotTopicsPage />} />
            <Route path='/open-topics' element={<OpenTopicsPage />} />
          </Route>
          <Route element={<Authenticated />}>
            <Route path='/create' element={<CreateDebatePage isScrollingUp={isScrollingUp} />} />
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
      <aside id='right-sidebar' className={`${isScrollingUp ? 'reveal' : 'hide'} ${isSidebarClose && !isDebatePage ? 'close' : ''} ${isDebatePage ? 'hidden' : ''}`}>
        <RightSidebar isVisible={isScrollingUp} />
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