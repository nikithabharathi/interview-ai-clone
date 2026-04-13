import { Toaster } from "./components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from "./lib/query-client"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from "./lib/AuthContext";
import UserNotRegisteredError from "./components/UserNotRegisteredError";
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Interview from './pages/Interview';
import Quiz from './pages/Quiz';
import CodeLab from './pages/CodeLab';
import Resume from './pages/Resume';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const AuthenticatedApp = () => {
  const { authError, navigateToLogin } = useAuth();

  // ✅ moved INSIDE function
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/code" element={<CodeLab />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App;