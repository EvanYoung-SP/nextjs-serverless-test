// ERY: This was an attempt to build serverless from scratch using only AWS CLI and lambda-at-edge
// The building worked, but getting the environment setup was tricky.

const path = require('path');
const { Builder } = require("@sls-next/lambda-at-edge");

const nextConfigPath = '';
const outputDir = path.join(nextConfigPath, ".serverless_nextjs");

const builder = new Builder(
  nextConfigPath,
  outputDir,
  {
    cmd: './node_modules/.bin/next',
    cwd: process.cwd(),
    env: {},
    args: ['build'],
    minifyHandlers: true,
    // it is recommended to let your CF distribution do the compression as per the docs - https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html
    // however there have been issues in the past where CF doesn't compress lambda@edge responses, so we provide our own implementation in case is needed
    enableHTTPCompression: false
  }
);

builder.build()
    .then(() => {
      console.log("Application built successfully!");
    })
    .catch((e) => {
      console.log("Could not build app due the exception: ", e);
      process.exit(1);
    });
