import { useEffect } from 'react';
import qs from 'querystringify';

const XMLHttpRequest = typeof window !== 'undefined' && window.XMLHttpRequest;
const originalFetch = typeof window !== 'undefined' && window.fetch;
const originalOpen = XMLHttpRequest?.prototype?.open;
const originalSend = XMLHttpRequest?.prototype?.send;

// Listeners must be module-level because XMLHttpRequest is global.
// Listeners are keyed by URL.
const listeners = {};

const formDataToJson = (formData) => {
  const object = {};

  formData.forEach((value, key) => {
    object[key] = value;
  });

  return object;
};

const dataToJson = (data) => {
  const isEmpty = !data;
  const isString = typeof data === 'string';
  const isObject = typeof data === 'object';
  const isFormData = data instanceof FormData;

  // References: https://stackoverflow.com/q/23959352/83897, https://stackoverflow.com/a/150078/83897
  const isQueryString =
    !isEmpty &&
    isString &&
    !!data.match(
      /^(\w+(=[\w.-]*)?(&\w+(=[\w.-]*[^\x00-\x7F]*)?)*)?$/ // eslint-disable-line no-control-regex
    );

  if (isEmpty) {
    return data;
  } else if (isFormData) {
    return JSON.stringify(formDataToJson(data));
  } else if (isQueryString) {
    return JSON.stringify(qs.parse(data));
  } else if (isObject) {
    return JSON.stringify(data);
  }

  // JSON string, plain text, or other format.
  return data;
};

// Intercept XML HTTP requests.
if (XMLHttpRequest) {
  XMLHttpRequest.prototype.open = function (method, url, ...params) {
    const request = this;

    // Intercept HTTP request responses, and call listeners.
    if (listeners[url]) {
      request.addEventListener('load', () => {
        listeners[url].forEach((current) => {
          const requestData = request.data;
          const responseData = request.responseText;

          current.call(current, requestData, responseData);
        });
      });
    }

    return originalOpen.apply(this, [method, url, ...params]);
  };

  XMLHttpRequest.prototype.send = function (data) {
    // Convert request data to JSON, and attach it to the request for downstream access.
    this.data = dataToJson(data);

    return originalSend.call(this, data);
  };
}

// Intercept fetch requests.
if (originalFetch) {
  window.fetch = async function (resource, config) {
    const url =
      typeof resource === 'object' ? resource?.url || resource : resource;
    const requestData = dataToJson(config?.body);
    const request = originalFetch.apply(this, [resource, config]);
    const response = await request;
    const clonedResponse = response.clone();
    const responseData = await clonedResponse.text();

    // Call listeners.
    if (listeners[url]) {
      listeners[url].forEach((current) => {
        current.call(current, requestData, responseData);
      });
    }

    return request;
  };
}

const useHttpRequestListener = (url, listener) => {
  useEffect(() => {
    if (!listener) {
      return;
    }

    listeners[url] = listeners[url] || [];
    listeners[url].push(listener);

    return () => {
      if (!listeners[url]) {
        return;
      }

      const index = listeners[url].findIndex((current) => current === listener);

      listeners[url] = [
        ...listeners[url].slice(0, index),
        ...listeners[url].slice(index + 1)
      ];
    };
  }, [url, listener]);
};

export default useHttpRequestListener;
