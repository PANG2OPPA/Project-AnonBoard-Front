import React from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';

const WriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const WriteForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  padding: 0.75rem;
  font-size: 1.25rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ContentTextarea = styled.textarea`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 1rem;
  transition: border-color 0.3s;
  height: 300px;
  resize: none;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  color: #333;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;

  &:hover {
    background-color: #e2e6ea;
  }
`; 

const WritePage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // 글쓰기 제출 로직
  };

  const handleCancel = () => {
    // 취소 로직
  };

  return (
    <Layout>
    <WriteContainer>
      <WriteForm onSubmit={handleSubmit}>
        <TitleInput type="text" placeholder="제목을 입력하세요" required />
        <ContentTextarea placeholder="내용을 입력하세요" required />
        <SubmitButton type="submit">작성하기</SubmitButton>
        <CancelButton type="button" onClick={handleCancel}>취소</CancelButton>
      </WriteForm>
    </WriteContainer>
    </Layout>
  );
};

export default WritePage;
