import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Theme, useNavStore } from './store/useNavStore';
import { AuthTab, useAuthStore } from './store/useAuthStore';
import LeftSidebar from './components/sidebar/left-sidebar';
import RightSidebar from './components/sidebar/right-sidebar';
import HomePage from './pages/home';
import SearchPage from './pages/search';
import HotTopicsPage from './pages/hot-topics';
import OpenTopicsPage from './pages/open-topics';
import AuthModal from './components/modal/auth-modal';

export default function App() {
  const { authTab } = useAuthStore();
  const { expand } = useNavStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || Theme.Dark;
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <>
      <div id='app'>
        <LeftSidebar />
        <main id='main' className={`${expand ? 'expand' : ''}`}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/hot-topics' element={<HotTopicsPage />} />
            <Route path='/open-topics' element={<OpenTopicsPage />} />
          </Routes>
        </main>
        <RightSidebar />
      </div>
      {authTab !== AuthTab.Closed && <AuthModal />}
    </>
  );
}