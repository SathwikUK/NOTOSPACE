import { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import LoadingSpinner from './components/LoadingSpinner';
 import axios from "./api/axios";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          localStorage.removeItem('token');
        }
      })
      .catch(err => {
        console.error('Auth verification failed:', err);
        localStorage.removeItem('token');
      })
      .finally(() => setLoading(false));
  } else {
    setLoading(false);
  }
}, []);


  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? <Dashboard user={user} setUser={setUser} /> : <LoginPage setUser={setUser} />;
}

export default App;