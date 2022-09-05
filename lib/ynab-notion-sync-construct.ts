import { Stack, StackProps, aws_lambda as lambda } from 'aws-cdk-lib';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class YnabNotionSyncStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const apiHandler = new NodejsFunction(this, 'hello-world', {
      runtime: lambda.Runtime.NODEJS_16_X,
      bundling: {
        minify: true,
        sourceMap: true
      }
    });

    apiHandler.role?.addToPrincipalPolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['ssm:GetParameter'],
      resources: [Stack.of(this).formatArn({
        service: 'ssm',
        resource: 'parameter/ynabPersonalAccessToken'
      })]
    }))
  }
}
