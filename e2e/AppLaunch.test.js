import {by, expect, element, waitFor, device} from 'detox';

describe('App Launch', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have logo image on screen', async () => {
    await expect(element(by.id('logo-image'))).toBeVisible();
    await expect(element(by.id('loading-indicator'))).toBeVisible();
  });

  it('should navigate to onboarding screen', async () => {
    await waitFor(element(by.id('OnBoardingScreen')))
      .toBeVisible()
      .withTimeout(5000);
    await expect(element(by.id('OnBoardingScreen'))).toBeVisible();
  });
});
