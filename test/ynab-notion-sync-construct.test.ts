import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as YnabNotionSyncConstruct from '../lib/ynab-notion-sync-construct';
import { default as getMajorVersion } from 'semver/functions/major';

test('lambda function runtime matches volta', () => {
    // given
    const app = new cdk.App();
    const { volta } = require('../package.json');
 
    // when
    const stack = new YnabNotionSyncConstruct.YnabNotionSyncStack(app, 'YnabNotionSyncStack');
    
    // then
    const template = Template.fromStack(stack);
    const voltaNodeMajorVersion = getMajorVersion(volta.node)

    template.hasResourceProperties('AWS::Lambda::Function', {
        Runtime: `nodejs${voltaNodeMajorVersion}.x`
    });
});
