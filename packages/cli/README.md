@daas/cli
=========

A CLI for DaaS

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@daas/cli.svg)](https://npmjs.org/package/@daas/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@daas/cli.svg)](https://npmjs.org/package/@daas/cli)
[![License](https://img.shields.io/npm/l/@daas/cli.svg)](https://github.com/kesne/daas/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @daas/cli
$ daas COMMAND
running command...
$ daas (-v|--version|version)
@daas/cli/0.0.0 darwin-x64 node-v12.14.1
$ daas --help [COMMAND]
USAGE
  $ daas COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`daas help [COMMAND]`](#daas-help-command)
* [`daas login`](#daas-login)
* [`daas logout`](#daas-logout)
* [`daas set KEY [VALUE]`](#daas-set-key-value)

## `daas help [COMMAND]`

display help for daas

```
USAGE
  $ daas help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `daas login`

login to your DaaS account

```
USAGE
  $ daas login

OPTIONS
  --force  If the user is already signed in, force a new login.

EXAMPLE
  $ daas login
```

_See code: [src/commands/login.ts](https://github.com/kesne/daas/blob/v0.0.0/src/commands/login.ts)_

## `daas logout`

logout of your DaaS account

```
USAGE
  $ daas logout

EXAMPLE
  $ daas logout
```

_See code: [src/commands/logout.ts](https://github.com/kesne/daas/blob/v0.0.0/src/commands/logout.ts)_

## `daas set KEY [VALUE]`

```
USAGE
  $ daas set KEY [VALUE]

ARGUMENTS
  KEY    (apiKey) The configuration key that you wish to set.
  VALUE  The value you wish to set the configuration to. If not provided, we will delete the configuration.
```

_See code: [src/commands/set.ts](https://github.com/kesne/daas/blob/v0.0.0/src/commands/set.ts)_
<!-- commandsstop -->
