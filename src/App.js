import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyles';
import SigninPage from './pages/userPage/SigninPage';
import SignupPage from './pages/userPage/SignupPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './util/PrivateRoute';
import BoardListPage from './pages/boardPage/BoardListPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/boardlist" element={<PrivateRoute element={<BoardListPage />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
