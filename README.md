# Serverless Typescript

Typescript definitions for Serverless serverless.ts service file. | AWS, Google, Azure

### Packages

- `aws`: Scoped package named `@hashaio/aws-lambda-typescript`, implements typescript definitions for Serverless AWS Lambda.
- `azure`: Scoped package named `@hashaio/azure-functions-typescript`, implements typescript definitions for Serverless Azure Functions
- `google`: Scoped package named `@hashaio/google-functions-typescript`, implements typescript definitions for Serverless Google Cloud Functions
- `serverless-schema-plugin`: Compile serverless json schema to typescript typings
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)

Each package is 100% [TypeScript](https://www.typescriptlang.org/).

## Installation
```
npm i @hashaio/google-functions-typescript --save-dev
```
or
```
yarn add @hashaio/google-functions-typescript --dev
```
or
```
pnpm install @hashaio/google-functions-typescript --dev
```

## Usage
serverless.ts file

```
import type { Google } from '@hashaio/google-functions-typescript';

const serverlessConfiguration: Google = {
  service: 'google-nodejs-typescript',
  frameworkVersion: '*',
  provider: {
    name: 'google',
    runtime: 'nodejs16',
  },
  functions: {
    hello: {
      handler: 'handler.hello',
      events: [
        {
          http: {
            method: 'get',
            path: 'hello',
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
```

## Contributing

### Build

This repository is used in the `npx create-turbo@latest` command, and selected when choosing which package manager you wish to use with your monorepo (pnpm).

To build all apps and packages, run the following command:

```
pnpm run build
```

> **No PR including modifications on `index.d.ts` will be accepted.** The service file Typescript definitions enclosed within this file are automatically generated at each new Serverless framework release. If any manual modification was added to this file, those would be overwritten during the next Serverless version release and TypeScript definitions generation process.

We love our contributors!

Check out our [help wanted](https://github.com/hashaio/serverless-typescript/labels/help%20wanted) or [good first issue](https://github.com/hashaio/serverless-typescript/labels/good%20first%20issue) labels to find issues we want to move forward on with your help.
