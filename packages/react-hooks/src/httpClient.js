import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

class HttpClient {
  constructor({ baseUrl, requestInterceptor }) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    };
    this.defaultTimeout = 10 * 1000;
    this.requestInterceptor = requestInterceptor || ((config) => config);
  }

  async get(url, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      this.defaultTimeout || options.timeout
    );
    const config = await this.requestInterceptor({
      headers: this.defaultHeaders,
      ...options,
      signal: controller.signal
    });
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'GET',
      headers: config.headers
    });

    clearTimeout(timeout);

    if (response.ok) {
      if (response.status !== 204) {
        return await response.json();
      }
    } else {
      throw new Error(await response.text());
    }
  }

  async post(url, data = null, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      this.defaultTimeout || options.timeout
    );
    const config = await this.requestInterceptor({
      headers: this.defaultHeaders,
      ...options,
      signal: controller.signal
    });
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: config.headers,
      body: data && JSON.stringify(data)
    });

    clearTimeout(timeout);

    if (response.ok) {
      if (response.status !== 204) {
        return await response.json();
      }
    } else {
      throw new Error(await response.text());
    }
  }

  async put(url, data, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      this.defaultTimeout || options.timeout
    );
    const config = await this.requestInterceptor({
      headers: this.defaultHeaders,
      ...options,
      signal: controller.signal
    });
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'PUT',
      headers: config.headers,
      body: data && JSON.stringify(data)
    });

    clearTimeout(timeout);

    if (response.ok) {
      if (response.status !== 204) {
        return await response.json();
      }
    } else {
      throw new Error(await response.text());
    }
  }

  async delete(url, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      this.defaultTimeout || options.timeout
    );
    const config = await this.requestInterceptor({
      headers: this.defaultHeaders,
      ...options,
      signal: controller.signal
    });
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'DELETE',
      headers: config.headers
    });

    clearTimeout(timeout);

    if (response.ok) {
      if (response.status !== 204) {
        return await response.json();
      }
    } else {
      throw new Error(await response.text());
    }
  }
}

const HttpClientContext = createContext(null);

const HttpClientProvider = ({ baseUrl, requestInterceptor, children }) => {
  const httpClient = new HttpClient({ baseUrl, requestInterceptor });

  return (
    <HttpClientContext.Provider value={{ httpClient }}>
      {children}
    </HttpClientContext.Provider>
  );
};

HttpClientProvider.propTypes = {
  baseUrl: PropTypes.string,
  requestInterceptor: PropTypes.func,
  children: PropTypes.node.isRequired
};

HttpClientProvider.defaultProps = {
  baseUrl: ''
};

const useHttpClient = () => useContext(HttpClientContext);

export { HttpClientProvider, HttpClient, useHttpClient };
