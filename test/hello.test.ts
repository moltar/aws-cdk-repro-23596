import { App } from 'aws-cdk-lib';
import { SfnAspectsDemo } from '../src';


test('hello', () => {
  const app = new App();
  new SfnAspectsDemo(app, 'SfnAspectsDemo');
  const cloudAssembly = app.synth({});
  const { template } = cloudAssembly.getStackByName('SfnAspectsDemo');

  expect(template).toMatchSnapshot();
});