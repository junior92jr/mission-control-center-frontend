import http from "../http-common";

class ConfigurationDataService {
  getAll(application) {
    return http.get(`configurations/?application=${application}`);
  }

  get(id) {
    return http.get(`/configurations/${id}/`);
  }

  create(data) {
    return http.post(`configurations/`, data);
  }

  update(id, data) {
    return http.put(`/configurations/${id}/`, data);
  }

}

export default new ConfigurationDataService();