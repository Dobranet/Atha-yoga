import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './styles.scoped.scss';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogInPage from './pages/logIn/index';
import WelcomePage from './pages/welcome/index';
import SignInDefaultPage from './pages/signInDefault';
import SignInConfirmPage from './pages/signInConfirm';
import ChangePasswordPage from './pages/changePassword';
import PasswordRecoveryPage from './pages/passwordRecovery';
import LogInBlockedPage from './pages/logInBlocked';
import ProfilePage from './pages/profile';
import ErrorPage from './pages/error/index.js'
import AuthProvider from './utils/providers/auth/index.jsx';
import BaseLayout from './layouts/index.jsx';
import ProfileLayout from './layouts/profile/index.jsx';
import useAuth from './utils/hooks/useAux/index.js';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D6EFD',
    },
    text: {
      primary: '#212121',
      secondary: '#616161',
    },
  },
  typography: {
    h4: {
      fontWeight: 500,
    },
    h1: {
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.25rem',
      lineHeight: 1.2,
    },
  },
});

function MyApp() {

  const auth = useAuth();
  const Layout = auth.isLoggedIn ? ProfileLayout : BaseLayout;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout auth={auth} />}>
          <Route index element={!auth.isLoggedIn ? <WelcomePage /> : <Navigate replace to="profile" />} />
          <Route path="login" element={<LogInPage />} />
          <Route path="register" element={<SignInDefaultPage />} />
          <Route path="profile" element={<ProfilePage auth={auth} />} />
          <Route path="recovery-password" element={<PasswordRecoveryPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default function Root() {
  return (
    <AuthProvider>
      <MyApp />
    </AuthProvider>
  );
}
