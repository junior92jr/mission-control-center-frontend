import http from "../http-common";

class ApplicationDataService {
  getAll() {
    return http.get(`applications/`);
  }

  create(data) {
    return http.post(`applications/`, data);
  }

}

export default new ApplicationDataService();