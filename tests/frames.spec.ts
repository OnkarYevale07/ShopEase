import { test, expect, Locator } from '@playwright/test';

// test('Frames Demo', async ({ page }) => {
//   await page.goto('https://ui.vision/demo/webtest/frames/');

//   // total number of frames present on the page.
//   const frames = page.frames();
//   console.log('Number of frames: ', frames.length);

//   // ------ Approach 1: Using page.frame() ----------
//   const frame = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_1.html' });
//   if (frame) {
//     // await frame.locator("[name='mytext1']").fill("Hello");
//     await frame.fill("[name='mytext1']", 'Hello');
//   } else {
//     console.log('Frame is not available');
//   }
// });

// // ------ Approach 2: Using FrameLocator() ---------
// test('FrameLocator Demo', async ({ page }) => {
//   await page.goto('https://ui.vision/demo/webtest/frames/');
//   const inputBox = page.frameLocator("[src='frame_1.html']").locator("[name='mytext1']");
//   await inputBox.fill('John');
//   await page.waitForTimeout(5000);
// });

test.only('inner/child frames demo', async ({ page }) => {
  await page.goto('https://ui.vision/demo/webtest/frames/');

  const frame3 = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_3' });
  if (frame3) {
    await frame3.locator("[name='mytext3']").fill('Welcome');
    const childFrames = frame3.childFrames();
    console.log('Child frames inside the Frame 3: ', childFrames.length); // only 1 child frame exist
    const radio = childFrames[0].getByLabel('I am a human');
    await radio.check(); // select radio button
    await expect(radio).toBeChecked(); // Assertion
  } else {
    console.log('Frame 3 is not found...');
  }
  await page.waitForTimeout(5000);
});
