import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../icon/Logo.png';
import AxiosApi from '../../api/Axios';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Logo = styled.img`
  width: 150px;
  margin: 0 auto 2rem auto;
  cursor: pointer;
`;

const Title = styled.div`
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
  text-align: center;
  font-weight: bold; /* 글자 두께를 굵게 설정 */
`;

const Input = styled.input`
  margin-bottom: 1.2rem;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: ${(props) => (props.isValid ? 'green' : 'red')};
  font-size: 0.68rem;
  margin-top: -1rem;
  margin-bottom: 1rem;
`;

const SignupLink = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #007bff;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #002347;
  }
`;

const SigninPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [pwdEffect, setPwdEffect] = useState('');
  const [idEffect, setIdEffect] = useState('');
  const [isIdValid, setIsIdValid] = useState(false);
  const [isPwdValid, setIsPwdValid] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // useAuth를 통해 login 함수 가져오기

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      navigate('/boardlist');
    }
  }, [navigate]);

  // 유효성 검사 (영문, 숫자, 특수기호 포함 10~16자)
  const pwdEffectiveness = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.{10,16}$)/;
    return regex.test(password);
  };

  const idEffectiveness = (userId) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.{6,14}$)/;
    return regex.test(userId);
  };

  const passwordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (!pwdEffectiveness(newPassword)) {
      setPwdEffect('비밀번호는 영문, 특수문자를 포함하여 10~16자리여야 합니다.');
      setIsPwdValid(false);
    } else {
      setPwdEffect('올바른 형식입니다.');
      setIsPwdValid(true);
    }
  };

  const userIdChange = (e) => {
    const newUserId = e.target.value;
    setUserId(newUserId);
    if (!idEffectiveness(newUserId)) {
      setIdEffect('아이디는 영문과 숫자를 포함하여 6~14자리여야 합니다.');
      setIsIdValid(false);
    } else {
      setIdEffect('올바른 형식입니다.');
      setIsIdValid(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isIdValid || !isPwdValid) {
      alert('아이디와 비밀번호를 형식에 맞게 입력해주세요.');
      return;
    }
    try {
      const response = await AxiosApi.signin(userId, password);
      console.log('로그인 성공:', response.data);
      localStorage.setItem('userId', userId);
      alert(`${userId}님 환영합니다.`);
      login(userId);
      navigate('/boardlist');
    } catch (error) {
      console.error('로그인 실패:', error.response ? error.response.data : error.message);
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logo src={logo} onClick={() => navigate('/')} alt="AnonBoard 로고" />
        <Title>로그인</Title>
        <Input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={userIdChange}
          required
        />
        <div style={{ height: '5px' }}>
          {idEffect && <ErrorMessage isValid={isIdValid}>{idEffect}</ErrorMessage>}
        </div>
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={passwordChange}
          required
        />
        <div style={{ height: '20px' }}>
          {pwdEffect && <ErrorMessage isValid={isPwdValid}>{pwdEffect}</ErrorMessage>}
        </div>
        <Button type="submit">로그인</Button>
        <SignupLink onClick={() => navigate('/signup')}>회원가입</SignupLink>
      </Form>
    </Container>
  );
};

export default SigninPage;
