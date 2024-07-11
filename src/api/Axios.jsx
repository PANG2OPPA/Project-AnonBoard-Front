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
  }
};

export default AxiosApi;
