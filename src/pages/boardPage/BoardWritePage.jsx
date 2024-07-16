import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import AxiosApi from '../../api/Axios';
import { useNavigate, useParams } from 'react-router-dom';

const WriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
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

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
  font-weight: bold;
`;

const WritePage = () => {
  const { boardId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (boardId) {
      setIsEdit(true);
      // 게시글 데이터를 로드하여 초기값으로 설정
      const fetchPostData = async () => {
        try {
          const response = await AxiosApi.getPostById(boardId);
          setTitle(response.title);
          setContent(response.content);
        } catch (error) {
          console.error('게시글을 불러오는 데 실패했습니다:', error);
        }
      };
      fetchPostData();
    }
  }, [boardId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    try {
      if (isEdit) {
        await AxiosApi.updatePost(boardId, title, userId, content);
        alert('게시글이 성공적으로 수정되었습니다.');
      } else {
        await AxiosApi.writeBoard(title, userId, content);
        alert('게시글이 성공적으로 작성되었습니다.');
      }
      navigate('/boardlist');
    } catch (error) {
      console.error('게시글 처리 중 오류가 발생했습니다:', error);
      alert('게시글 처리 중 오류가 발생했습니다.');
    }
  };

  const handleCancel = () => {
    navigate('/boardlist');
  };

  return (
    <Layout>
      <Title>{isEdit ? '게시글 수정' : '게시글 작성'}</Title>
      <WriteContainer>
        <WriteForm onSubmit={handleSubmit}>
          <TitleInput
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <ContentTextarea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <SubmitButton type="submit">{isEdit ? '수정하기' : '작성하기'}</SubmitButton>
          <CancelButton type="button" onClick={handleCancel}>취소</CancelButton>
        </WriteForm>
      </WriteContainer>
    </Layout>
  );
};

export default WritePage;
