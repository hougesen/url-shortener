import axios from "axios";

class RedirectorService {
  // Redirector
  static redirect(shortCode) {
    const url = `/api/redirector/${shortCode}`;
    return axios
      .get(url)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err.response.data);
        return err.response.data;
      });
  }
}

export default RedirectorService;
