import { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from './components/common/Navbar';
import ErrorBoundary from './components/common/ErrorBoundaries/ErrorBoundary';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ArticleSkeleton from './components/common/Skeletons/ArticleSkeleton';
import NotFound from './pages/NotFound';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const PersonalizedNews = lazy(() => import('./pages/PersonalizedNews'));

function App() {
  const menuList = [
    'ALL',
    'POLITICS',
    'WORLD',
    'BUSINESS',
    'SHOPPING',
    'SPORTS',
    'PERSONALIZED',
  ];
  const { pathname } = useLocation();
  const [searchQuery, setSearchQuery] = useState('ALL');

  useEffect(() => {
    setSearchQuery(
      pathname && pathname.replace('/', '') === 'dashboard'
        ? 'ALL'
        : pathname.replace('/', '')
    );
  }, [pathname]);
  return (
    <ErrorBoundary>
      <Navbar
        menuList={menuList}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<ArticleSkeleton />}>
              <Dashboard searchQuery={searchQuery.toLowerCase()} />
            </Suspense>
          }
        />
        <Route
          path="/personalized"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <PersonalizedNews searchQuery={searchQuery.toLowerCase()} />
            </Suspense>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
