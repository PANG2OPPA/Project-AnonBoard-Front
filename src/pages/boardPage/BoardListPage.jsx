import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import AxiosApi from '../../api/Axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 85vh;
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background: white;
`;

const TableHeader = styled.thead`
  background-color: #007bff;
  color: white;
`;

const TableRow = styled.tr`
  cursor: pointer; /* 행에 커서 포인터 추가 */
`;

const TableCell = styled.td`
  padding: .5rem;
  text-align: center;
  border-bottom: 1px solid lightgray;
  font-size: 12px;

  ${({ type }) => type === 'number' && `
    width: 10%;
  `}
  ${({ type }) => type === 'author' && `
    width: 20%;
  `}
  ${({ type }) => type === 'title' && `
    width: 50%;
  `}
  ${({ type }) => type === 'date' && `
    width: 20%;
  `}
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
  text-align: center;
  font-weight: bold; /* 글자 두께를 굵게 설정 */
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px auto;
`;

const PageButton = styled.button`
  border: 1px solid #2d2d2d;
  padding: 5px;
  width: 28px;
  margin: 0 5px;
  background-color: #fff;
  cursor: pointer;
  border-radius: 50%;
  transition: 0.3s;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }

  ${({ active }) =>
    active &&
    `
    background-color: #007bff;
    color: #fff;
  `}
`;

const WriteButton = styled.button`
  padding: .7rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  const formattedDate = new Date(dateString).toLocaleDateString('ko-KR', options);
  return formattedDate.replace(/\./g, '.');
};

const BoardListPage = () => {
  const [boardData, setBoardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const total = await AxiosApi.getTotalPages(20);
        setTotalPages(total);
      } catch (error) {
        console.error('전체 페이지 수를 불러오는 데 실패했습니다.', error);
      }
    };

    fetchTotalPages();
  }, []);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await AxiosApi.boardListByPage(currentPage, 20);
        setBoardData(response || []);
        setLoading(false);
      } catch (error) {
        console.error('게시판 데이터를 불러오는 데 실패했습니다.', error);
        setLoading(false);
      }
    };

    fetchBoardData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLoading(true);
  };

  const handleRowClick = (id) => {
    navigate(`/board/detail/${id}`);
  };

  if (loading) {
    return (
      <Layout>
        <Container>
          <Title>게시판</Title>
          <p>Loading...</p>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <Title>게시판</Title>
        
        {boardData.length === 0 ? (
          <p>게시글이 없습니다. 게시글을 올려 사람들과 소통해보세요!</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell type="number">번호</TableCell>
                <TableCell type="author">작성자</TableCell>
                <TableCell type="title">제목</TableCell>
                <TableCell type="date">날짜</TableCell>
              </TableRow>
            </TableHeader>
            <tbody>
              {boardData.map((post) => (
                <TableRow key={post.id} onClick={() => handleRowClick(post.id)}>
                  <TableCell type="number">{post.id}</TableCell>
                  <TableCell type="author">{`익명${post.id}`}</TableCell>
                  <TableCell type="title">{post.title}</TableCell>
                  <TableCell type="date">{formatDate(post.regDate)}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}

        <div style={{ width:'80%', display:'flex', justifyContent:'end', marginRight:'1.5rem'}}>
          <WriteButton onClick={() => navigate('/write')}>글쓰기</WriteButton>
        </div>
        
        <PaginationContainer>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageButton
              key={index}
              active={index === currentPage}
              onClick={() => handlePageChange(index)}
            >
              {index + 1}
            </PageButton>
          ))}
        </PaginationContainer>
        
      </Container>
    </Layout>
  );
};

export default BoardListPage;
