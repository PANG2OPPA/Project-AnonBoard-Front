import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyles';
import SigninPage from './pages/userPage/SigninPage';

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<SigninPage />} />
      </Routes>
    </Router>
  );
};

export default App;
