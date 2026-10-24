import { expect, test } from '@playwright/test';

const APP = '/portfolio/';

test('keyboard skip link and native dialog preserve focus', async ({ page }) => {
  await page.goto(APP);
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Đi tới nội dung chính' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Đào Văn Hùng', level: 1 })).toBeFocused();

  const trigger = page.getByRole('button', { name: 'Xem nhanh' }).first();
  await trigger.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'NanoBioAI · local-first mobile' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Đóng xem nhanh' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test('project deep link survives a hard refresh and updates route metadata', async ({ page }) => {
  const deepLink = `${APP}#/projects/nanobio-fastapi-foundation`;
  await page.goto(deepLink);
  await expect(page.getByRole('heading', { name: 'NanoBioAI · FastAPI foundation', level: 1 })).toBeVisible();
  await expect(page).toHaveTitle(/FastAPI foundation/);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'NanoBioAI · FastAPI foundation', level: 1 })).toBeVisible();
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /FastAPI/);
});

test('in-app navigation moves focus to the new page heading', async ({ page }) => {
  await page.goto(APP);
  await page.getByRole('link', { name: 'Dự án' }).first().click();
  const heading = page.getByRole('heading', { name: 'Dự án', level: 1 });
  await expect(heading).toBeVisible();
  await expect(heading).toBeFocused();
});

test('all required viewports render without horizontal overflow or browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', (error) => errors.push(error.message));
  const routes = ['', '#/projects', '#/case-studies', '#/labs', '#/process', '#/projects/hvc-implementation-evolution'];
  for (const width of [360, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(`${APP}${route}`);
      await expect(page.locator('main h1')).toBeVisible();
      const dimensions = await page.evaluate(() => ({ viewport: window.innerWidth, page: document.documentElement.scrollWidth }));
      expect(dimensions.page, `${width}px route ${route}`).toBeLessThanOrEqual(dimensions.viewport);
    }
  }
  expect(errors).toEqual([]);
});

test('reduced motion preference disables smooth scrolling and keeps all content visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto(APP);
  await expect(page.getByRole('heading', { name: 'Đào Văn Hùng', level: 1 })).toBeVisible();
  const scrollBehavior = await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior);
  expect(scrollBehavior).toBe('auto');
  await page.screenshot({ path: 'docs/audit/screenshots/08-final-mobile.png', fullPage: true });
});

test('case routes and the privacy-safe project do not expose personal links', async ({ page }) => {
  await page.goto(`${APP}#/case-studies/privacy-safe-story-delivery`);
  await expect(page.getByRole('heading', { name: 'Chứng minh frontend delivery mà không đưa nội dung riêng tư ra portfolio', level: 1 })).toBeVisible();
  await expect(page.locator('main').getByRole('link', { name: /github/i })).toHaveCount(0);
  await page.goto(`${APP}#/projects/privacy-safe-story-delivery`);
  await expect(page.getByRole('heading', { name: 'Privacy-safe interactive delivery', level: 1 })).toBeVisible();
  await expect(page.locator('main').getByRole('link', { name: /source/i })).toHaveCount(0);
});

test('capture the completed desktop recruiter page for review', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(APP);
  await expect(page.getByRole('heading', { name: 'Đào Văn Hùng', level: 1 })).toBeVisible();
  await page.screenshot({ path: 'docs/audit/screenshots/08-final-desktop.png', fullPage: true });
});
