const h = require('../../config/http');
const { parseErrors } = require('../../config/axios');

exports.command = 'purge [args]';
exports.desc = 'Purge at a queue';
exports.builder = {
  name: {
    alias: 'n',
    description: 'name of queue',
    type: 'string',
    demandOption: 'Missing queue name'
  }
};

/**
 * call DELETE endpoint to purge a queue that is whitelisted
 *
 * @param argv
 * @returns {Promise<void>}
 */
exports.handler = async (argv) => {
  const url = h.url[argv.environment];

  try {
    const t = await argv.axiosClient.delete(`${url}/tools/aws/sqs/purge/${argv.name}`);
    console.log('%j', t.data);
    process.exit(0);
  } catch (e) {
    parseErrors(e);
  }
};
