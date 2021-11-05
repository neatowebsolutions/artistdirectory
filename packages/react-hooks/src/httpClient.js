import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import HttpClient from '@template/http-client';

const HttpClientContext = createContext(null);

const HttpClientProvider = ({ httpClient, children }) => (
  <HttpClientContext.Provider value={{ httpClient }}>
    {children}
  </HttpClientContext.Provider>
);

HttpClientProvider.propTypes = {
  httpClient: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

const useHttpClient = () => useContext(HttpClientContext);

export { HttpClientProvider, HttpClient, useHttpClient };
