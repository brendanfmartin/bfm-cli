const axios = require('axios');
const AWS = require('aws-sdk');
const { aws4Interceptor } = require('aws4-axios');

/**
 *
 * @param regions
 * @param env
 * @returns {AxiosInstance}
 */
exports.buildAWSHttpClient = (regions, env) => {
  const region = regions[env];
  const client = axios.create();
  const { credentials } = AWS.config;

  const interceptor = aws4Interceptor({
    region,
    service: 'execute-api',
  }, {
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    sessionToken: credentials.sessionToken,
  });

  client.interceptors.request.use(interceptor);
  return client;
};

/**
 *
 * @param e
 */
exports.parseErrors = (e) => {
  if (e.response) {
    const { data, status } = e.response;
    console.error({ data, status });
  } else if (e.code === 'ENOTFOUND') {
    console.error(`${e.code}. Are you on VPN?`);
  } else {
    console.error(e.code);
  }
};
