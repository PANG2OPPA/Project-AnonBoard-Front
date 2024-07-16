import axios from "axios";
const ANON_HOST = "http://localhost:8111";

const AxiosApi = {
  //로그인
  signin: async (id, pw) => {
    const signin = {
      userId: id,
      password: pw,
    };
    return await axios.post(ANON_HOST + "/user/signin", signin);
  },

  //회원가입
  signup: async (id, pw, name, tel) => {
    const signup = {
      userId: id,
      password: pw,
      name: name,
      tel: tel,
    };
    return await axios.post(ANON_HOST + `/user/signup`, signup);
  },

  //아이디 중복 확인
  checkUserId: async (userId) => {
    return await axios.get(ANON_HOST + `/user/exists/${userId}`);
  },

  //게시판 페이지네이션
  boardListByPage: async (page, size) => {
      const response = await axios.get(`${ANON_HOST}/board/list/page?page=${page}&size=${size}`);
      console.log('Response data:', response.data);
      return response.data;
  },

  //전체 게시판 페이지 수 
  getTotalPages: async (size) => {
      const response = await axios.get(`${ANON_HOST}/board/list/pages?size=${size}`);
      return response.data;
  },

  // 게시글 작성
  writeBoard: async (title, user, content) => {
    const writeBoard = {
      title: title,
      user: user,
      content: content,
    };
    return await axios.post(ANON_HOST + "/board/write", writeBoard);
  },

  // 게시글 불러오기 
  getPostById: async (boardId) => {
    const response = await axios.get(`${ANON_HOST}/board/detail/${boardId}`);
    return response.data;
  },

  // 게시글 삭제
  deletePostById: async (boardId) => {
    return await axios.delete(`${ANON_HOST}/board/delete/${boardId}`);
  },

  // 게시글 수정
  updatePost: async (boardId, title, userId, content) => {
    const updatePost = {
      title: title,
      user: userId,
      content: content,
    };
    return await axios.put(`${ANON_HOST}/board/modify/${boardId}`, updatePost);
  },

  // 댓글 불러오기
  getCommentsByPostId: async (boardId) => {
    const response = await axios.get(`${ANON_HOST}/comment/list/${boardId}`);
    return response.data;
  },


  // 댓글 작성
  addComment: async (boardId, userId, content) => {
    const newComment = {
      content: content,
      user: userId,
    };
    return await axios.post(`${ANON_HOST}/comment/write/${boardId}`, newComment);
  },

  // 내 게시글 불러오기
  getUserPosts: async (userId) => {
    return await axios.get(`${ANON_HOST}/board/list/${userId}`);
  },

  // 회원 탈퇴
  deleteUser: async (userId) => {
    return await axios.delete(`${ANON_HOST}/user/delete/${userId}`);
  },
};

export default AxiosApi;
