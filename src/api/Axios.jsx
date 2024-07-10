import axios from "axios";
const ANON_HOST = "http://localhost:8111";

const AxiosApi = {
  //로그인
  signin: async (id, pw) => {
    const login = {
      userId: id,
      password: pw,
    };
    return await axios.post(ANON_HOST + "/user/signin", login);
  },
};

export default AxiosApi;
