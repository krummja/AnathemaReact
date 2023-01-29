
export type ClientConfig = {
  apiBasePath: string,
};


const config: ClientConfig = {
  apiBasePath: process.env.REACT_APP_API_BASE_PATH || '',
};


export default config;
