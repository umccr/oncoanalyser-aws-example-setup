#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { OncoanalyserProdStack } from "../lib/oncoanalyser-prod-stack";
import { OncoanalyserDevStack } from "../lib/oncoanalyser-dev-stack";

const app = new cdk.App();

new OncoanalyserDevStack(app, "OncoanalyserDevStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'ap-southeast-2' },
});

new OncoanalyserProdStack(app, "OncoanalyserProdStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'ap-southeast-2' },
});
