import http from "../http-common";

class VersionDataService {
  getAll(configuration) {
    return http.get(`configurations/${configuration}/versions/`);
  }
}

export default new VersionDataService();