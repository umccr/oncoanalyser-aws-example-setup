import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Oncoanalyser, OncoanalyserProps } from "oncoanalyser-aws";

export class OncoanalyserDeployStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    stackProps: cdk.StackProps,
    oncoProps: OncoanalyserProps,
  ) {
    // note we separate out stack props from onco props - just to stop them potentially
    // clashing with each other
    super(scope, id, stackProps);

    const onco = new Oncoanalyser(this, "Onco", oncoProps);
  }
}
