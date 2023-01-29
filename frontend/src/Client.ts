import config, { ClientConfig } from './config';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { InternalAxiosRequestConfig as AxiosConfig } from 'axios';


export default class FastAPIClient
{
  api: AxiosInstance;
  config: ClientConfig;

  constructor(overrides: ClientConfig)
  {
    // Combine ClientConfig with overrides.
    this.config = {
      ...config,
      ...overrides,
    }

    // Then set up the Axios client for communication with the backend.
    this.api = this.setupClient(config);
  }

  setupClient = (config: ClientConfig) => {
    const initialConfig = {
      baseURL: `${config.apiBasePath}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const client: AxiosInstance = axios.create(initialConfig);
    client.interceptors.request.use(localStorageTokenInterceptor);
    return client;
  }

  //! REMOVE - Test method to check Python API response.
  buttonPress = async () => {
    const result = {
      data: 0,
    }

    await this.api.get('/button').then(res => {
      result.data = res.data;
    });

    return result;
  }
}


function localStorageTokenInterceptor(config: AxiosConfig<any>): AxiosConfig<any>
{
  return config;
}
