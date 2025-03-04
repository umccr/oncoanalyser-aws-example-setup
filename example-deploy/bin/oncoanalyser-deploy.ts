#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { OncoanalyserDeployStack } from "../lib/oncoanalyser-deploy-stack";
import { InstanceClass, InstanceSize, InstanceType } from "aws-cdk-lib/aws-ec2";

const app = new cdk.App();

new OncoanalyserDeployStack(
  app,
  "OncoanalyserDevStack",
  {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },

    /* Uncomment the next line if you know exactly what Account and Region you
     * want to deploy the stack to. */
    // env: { account: '123456789012', region: 'ap-southeast-2' },
  },
  {
    // use the default VPC of the account
    vpc: undefined,
    // the precise version of Oncoanalyser to install
    gitRepo: "https://github.com/scwatts/oncoanalyser-aws-stack-testing",
    gitBranch: "aws-stack-testing",
    // the bucket used for in/out/reference
    bucket: {
      bucket: "umccr-temp-dev",
      inputPrefix: "inputs",
      outputPrefix: "outputs",
      refDataPrefix: "refdata",
    },
    // settings for the pipeline (head) nodes
    pipelineMaxCpus: 2,
    pipelineInstanceTypes: [
      InstanceType.of(InstanceClass.R6A, InstanceSize.LARGE),
    ],
    pipelineQueueName: "oncoanalyser-pipeline-dev",
    pipelineJobDefinitionName: "oncoanalyser-job-definition-dev",
    // settings for the task (worker) nodes
    taskMaxCpus: 4,
    taskInstanceTypes: [
      InstanceType.of(InstanceClass.R6I, InstanceSize.XLARGE),
    ],
  },
);

new OncoanalyserDeployStack(
    app,
    "OncoanalyserProdStack",
    {
        env: {
            account: process.env.CDK_DEFAULT_ACCOUNT,
            region: process.env.CDK_DEFAULT_REGION,
        },

        /* Uncomment the next line if you know exactly what Account and Region you
         * want to deploy the stack to. */
        // env: { account: '123456789012', region: 'ap-southeast-2' },
    },
    {
        // use the default VPC of the account
        vpc: undefined,
        // the precise version of Oncoanalyser to install
        gitRepo: "https://github.com/scwatts/oncoanalyser-aws-stack-testing",
        gitBranch: "aws-stack-testing",
        // the bucket used for in/out/reference
        bucket: {
            bucket: "umccr-temp-dev",
            inputPrefix: "inputs",
            outputPrefix: "outputs",
            refDataPrefix: "refdata",
        },
        // settings for the pipeline (head) nodes
        pipelineMaxCpus: 2,
        pipelineInstanceTypes: [
            InstanceType.of(InstanceClass.R6A, InstanceSize.LARGE),
        ],
        pipelineQueueName: "oncoanalyser-pipeline",
        pipelineJobDefinitionName: "oncoanalyser-job-definition",
        // settings for the task (worker) nodes
        taskMaxCpus: 4,
        taskInstanceTypes: [
            InstanceType.of(InstanceClass.R6I, InstanceSize.XLARGE),
        ],
    },
);
