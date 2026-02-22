import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import CycleLoggingPage from './pages/CycleLoggingPage';
import DashboardPage from './pages/DashboardPage';
import OnboardingPage from './pages/OnboardingPage';
import SettingsPage from './pages/SettingsPage';
import { getCycleLogs, getUserProfile, setCycleLogs } from './utils/storage';
import { useEffect, useState } from 'react';

function ProtectedLayout({ profile, children }) {
  if (!profile) return <Navigate to="/" replace />;
  return <Layout>{children}</Layout>;
}

export default function App() {
  const [profile, setProfile] = useState(() => getUserProfile());
  const [logs, setLogsState] = useState(() => getCycleLogs());

  useEffect(() => {
    setProfile(getUserProfile());
  }, []);

  const setLogs = (nextLogs) => {
    setLogsState(nextLogs);
    setCycleLogs(nextLogs);
  };

  const resetState = () => {
    setProfile(null);
    setLogsState([]);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          profile ? <Navigate to="/dashboard" replace /> : <OnboardingPage onProfileCreated={setProfile} />
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedLayout profile={profile}>
            <DashboardPage profile={profile} logs={logs} />
          </ProtectedLayout>
        }
      />
      <Route
        path="/log-cycle"
        element={
          <ProtectedLayout profile={profile}>
            <CycleLoggingPage logs={logs} setLogs={setLogs} />
          </ProtectedLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedLayout profile={profile}>
            <SettingsPage resetState={resetState} />
          </ProtectedLayout>
        }
      />
      <Route path="*" element={<Navigate to={profile ? '/dashboard' : '/'} replace />} />
    </Routes>
  );
}
