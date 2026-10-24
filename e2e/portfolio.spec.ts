import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const APP = '/portfolio/';
const ROUTES = [
  { path: '', heading: 'Đào Văn Hùng' },
  { path: 'projects/', heading: 'Dự án' },
  { path: 'projects/nanobio-local-cloud/', heading: 'NanoBioAI · ứng dụng local-first' },
  { path: 'experience/', heading: 'Kinh nghiệm' },
  { path: 'skills/', heading: 'Năng lực' },
  { path: 'labs/', heading: 'Labs' },
  { path: 'about/', heading: 'Đào Văn Hùng' },
  { path: 'contact/', heading: 'Trao đổi về kỹ thuật và công việc' },
  { path: 'case-studies/', heading: 'Case study' },
  { path: 'case-studies/nanobio-local-cloud-ai/', heading: 'Tổ chức kiến trúc local-first, cloud và AI' },
];

test('static pages and deep routes open directly and survive refresh under the Pages base', async ({ page }) => {
  for (const route of ROUTES) {
    const response = await page.goto(APP + route.path);
    expect(response?.status(), route.path).toBe(200);
    await expect(page.locator('main h1').first()).toContainText(route.heading);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp('https://daovanhung-dev\\.github\\.io/portfolio/'));
    await page.reload();
    await expect(page.locator('main h1').first()).toContainText(route.heading);
  }
});

test('navigation, theme switch, and keyboard focus work', async ({ page }) => {
  await page.goto(APP);
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Đi tới nội dung chính' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();

  const themeBefore = await page.locator('html').getAttribute('data-theme');
  const themeAfter = themeBefore === 'light' ? 'dark' : 'light';
  const toggle = page.getByRole('button', { name: /Chuyển giao diện/ });
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', themeAfter);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', themeAfter);

  await page.getByRole('link', { name: 'Dự án' }).first().click();
  await expect(page).toHaveURL(/\/portfolio\/projects\/$/);
  await expect(page.getByRole('heading', { name: 'Dự án', level: 1 })).toBeVisible();
});

test('project filters enhance the static list and retain an all-items state', async ({ page, browser }) => {
  await page.goto(APP + 'projects/');
  const cards = page.locator('[data-project-card]');
  await expect(cards).toHaveCount(14);
  const mobileAi = page.getByRole('button', { name: 'Mobile & AI' });
  await mobileAi.click();
  await expect(cards.filter({ visible: true })).toHaveCount(3);
  await expect(page.getByText('Đang hiển thị 3 dự án.')).toBeAttached();
  await page.getByRole('button', { name: 'Tất cả' }).click();
  await expect(cards.filter({ visible: true })).toHaveCount(14);

  const noScript = await browser.newPage({ javaScriptEnabled: false });
  await noScript.goto(APP + 'projects/');
  await expect(noScript.locator('[data-filter-bar]')).toBeHidden();
  await expect(noScript.locator('[data-project-card]')).toHaveCount(14);
  await noScript.close();
});

test('case navigation, reduced motion, and private project boundaries render correctly', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(APP + 'case-studies/nanobio-local-cloud-ai/');
  await expect(page.getByRole('navigation', { name: 'Trong case study' }).getByRole('link', { name: 'Quyết định' })).toHaveCount(0);
  await expect(page.getByText(/MISSING_SOURCE|tự xác nhận|tự thuật|unverified|chưa được cung cấp|mức attribution/i)).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Phạm vi', level: 2 })).toBeVisible();
  const scrollBehavior = await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior);
  expect(scrollBehavior).toBe('auto');

  await page.goto(APP + 'projects/privacy-safe-story-delivery/');
  await expect(page.getByRole('heading', { name: 'Interactive delivery an toàn về riêng tư' })).toBeVisible();
  await expect(page.locator('main').getByRole('link', { name: /GitHub|source/i })).toHaveCount(0);
  await expect(page.locator('main').getByText(/github\.com|daovanhung-dev\/hung/i)).toHaveCount(0);
});

test('unknown direct route returns a readable 404 with working base links', async ({ page }) => {
  const response = await page.goto(APP + 'does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Không tìm thấy trang này.' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Về trang chủ/ })).toHaveAttribute('href', APP);
  await expect(page.getByRole('link', { name: 'Xem dự án' })).toHaveAttribute('href', APP + 'projects/');
});

test('responsive routes have no horizontal overflow at required widths', async ({ page }) => {
  const paths = [
    '', 'projects/', 'projects/nanobio-local-cloud/', 'experience/', 'skills/',
    'labs/', 'about/', 'contact/', 'case-studies/nanobio-local-cloud-ai/',
  ];
  for (const width of [360, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of paths) {
      await page.goto(APP + path);
      await expect(page.locator('main h1').first()).toBeVisible();
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        page: document.documentElement.scrollWidth,
      }));
      expect(dimensions.page, width + 'px on ' + path).toBeLessThanOrEqual(dimensions.viewport);
    }
  }
});

test('representative routes pass automated accessibility checks', async ({ page }) => {
  for (const path of ['', 'projects/', 'case-studies/nanobio-local-cloud-ai/', 'contact/']) {
    await page.goto(APP + path);
    for (const theme of ['dark', 'light']) {
      await page.evaluate((value) => { document.documentElement.dataset.theme = value; }, theme);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(
        results.violations.map((violation) => ({
          id: violation.id,
          nodes: violation.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })),
        })),
        path + ' / ' + theme,
      ).toEqual([]);
    }
  }
});

test('captures recruiter-facing desktop and mobile previews', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(APP);
  await page.screenshot({ path: 'docs/redesign/screenshots/desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'docs/redesign/screenshots/mobile.png', fullPage: true });
});
