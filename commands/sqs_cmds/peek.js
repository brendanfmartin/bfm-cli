const h = require('../../config/http');
const { parseErrors } = require('../../config/axios');

exports.command = 'peek [args]';
exports.desc = 'Peek at a queue';
exports.builder = {
  name: {
    alias: 'n',
    description: 'name of queue',
    type: 'string',
    demandOption: 'Missing queue name'
  }
};

exports.handler = async (argv) => {
  const url = h.url[argv.environment];

  try {
    const t = await argv.axiosClient.get(`${url}/tools/aws/sqs/peek/${argv.name}`);
    console.log('%j', t.data);
    process.exit(0);
  } catch (e) {
    parseErrors(e)
  }

  return url;
};
