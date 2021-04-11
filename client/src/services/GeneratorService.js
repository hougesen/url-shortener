import axios from "axios";

class GeneratorService {
  static generateLink(link, userId = null) {
    const url = "api/generator/newLink";
    return axios
      .post(url, { link, userId })
      .then((response) => response.data)
      .catch((err) => {
        console.log(err.response.data);
        return err.response.data;
      });
  }
}

export default GeneratorService;
