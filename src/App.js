import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyles';
import SigninPage from './pages/userPage/SigninPage';
import SignupPage from './pages/userPage/SignupPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './util/PrivateRoute';
import BoardListPage from './pages/boardPage/BoardListPage';
import WritePage from './pages/boardPage/BoardWritePage';
import BoardDetailPage from './pages/boardPage/BoardDetailPage';
import MyPage from './pages/userPage/MyPage'; // MyPage 컴포넌트 import

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/boardlist" element={<PrivateRoute element={<BoardListPage />} />} />
          <Route path="/write" element={<PrivateRoute element={<WritePage />} />} />
          <Route path="/board/detail/:boardId" element={<PrivateRoute element={<BoardDetailPage />} />} />
          <Route path="/board/modify/:boardId" element={<PrivateRoute element={<WritePage />} />} />
          <Route path="/mypage" element={<PrivateRoute element={<MyPage />} />} /> {/* 마이페이지 경로 추가 */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
