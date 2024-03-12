import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Theme } from './store/useNavStore';
import Home from './pages/home';
import LeftSidebar from './components/sidebar/left-sidebar';
import RightSidebar from './components/sidebar/right-sidebar';

export default function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || Theme.Dark;
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <div id='app'>
      <LeftSidebar />
      <main id='main'>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </main>
      <RightSidebar />
    </div>
  );
}