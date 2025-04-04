import cubejs, { CubeApi } from '@cubejs-client/core';

const CUBE_API_URL: string = 'YOUR_CUBEJS_API_URL'; // Replace with your Cube.js backend URL
const CUBE_API_TOKEN: string = 'YOUR_CUBEJS_API_TOKEN'; // Replace with your Cube.js API token

const cubejsApi: CubeApi = cubejs(CUBE_API_TOKEN, {
  apiUrl: `${CUBE_API_URL}/cubejs-api/v1`,
});

export default cubejsApi;
