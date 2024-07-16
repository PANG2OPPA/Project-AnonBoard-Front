import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import AxiosApi from '../../api/Axios';
import { useNavigate, useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
`;

const DetailCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Author = styled.p`
  font-size: 1rem;
  color: #777;
  margin-bottom: 1rem;
`;

const Date = styled.p`
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 1rem;
`;

const Content = styled.div`
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const EditButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #dc3545;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c82333;
  }
`;

const CommentContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 600px;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CommentItem = styled.li`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommentAuthor = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 0.5rem;
`;

const CommentDate = styled.p`
  font-size: 0.8rem;
  color: #aaa;
  margin-bottom: 0.5rem;
`;

const CommentContent = styled.p`
  font-size: 1rem;
  color: #333;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const CommentTextarea = styled.textarea`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 1rem;
  transition: border-color 0.3s;
  height: 100px;
  resize: none;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const CommentButton = styled.button`
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

const BoardDetailPage = () => {
  const { boardId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // 사용자 ID 가져오기

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await AxiosApi.getPostById(boardId);
        setPost(response);
      } catch (error) {
        console.error('게시글을 불러오는 데 실패했습니다:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await AxiosApi.getCommentsByPostId(boardId);
        setComments(response || []);
      } catch (error) {
        console.error('댓글을 불러오는 데 실패했습니다:', error);
      }
    };

    fetchPost();
    fetchComments();
  }, [boardId]);

  const handleEdit = () => {
    navigate(`/board/modify/${boardId}`);
  };

  const handleDelete = async () => {
    try {
      await AxiosApi.deletePostById(boardId);
      alert('게시글이 성공적으로 삭제되었습니다.');
      navigate('/boardlist');
    } catch (error) {
      console.error('게시글 삭제 중 오류가 발생했습니다:', error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosApi.addComment(boardId, userId, newComment);
      setNewComment('');
      const updatedComments = await AxiosApi.getCommentsByPostId(boardId);
      setComments(updatedComments || []);
    } catch (error) {
      console.error('댓글 작성 중 오류가 발생했습니다:', error);
      alert('댓글 작성 중 오류가 발생했습니다.');
    }
  };

  if (!post) {
    return (
      <Layout>
        <DetailContainer>
          <p>Loading...</p>
        </DetailContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <DetailContainer>
        <DetailCard>
          <Title>{post.title}</Title>
          <Author>작성자: 익명{post.id}</Author>
          <Date>작성일: {format(parseISO(post.regDate), 'yyyy.MM.dd HH:mm:ss')}</Date>
          <Content>{post.content}</Content>
          {userId === post.user && (
            <ButtonContainer>
              <EditButton onClick={handleEdit}>수정</EditButton>
              <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
            </ButtonContainer>
          )}
        </DetailCard>
        
        <CommentContainer>
        <CommentForm onSubmit={handleCommentSubmit}>
            <CommentTextarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 작성하세요"
              required
            />
            <CommentButton type="submit">댓글 작성</CommentButton>
          </CommentForm>
          <h2 style={{marginBottom:'1rem'}}>댓글</h2>
          {comments.length === 0 ? (
            <p>댓글이 없습니다. 가장 먼저 반응을 남겨보세요!</p>
          ) : (
            <CommentList>
              {comments.map((comment) => (
                <CommentItem key={comment.id}>
                  <CommentAuthor>익명{comment.id}</CommentAuthor>
                  <CommentDate>{format(parseISO(comment.regDate), 'yyyy.MM.dd HH:mm:ss')}</CommentDate>
                  <CommentContent>{comment.content}</CommentContent>
                </CommentItem>
              ))}
            </CommentList>
          )}
          
        </CommentContainer>
      </DetailContainer>
    </Layout>
  );
};

export default BoardDetailPage;
