# bfm-cli

A node based tool for calling api gateway iam auth protected routes. Built on `yargs` this project will forward the users AWS credentials on each request to the API Gateway to validate and log via IAM Auth.

[yargs Documentation](https://yargs.js.org/docs/)

## Usage

### Installing

Download the source and create an executable.

```
git clone git@github.com:brendanfmartin/bfm-cli.git
npm i
npm run package
#  cp bfm-cli /usr/local/bin
bfm-cli --help
```

### Invoking

1. Run binary to verify
1. Run a sample

Use `help` to see all the commands.
```
bfm-cli --help
```

## Project Structure

```
// todo - flesh out 
```

```
|-- commands/
|-- config/
|-- eslint.js
|-- eslint.json
|-- .gitignore
|-- .huskyrc
|-- .lintstagedrc
|-- index.js
|-- package.json
|-- package-lock.json
|-- README.md
```

## Updating 

- Determine call path
- Build new command structure
- Add functionality
- Release

### Determine call path

Determine the command desired to be run. The commands should start generic and become more specific. They should start with the service name, then what is being done, and then the verb.

**Good Example:**
```
bfm-cli config external get --clientId banana
```

**Bad Example:**
```
bfm-cli get-external-config --clientId banana
```

### Build new command structure

Build out the directory structure to match the commands. In our example there needs to be the following structure.

```
|-- config.js
|-- config_cmds/
   |-- external.js
   |-- external_cmds/
       |-- get.js
```

The upper `.js` files will point to a directory and pass the information along to the next file.
See the documenation for more information on how commands and command directorys work

[Official Yargs Doc commandDir](https://yargs.js.org/docs/#api-reference-commanddirdirectory-opts)

Running the command locally can be done invoking node on the index.js. `node index.js` mimics the built command `bfm-cli`.

```
node index.js config external get --help
node index.js config external get --clientId banana
```

### Add functionality

If adding a new top level command; add new `command.js` and `command_cmds/` directory

`command.js` points to the `command_cmds/` directory where the new commands will live.
```
exports.command = 'toplevelcommand <command>';
exports.desc = 'toplevelcommand related tooling';
exports.builder = (yargs) => yargs.commandDir('commands_cmds');
exports.handler = (argv) => argv;
```


axios is passed along to subcommands. It yargs middleware attaches an axios client to the `argv.axiosClient` object.

The base urls are in `common/http.js`.

### Release

Previously you needed to include new commands in the index.js--this is no longer required.

At the time of writing; releasing is a manual process. Create a PR to update master. Once the PR is merged the team must be notified to update their local git repo and run the **Installing** steps.
