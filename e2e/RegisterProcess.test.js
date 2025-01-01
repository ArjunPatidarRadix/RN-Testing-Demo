import {by, expect, element, waitFor, device} from 'detox';
describe('App Launch', () => {
  beforeAll(async () => {
    await device.launchApp();
    await waitFor(element(by.id('OnBoardingScreen')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.text('Next')).tap();
    await element(by.text('Next')).tap();
    await element(by.text('Sign up')).tap();
    await element(by.id('firstName')).typeText('Test');
    await element(by.id('lastName')).typeText('User');
    await element(by.id('email')).typeText('arjun@test.com');
    await element(by.id('password')).typeText('Test@123');
    await device.pressBack();
  });
  it('should display signup screen', async () => {
    await expect(element(by.id('RegisterScreen'))).toBeVisible();
    await element(by.id('RegisterScreen')).takeScreenshot();
  });
  it('should navigate to login screen', async () => {
    await element(by.id('footer-button')).tap();
    await expect(element(by.id('LoginScreen'))).toBeVisible();
    await element(by.id('LoginScreen')).takeScreenshot();
    await device.pressBack();
  });
  it('should fill email, password, first name and last name and navigate to home screen', async () => {
    await expect(element(by.id('Register'))).toBeVisible();
    await element(by.id('RegisterScreen')).takeScreenshot();
    await element(by.id('Register')).tap();
    await expect(element(by.text('Testing Complete'))).toBeVisible();
  });
});
