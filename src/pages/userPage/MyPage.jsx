import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import AxiosApi from '../../api/Axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
`;

const UserInfo = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const Section = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const PostDetails = styled.div`
  font-size: 0.8rem;
  color: #555;
  margin-top: 0.5rem;
`;

const DeleteButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  color: white;
  background-color: #dc3545;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;

  &:hover {
    background-color: #c82333;
  }
`;

const MyPage = () => {
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const postsResponse = await AxiosApi.getUserPosts(userId);
        setUserPosts(postsResponse.data);
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다:', error);
        setUserPosts([]); // 오류가 발생할 경우 빈 배열로 설정
      }
    };
    fetchUserData();
  }, [userId]);

  const handleDeleteAccount = async () => {
    try {
      await AxiosApi.deleteUser(userId);
      alert('회원 탈퇴가 완료되었습니다.');
      localStorage.removeItem('userId'); // 로컬스토리지에서 userId 제거
      navigate('/');
    } catch (error) {
      console.error('회원 탈퇴 중 오류가 발생했습니다:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    }
  };

  if (!userId) {
    return (
      <Layout>
        <MyPageContainer>
          <p>Loading...</p>
        </MyPageContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <MyPageContainer>
        <UserInfo>
          <Title>회원 정보</Title>
          <p>ID: {userId}</p>
          <DeleteButton onClick={handleDeleteAccount}>회원 탈퇴</DeleteButton>
        </UserInfo>
        <Section>
          <Title>내가 쓴 글</Title>
          <ItemList>
            {userPosts.length > 0 ? (
              userPosts.map(post => (
                <Item key={post.id} onClick={() => navigate(`/board/detail/${post.id}`)}>
                  <strong>{post.title}</strong>
                  <PostDetails>작성일: {format(new Date(post.regDate), 'yyyy.MM.dd HH:mm:ss')}</PostDetails>
                </Item>
              ))
            ) : (
              <p>게시글이 없습니다.</p>
            )}
          </ItemList>
        </Section>
      </MyPageContainer>
    </Layout>
  );
};

export default MyPage;
