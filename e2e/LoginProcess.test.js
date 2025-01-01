import {by, expect, element, waitFor, device} from 'detox';
describe('App Launch', () => {
  beforeAll(async () => {
    await device.launchApp();
    await waitFor(element(by.id('OnBoardingScreen')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.text('Next')).tap();
    await element(by.text('Next')).tap();
    await element(by.text('Login')).tap();
    await element(by.id('email')).typeText('arjun@test.com');
    await element(by.id('password')).typeText('Test@123');
    await device.pressBack();
  });

  it('should display login screen', async () => {
    await expect(element(by.id('LoginScreen'))).toBeVisible();
    await element(by.id('LoginScreen')).takeScreenshot();
  });

  it('Should fill email and password and navigate to home screen', async () => {
    await expect(element(by.id('Login'))).toBeVisible();
    await element(by.id('Login')).tap();
    await expect(element(by.text('Testing Complete'))).toBeVisible();
  });
});
