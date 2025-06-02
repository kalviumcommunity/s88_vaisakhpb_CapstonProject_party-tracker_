import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import ClubsPage from './pages/ClubsPage';
import AuthPage from './pages/AuthPage';
import StudentZonePage from './pages/StudentZonePage';
import Layout from './components/layout/Layout';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="clubs" element={<ClubsPage />} />
            <Route path="auth/:action" element={<AuthPage />} />
            <Route path="student-zone" element={<StudentZonePage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;