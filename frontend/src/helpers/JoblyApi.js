import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    try {
      paramsOrData._token = JSON.parse(localStorage.getItem("token"));
    } catch(e) {
      paramsOrData._token = null;
    }
    // console.debug("API Call:", endpoint, paramsOrData, verb);

    try {
      return (await axios({
        method: verb,
        url: `${BASE_URL}/${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData
      })).data
    }

    catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async login(data) {
    try {
      let res = await this.request('login', data, 'post');
      return res;
    }
    catch (err) {
      return err;
    }

  }

  static async signUp(data) {
    try {
      let res = await this.request('users', data, 'post');
      return res;
    }

    catch (err) {
      return err;
    }
  }

  static async getCurrentUser() {
    try {
      let res = await this.request(`users/self`); //token is added as part of request from localstorage
      return res.user;
    }
    catch (err) {
      return err;
    }
  }

  static async patchUser(data) {
    try {
      const { username, jobs, is_admin, ...patchData } = data;

      if(!patchData.photo_url) {
        delete patchData.photo_url;
      }

      let res = await this.request(`users/${username}`, patchData, 'patch');

      return res.user;
    }

    catch (err) {
      return err;
    }
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  static async getJobs(data) {
    let res = await this.request(`jobs`, data);
    return res.jobs;
  }

  static async getCompanies(data) {
    let res = await this.request(`companies`, data);
    return res.companies;
  }

  static async addJob(data) {
    let res = await this.request('jobs', data, 'post');
    return res.job;
  }

  static async addCompany(data) {
    let res = await this.request('companies', data, 'post');
    return res.company;
  }

  static async updateJob(data) {
    let res = await this.request('jobs', data, 'patch');
    return res.job;
  }

  static async updateCompany(data) {
    let res = await this.request('companies', data, 'patch');
    return res.company;
  }

  static async deleteJob(id) {
    let res = await this.request(`jobs/${id}`, {}, 'delete');
    return res.message;
  }

  static async deleteCompany(handle) {
    let res = await this.request(`companies/${handle}`, {}, 'delete');
    return res.message;
  }

  static async applyToJob({ id, state }) {
    let res = await this.request(`jobs/${id}/apply`, {state}, 'post');
    return res;
  }
}

export default JoblyApi;