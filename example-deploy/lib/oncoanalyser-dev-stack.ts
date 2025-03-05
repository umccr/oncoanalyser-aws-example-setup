import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Oncoanalyser } from "oncoanalyser-aws-dev-version";
import { InstanceClass, InstanceSize, InstanceType } from "aws-cdk-lib/aws-ec2";

export class OncoanalyserDevStack extends cdk.Stack {
  constructor(scope: Construct, id: string, stackProps: cdk.StackProps) {
    // note we separate out stack props from onco props - just to stop them potentially
    // clashing with each other
    super(scope, id, stackProps);

    new Oncoanalyser(this, "Onco", {
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
    });
  }
}
