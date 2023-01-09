import { Stack, aws_stepfunctions, aws_stepfunctions_tasks, StackProps, Aspects, aws_lambda } from 'aws-cdk-lib';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class SfnAspectsDemo extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaFunction = new aws_lambda.Function(this, 'Function', {
      code: Code.fromInline('fake'),
      handler: 'fake',
      runtime: Runtime.NODEJS,
    });

    const definition = new aws_stepfunctions_tasks.LambdaInvoke(this, 'LambdaInvoke', {
      lambdaFunction,
    });

    new aws_stepfunctions.StateMachine(this, 'StateMachine', {
      definition,
    });

    Aspects.of(this).add({
      visit(node) {
        if (node instanceof aws_stepfunctions_tasks.LambdaInvoke) {
          node.addRetry({
            errors: ['Lambda.ServiceException'],
            maxAttempts: 10,
          });
        }
      },
    });
  }
}