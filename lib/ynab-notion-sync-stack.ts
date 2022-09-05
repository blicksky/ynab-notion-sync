import * as path from 'path';
import { Stack, StackProps, aws_lambda as lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class YnabNotionSyncStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fn = new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join('src', 'hello-world')),
    });
  }
}
