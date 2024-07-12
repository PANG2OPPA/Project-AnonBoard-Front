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

  getTotalPages: async (size) => {
      const response = await axios.get(`${ANON_HOST}/board/list/pages?size=${size}`);
      return response.data;
  }
};

export default AxiosApi;
