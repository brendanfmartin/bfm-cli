const fs = require('fs');
const h = require('../config/http');
const { parseErrors } = require('../helpers/https');

exports.command = 'kms [args]';
exports.desc = 'KMS encrypt the info';
exports.builder = {
  data: {
    alias: 'd',
    description: 'raw data to encrypt. useful for short strings. overrides --file',
    type: 'string',
    optional: true
  },
  file: {
    alias: 'f',
    description: 'file with data to encrypt.',
    type: 'string',
    optional: true
  }
};
exports.handler = async (argv) => {
  const url = h.url[argv.environment];
  let data;

  try {
    if (argv.data) {
      data = argv.data;
    } else if (argv.file) {
      data = await fs.readFileSync(argv.file);
    } else {
      console.error('no data to encrypt. use --file (-f) or --data (-d)');
      process.exit(-1);
    }
  } catch (e) {
    console.error(e);
    process.exit(-1);
  }

  try {
    const t = await argv.axiosClient.post(`${url}/tools/aws/kms/encrypt`, data);
    console.log(t.data);
    process.exit(0);
  } catch (e) {
    parseErrors(e);
  }
};
