import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

class HttpClient {
  constructor({ baseUrl, requestInterceptor }) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    };
    this.defaultTimeout = 10 * 1000;
    this.requestInterceptor = requestInterceptor;
  }

  async get(url, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      this.defaultTimeout || options.timeout
    );
    const config = this.requestInterceptor({
      ...this.defaultHeaders,
      ...options,
      signal: controller.signal
    });
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'GET',
      headers: config.headers
    });
    const responseValue = response.ok ? response.json() : response.text();

    clearTimeout(timeout);

    if (response.ok) {
      return responseValue;
    } else {
      throw new Error(responseValue);
    }
  }

  async post(url, data = null, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      this.defaultTimeout || options.timeout
    );
    const config = this.requestInterceptor({
      ...this.defaultHeaders,
      ...options,
      signal: controller.signal
    });
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: config.headers,
      body: data && JSON.stringify(data)
    });
    const responseValue = response.ok ? response.json() : response.text();

    clearTimeout(timeout);

    if (response.ok) {
      return responseValue;
    } else {
      throw new Error(responseValue);
    }
  }

  async put(url, data, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      this.defaultTimeout || options.timeout
    );
    const config = this.requestInterceptor({
      ...this.defaultHeaders,
      ...options,
      signal: controller.signal
    });
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'PUT',
      headers: config.headers,
      body: data && JSON.stringify(data)
    });
    const responseValue = response.ok ? response.json() : response.text();

    clearTimeout(timeout);

    if (response.ok) {
      return responseValue;
    } else {
      throw new Error(responseValue);
    }
  }

  async delete(url, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      this.defaultTimeout || options.timeout
    );
    const config = this.requestInterceptor({
      ...this.defaultHeaders,
      ...options,
      signal: controller.signal
    });
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'DELETE',
      headers: config.headers
    });
    const responseValue = response.ok ? response.json() : response.text();

    clearTimeout(timeout);

    if (response.ok) {
      return responseValue;
    } else {
      throw new Error(responseValue);
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
  baseUrl: '',
  requestInterceptor: () => {}
};

const useHttpClient = () => useContext(HttpClientContext);

export { HttpClientProvider, HttpClient, useHttpClient };
