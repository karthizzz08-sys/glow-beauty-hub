import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster as Sonner } from './components/ui/sonner';
import { Toaster } from './components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';

// Pages
import HomePage from './pages/Home';
import AuthRegister from './pages/AuthRegister';
import AuthLogin from './pages/AuthLogin';
import OTPVerification from './pages/OTPVerification';
import BrowseMatrimony from './pages/BrowseMatrimony';
import SangamDirectory from './pages/SangamDirectory';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              {/* Home */}
              <Route path="/" element={<HomePage />} />

              {/* Authentication */}
              <Route path="/register" element={<AuthRegister />} />
              <Route path="/login" element={<AuthLogin />} />
              <Route path="/verify-otp" element={<OTPVerification />} />

              {/* Matrimony */}
              <Route path="/browse" element={<BrowseMatrimony />} />
              <Route path="/matrimony" element={<BrowseMatrimony />} />
              <Route path="/matrimony/search" element={<BrowseMatrimony />} />

              {/* Sangam Directory */}
              <Route path="/sangam-directory" element={<SangamDirectory />} />
              <Route path="/sangam-directory/search" element={<SangamDirectory />} />

              {/* Admin */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
