import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  cursor: pointer;
`;

const Title = styled.div`
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
  text-align: center;
  font-weight: bold; /* 글자 두께를 굵게 설정 */
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  transition: border-color 0.3s;
  margin-bottom: 1.5rem; /* 각 입력 필드 사이에 간격 추가 */

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const CheckButton = styled.button`
  margin-left: 0.5rem;
  padding: 0.87rem;
  font-size: 0.7rem;
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${(props) => (props.isValid ? 'green' : 'red')};
  font-size: 0.68rem;
  margin-top: -1rem;
  margin-bottom: 1rem;
`;

const SignupPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [isUserIdAvailable, setIsUserIdAvailable] = useState(false);
  const [checked, setChecked] = useState(false);
  const [idEffect, setIdEffect] = useState('');
  const [pwdEffect, setPwdEffect] = useState('');
  const [isIdValid, setIsIdValid] = useState(false);
  const [isPwdValid, setIsPwdValid] = useState(false);
  const navigate = useNavigate();

  const checkUserId = async () => {
    if (!userId) {
      alert('아이디를 입력해주세요.');
      return;
    }
    try {
      const response = await AxiosApi.checkUserId(userId);
      setIsUserIdAvailable(response.data);
      setChecked(true);
      if (response.data) {
        alert('사용 가능한 아이디입니다.');
      } else {
        alert('이미 사용 중인 아이디입니다.');
      }
    } catch (error) {
      console.error('아이디 확인 실패:', error.response ? error.response.data : error.message);
      alert('아이디 확인에 실패했습니다.');
    }
  };

  // 유효성 검사 (아이디: 영문과 숫자를 포함한 6~14자, 비밀번호: 영문, 숫자, 특수문자 포함 10~16자)
  const idEffectiveness = (userId) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.{6,14}$)/;
    return regex.test(userId);
  };

  const pwdEffectiveness = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.{10,16}$)/;
    return regex.test(password);
  };

  const filterKorean = (input) => {
    const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
    return input.replace(regex, '');
  };

  const userIdChange = (e) => {
    const newUserId = filterKorean(e.target.value);
    setUserId(newUserId);
    if (!idEffectiveness(newUserId)) {
      setIdEffect('아이디는 영문과 숫자를 포함하여 6~14자리여야 합니다.');
      setIsIdValid(false);
    } else {
      setIdEffect('올바른 형식입니다.');
      setIsIdValid(true);
    }
  };

  const passwordChange = (e) => {
    const newPassword = filterKorean(e.target.value);
    setPassword(newPassword);
    if (!pwdEffectiveness(newPassword)) {
      setPwdEffect('비밀번호는 영문, 특수문자를 포함하여 10~16자리여야 합니다.');
      setIsPwdValid(false);
    } else {
      setPwdEffect('올바른 형식입니다.');
      setIsPwdValid(true);
    }
  };

  const telChange = (e) => {
    const newTel = e.target.value;
    if (/^\d*$/.test(newTel)) { // 숫자만 입력받도록 제약
      setTel(newTel);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checked) {
      alert('아이디 중복 확인을 해주세요.');
      return;
    }
    if (!isIdValid || !isPwdValid) { 
      alert('아이디와 비밀번호를 형식에 맞게 입력해주세요.');
      return;
    }
    try {
      const response = await AxiosApi.signup( userId, password, name, tel );
      console.log('회원가입 성공:', response.data);
      alert('회원가입에 성공했습니다.');
      navigate('/');
    } catch (error) {
      console.error('회원가입 실패:', error.response ? error.response.data : error.message);
      console.warn(`아이디 : ${userId} 비밀번호 : ${password} 이름 : ${name} 전화번호 : ${tel}`)
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logo src={logo} onClick={() => navigate('/')} alt="AnonBoard 로고" />
        <Title>회원가입</Title>
        <InputGroup>
          <Input
            type="text"
            placeholder="아이디"
            value={userId}
            style={{ marginBottom: '0px' }}
            onChange={(e) => {
              userIdChange(e);
              setIsUserIdAvailable(false); // 아이디가 변경되면 중복 확인 상태 초기화
            }}
            required
          />
          <CheckButton type="button" onClick={checkUserId}>
            중복확인
          </CheckButton>
        </InputGroup>
        <div style={{ height: '5px' }}>
          {idEffect && <ErrorMessage isValid={isIdValid}>{idEffect}</ErrorMessage>}
        </div>
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => {
            passwordChange(e);
          }}
          required
        />
        <div style={{ height: '5px' }}>
          {pwdEffect && <ErrorMessage isValid={isPwdValid}>{pwdEffect}</ErrorMessage>}
        </div>
        <Input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="tel"
          placeholder="전화번호"
          value={tel}
          onChange={(e) => telChange(e)}
          required
        />
        <Button type="submit" disabled={!checked || !isUserIdAvailable}>
          회원가입
        </Button>
      </Form>
    </Container>
  );
};

export default SignupPage;
