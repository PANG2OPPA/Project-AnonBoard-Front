import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../icon/Logo.png';
import AxiosApi from '../../api/Axios';

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
`;

const Title = styled.div`
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
  text-align: center;
  font-weight: bold; /* 글자 두께를 굵게 설정 */
`;

const Input = styled.input`
  margin-bottom: 1.5rem;
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
  color: red;
  font-size: 0.68rem;
  margin-top: -1rem;
  margin-bottom: 1rem;
`;


const SigninPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [pwdEffect, setPwdEffect] = useState('');

  // 유효성 검사 (영문, 숫자, 특수기호 포함 10~16자)
  const pwdEffectiveness = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.{10,16}$)/;
    return regex.test(password);
  };

  const passwordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (!pwdEffectiveness(newPassword)) {
      setPwdEffect('비밀번호는 영문, 특수문자를 포함하여 10~16자리여야 합니다.');
    } else {
      setPwdEffect('');
    }
  };

  const handleSubmit = async (e) => {
    try {
      const response = await AxiosApi.signin(userId, password);
      console.log('로그인 성공:', response.data);
    } catch (error) {
      console.error('로그인 실패:', error.response ? error.response.data : error.message);
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logo src={logo} alt="AnonBoard 로고" />
        <Title>로그인</Title>
        <Input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={passwordChange}
          required
        />
        <div style={{height:'20px'}}>
          {pwdEffect && <ErrorMessage>{pwdEffect}</ErrorMessage>}
        </div>
        <Button type="submit">로그인</Button>
      </Form>
    </Container>
  );
};

export default SigninPage;
