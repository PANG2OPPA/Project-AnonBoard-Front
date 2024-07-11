import React from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  background-color: #f0f2f5;
  height: 100vh;
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
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border: 1px solid #ccc;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: #333;
`;

const BoardListPage = () => {
  const boardData = [
    { id: 1, title: '첫 번째 게시글', date: '2023-07-10' },
    { id: 2, title: '두 번째 게시글', date: '2023-07-11' },
    { id: 3, title: '세 번째 게시글', date: '2023-07-12' },
    // 게시글 데이터 추가
  ];

  return (
    <Layout >
      <Title>게시판</Title>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>날짜</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {boardData.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.date}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export default BoardListPage;
