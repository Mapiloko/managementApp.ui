import axios from "axios";

const API_URL = "https://auth.mphalane.co.ls/";
class AuthService {
//   login(user) {
//     return axios.post(API_URL + "auth/jwt/create/", {
//         email: user.email,
//         password: user.password,
//       })
//       .then((response) => {
//         if (response.data.access) {
//           localStorage.setItem("user",response.data.access);
//         }
//         return response.data;
//       });
//   }
  logout() {
    sessionStorage.removeItem("Token");
  }
}
export default new AuthService();
