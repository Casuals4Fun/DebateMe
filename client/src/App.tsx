import "./App.css"
import { useRef, useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "sonner"
import { ProtectedRoute } from "./ProtectedRoute"
import { Theme, useNavStore } from "./store/useNavStore"
import { AuthTab, useAuthStore } from "./store/useAuthStore"
import handleAutoLogin from "./utils/handleAutoLogin"
import LeftSidebar from "./components/sidebar/left-sidebar"
import RightSidebar from "./components/sidebar/right-sidebar"
import AuthModal from "./components/modal/auth"
import HomePage from "./pages/home"
import AuthPage from "./pages/auth"
import SearchPage from "./pages/search"
import CreateDebatePage from "./pages/create-debate"
import HotTopicsPage from "./pages/hot-topics"
import OpenTopicsPage from "./pages/open-topics"
import NotificationPage from "./pages/notifications"

export default function App() {
  const { setRoute, setUser, setIsAuthenticated, authTab, setAuthTab } = useAuthStore();
  const { expand } = useNavStore();

  useEffect(() => {
    document.body.setAttribute('data-theme', localStorage.getItem('theme') || Theme.Dark);
    handleAutoLogin(setRoute, setUser, setIsAuthenticated, setAuthTab);
  }, [setRoute, setUser, setIsAuthenticated, setAuthTab]);

  const mainRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef<number>(0);
  const [isScrollingUp, setIsScrollingUp] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        const st = mainRef.current.scrollTop;
        if (st > lastScrollTop.current) setIsScrollingUp(false);
        else setIsScrollingUp(true);
        lastScrollTop.current = st <= 0 ? 0 : st;
      }
    };

    const mainElement = mainRef.current;
    if (mainElement) mainElement.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div id='app'>
      <LeftSidebar isVisible={isScrollingUp} />
      <main id='main' ref={mainRef} className={expand ? 'expand' : ''}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/login' element={<Navigate to='/auth?type=login' />} />
          <Route path='/signup' element={<Navigate to='/auth?type=signup' />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/create' element={<ProtectedRoute><CreateDebatePage /></ProtectedRoute>} />
          <Route path='/hot-topics' element={<HotTopicsPage />} />
          <Route path='/open-topics' element={<OpenTopicsPage />} />
          <Route path='/notifications' element={<ProtectedRoute><NotificationPage /></ProtectedRoute>} />
        </Routes>
      </main>
      <RightSidebar isVisible={isScrollingUp} />

      {authTab !== AuthTab.Closed && <AuthModal />}

      <Toaster
        duration={3000}
        position="top-center"
        theme={(localStorage.getItem('theme') as Theme) || Theme.Dark}
      />
    </div>
  );
}