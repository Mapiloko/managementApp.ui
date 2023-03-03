class AuthService {
  logout() {
    sessionStorage.removeItem("User");
    sessionStorage.removeItem("allData");
  }
}
export default new AuthService();
