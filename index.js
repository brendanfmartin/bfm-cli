const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { regions } = require('./config/regions');

const { buildAWSHttpClient } = require('./config/axios');

yargs(hideBin(process.argv))
  .scriptName('bfm-cli')
  .usage('$0 <cmd> [args]')
  .commandDir('commands', { recursive: true })
  .help()
  .option('environment', {
    alias: 'e',
    type: 'string',
    description: 'targeted env for commands',
    default: 'dev',
  })
  .middleware(async (argv) => {
    // eslint-disable-next-line no-param-reassign
    argv.axiosClient = await buildAWSHttpClient(regions, argv.environment);
  })
  .parse();
