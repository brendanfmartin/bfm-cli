exports.command = 'sqs <command>';
exports.desc = 'SQS related tooling';
exports.builder = (yargs) => yargs.commandDir('sqs_cmds');
exports.handler = (argv) => argv;
