import axios from "axios";

class HttpClient {
  constructor({ baseUrl, ...options }) {
    const client = axios.create();

    client.defaults.baseURL = baseUrl;
    client.defaults.timeout = 20 * 1000;
    client.defaults.responseType = "json";
    client.defaults.headers.common["Content-Type"] =
      "application/json; charset=utf-8";

    // Enable this if needing to serialize arrays in query strings.
    // Note that there are difficulties with importing `qs` with webpack 5.
    // client.defaults.paramsSerializer = (params) => {
    //   return qs.stringify(params, { arrayFormat: 'repeat' });
    // };

    client.defaults = {
      ...client.defaults,
      ...options,
    };

    this.client = client;
  }

  // Axios options may be passed for `options`. See https://www.npmjs.com/package/axios#request-config.
  async request(method, url, data = null, options = {}) {
    const response = await this.client({ method, url, data, ...options });
    return response && response.data;
  }

  async get(url, options = {}) {
    return this.request("GET", url, {}, options);
  }

  async post(url, data = null, options = {}) {
    return this.request("POST", url, data, options);
  }

  async put(url, data, options = {}) {
    return this.request("PUT", url, data, options);
  }

  async delete(url, options = {}) {
    return this.request("DELETE", url, {}, options);
  }

  addRequestInterceptor(callback) {
    this.client.interceptors.request.use(callback);
  }
}

export default HttpClient;
