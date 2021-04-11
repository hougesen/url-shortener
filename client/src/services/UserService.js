import axios from "axios";

class UserService {
  static createNewUser(email, password) {
    const url = "api/account/newUser";
    return axios
      .post(url, {
        email,
        password,
      })
      .then((response) => response.data)
      .catch((err) => {
        console.log(err.response.data);
        return err.response.data;
      });
  }
  static loginToUser(email, password) {
    const url = "api/account/login";
    return axios
      .post(url, {
        email,
        password,
      })
      .then((response) => response.data)
      .catch((err) => {
        console.log(err.response.data);
        return err.response.data;
      });
  }
  static getLinks(userId) {
    const url = `api/account/allLinks/${userId}`;
    return axios
      .get(url)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err.response.data);
        return err.response.data;
      });
  }
}

export default UserService;
