import './App.css'
import { useRef, useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ProtectedRoute } from './ProtectedRoute'
import { Theme, useNavStore } from './store/useNavStore'
import { AuthTab, useAuthStore } from './store/useAuthStore'
import handleAutoLogin from './utils/auto-login'
import LeftSidebar from './components/sidebar/left-sidebar'
import RightSidebar from './components/sidebar/right-sidebar'
import AuthModal from './components/modal/auth'
import HomePage from './pages/home'
import AuthPage from './pages/auth'
import SearchPage from './pages/search'
import CreateDebatePage from './pages/create-debate'
import HotTopicsPage from './pages/hot-topics'
import OpenTopicsPage from './pages/open-topics'
import NotificationPage from './pages/notifications'
import UserProfile from './pages/profile'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function App() {
  const { setRoute, setUser, setIsAuthenticated, authTab, setAuthTab } = useAuthStore()
  const { expand, sidebar, setSidebar } = useNavStore()

  const mainRef = useRef<HTMLDivElement>(null)
  const lastScrollTop = useRef<number>(0)
  const [isScrollingUp, setIsScrollingUp] = useState<boolean>(true)

  useEffect(() => {
    document.body.setAttribute('data-theme', localStorage.getItem('theme') === Theme.Light ? Theme.Light : Theme.Dark)

    handleAutoLogin(setRoute, setUser, setIsAuthenticated, setAuthTab)

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
    <div id='app'>
      <>
        <LeftSidebar isVisible={isScrollingUp} />
        <button className='sidebar-btn left' onClick={() => setSidebar(!sidebar)}>
          {sidebar ? <FaChevronRight size={20} /> : <FaChevronLeft size={20} />}
        </button>
      </>
      <main id='main' ref={mainRef} className={`${expand ? 'expand' : ''} ${sidebar ? 'w-full' : ''}`}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/login' element={<Navigate to='/auth?type=login' />} />
          <Route path='/signup' element={<Navigate to='/auth?type=signup' />} />
          <Route path='/forgot' element={<Navigate to='/auth?type=forgot' />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/create' element={<ProtectedRoute><CreateDebatePage isScrollingUp={isScrollingUp} isFullscreen={!sidebar} /></ProtectedRoute>} />
          <Route path='/hot-topics' element={<HotTopicsPage />} />
          <Route path='/open-topics' element={<OpenTopicsPage />} />
          <Route path='/notifications' element={<ProtectedRoute><NotificationPage /></ProtectedRoute>} />
          <Route path=':username' element={<UserProfile isScrollingUp={isScrollingUp} />} />
        </Routes>
      </main>
      <>
        <RightSidebar isVisible={isScrollingUp} />
        <button className='sidebar-btn right' onClick={() => setSidebar(!sidebar)}>
          {sidebar ? <FaChevronLeft size={20} /> : <FaChevronRight size={20} />}
        </button>
      </>

      {authTab !== AuthTab.Closed && <AuthModal />}

      <Toaster
        duration={3000}
        position='top-center'
        richColors
        theme={(localStorage.getItem('theme') as Theme) || Theme.Dark}
      />
    </div>
  )
}