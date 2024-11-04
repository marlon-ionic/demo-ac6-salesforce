import { Salesforce } from './salesforce.provider';

describe('Salesforce', () => {
  it('should create an instance', () => {
    expect(new Salesforce()).toBeTruthy();
  });
});
