import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

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

async function installAudioStub(page: Page) {
  await page.addInitScript(() => {
    type AudioTestWindow = Window & {
      __portfolioAudioPlayResults: string[];
      __portfolioAudioPlayCalls: number;
      __portfolioAudioPauseCalls: number;
    };

    const testWindow = window as unknown as AudioTestWindow;
    const configuredResults = new URLSearchParams(window.location.search).get('audio-play-results');
    testWindow.__portfolioAudioPlayResults = configuredResults
      ? configuredResults.split(',')
      : ['playing'];
    testWindow.__portfolioAudioPlayCalls = 0;
    testWindow.__portfolioAudioPauseCalls = 0;

    HTMLMediaElement.prototype.play = function () {
      testWindow.__portfolioAudioPlayCalls += 1;
      const result = testWindow.__portfolioAudioPlayResults.shift() ?? 'playing';
      return result === 'blocked'
        ? Promise.reject(new DOMException('Autoplay is blocked in this test.', 'NotAllowedError'))
        : Promise.resolve();
    };
    HTMLMediaElement.prototype.pause = function () {
      testWindow.__portfolioAudioPauseCalls += 1;
    };
    HTMLMediaElement.prototype.load = function () {};
  });
}

test.beforeEach(async ({ page }) => {
  await installAudioStub(page);
});

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
  await page.emulateMedia({ colorScheme: 'dark' });
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
  const chosenLabel = themeAfter === 'light' ? 'Giao diện sáng' : 'Giao diện tối';
  await expect(toggle).toHaveAttribute('aria-pressed', String(themeAfter === 'light'));
  await expect(toggle).toContainText(chosenLabel);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', themeAfter);

  await page.getByRole('link', { name: 'Dự án' }).first().click();
  await expect(page).toHaveURL(/\/portfolio\/projects\/$/);
  await expect(page.getByRole('heading', { name: 'Dự án', level: 1 })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', themeAfter);
  const routedToggle = page.getByRole('button', { name: /Chuyển giao diện/ });
  await expect(routedToggle).toHaveAttribute('aria-pressed', String(themeAfter === 'light'));
  await routedToggle.click();
  const themeAfterRoutedToggle = themeAfter === 'light' ? 'dark' : 'light';
  await expect(page.locator('html')).toHaveAttribute('data-theme', themeAfterRoutedToggle);

  await page.getByRole('link', { name: 'Giới thiệu' }).click();
  await expect(page).toHaveURL(/\/portfolio\/about\/$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', themeAfterRoutedToggle);
  await page.goBack();
  await expect(page).toHaveURL(/\/portfolio\/projects\/$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', themeAfterRoutedToggle);
  await page.goForward();
  await expect(page).toHaveURL(/\/portfolio\/about\/$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', themeAfterRoutedToggle);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', themeAfterRoutedToggle);
  await page.goto(APP + 'skills/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', themeAfterRoutedToggle);
});

test('system color preference is retained across client-side navigation without a saved choice', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto(APP);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('dvh-theme'))).toBeNull();

  await page.getByRole('link', { name: 'Dự án' }).first().click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  await page.evaluate(() => localStorage.removeItem('dvh-theme'));
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto(APP + 'about/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('link', { name: 'Năng lực' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('dvh-theme'))).toBeNull();
});

test('profile portraits load with base-aware URLs on home and about pages', async ({ page }) => {
  for (const path of ['', 'about/']) {
    await page.goto(APP + path);
    const portraits = page.locator('img[alt="Chân dung Đào Văn Hùng"]');
    await expect(portraits).toHaveCount(1);
    await expect(portraits).toBeVisible();
    await expect(portraits).toHaveAttribute('src', APP + 'AVT.jpg');
    const imageLoaded = await portraits.evaluate((image) => {
      const portrait = image as HTMLImageElement;
      return portrait.complete && portrait.naturalWidth > 0;
    });
    expect(imageLoaded, path || 'home').toBe(true);
  }
});

test('header avatar loads on home and project pages with circular styling', async ({ page }) => {
  for (const path of ['', 'projects/nanobio-local-cloud/']) {
    await page.goto(APP + path);
    await expect(page.getByRole('link', { name: 'Đào Văn Hùng — trang chủ' })).toBeVisible();

    const avatar = page.locator('.brand__mark');
    await expect(avatar).toBeVisible();
    await expect(avatar).toHaveAttribute('src', APP + 'AVT2.jpg');
    await expect(avatar).toHaveAttribute('alt', '');
    await expect(avatar).toHaveAttribute('aria-hidden', 'true');
    await expect(avatar).toHaveCSS('width', '38px');
    await expect(avatar).toHaveCSS('height', '38px');
    await expect(avatar).toHaveCSS('border-radius', '50%');
    await expect(avatar).toHaveCSS('object-fit', 'cover');
    await expect(avatar).toHaveCSS('object-position', '50% 35%');

    const loaded = await avatar.evaluate((element) => {
      const image = element as HTMLImageElement;
      return image.complete && image.naturalWidth === 256 && image.naturalHeight === 256;
    });
    expect(loaded, path || 'home').toBe(true);
  }
});

test('experience page presents the four selected work stages with dates, maps, and related technologies', async ({ page }) => {
  await page.goto(APP + 'experience/');

  const entries = page.locator('[data-experience-entry]');
  await expect(entries).toHaveCount(4);
  expect(await entries.evaluateAll((items) => items.map((item) => (item as HTMLElement).dataset.experienceId))).toEqual([
    'maiatech', 'vnua-study', 'fpt', 'fpt-fresher',
  ]);
  await expect(page.locator('main a[href*="/projects/"]')).toHaveCount(0);

  const expectedStages = [
    { id: 'maiatech', organization: 'MaiATech', role: 'Backend Developer', period: '09/2025–11/2026', map: 'https://maps.app.goo.gl/Ps8RDSpJFxtjoqW38' },
    { id: 'vnua-study', organization: 'Trung tâm nghiên cứu xuất sắc và đổi mới sáng tạo HVNNVN', role: 'Flutter Team Lead', period: '11/2025–03/2026', map: 'https://maps.app.goo.gl/gCFZrxWAxdYPJRWw5' },
    { id: 'fpt', organization: 'FPT Software Hòa Lạc (F2)', role: 'Full-stack Developer Intern', period: '03/2026–07/2026', map: 'https://maps.app.goo.gl/dA3DyvS7BwZFpBPB6' },
    { id: 'fpt-fresher', organization: 'FPT Software Hòa Lạc (F2)', role: 'Full-stack Developer Fresher', period: '07/2026–10/2026', map: 'https://maps.app.goo.gl/dA3DyvS7BwZFpBPB6' },
  ];
  for (const stage of expectedStages) {
    const entry = page.locator('[data-experience-id="' + stage.id + '"]');
    await expect(entry.locator('h2')).toHaveText(stage.organization);
    await expect(entry.locator('h3')).toHaveText(stage.role);
    await expect(entry.locator('time')).toHaveText(stage.period);
    await expect(entry.locator('p').first()).not.toBeEmpty();
    await expect(entry.locator('.timeline-entry__location')).toHaveAttribute('href', stage.map);
    await expect(entry.locator('.timeline-entry__location')).toHaveAttribute('target', '_blank');
  }

  const technologyLabels = async (id: string) =>
    page.locator('[data-experience-id="' + id + '"] [data-experience-technologies] .tag').allTextContents();
  expect(await technologyLabels('maiatech')).toEqual(['Node.js', 'TypeScript', 'Express', 'EJS', 'Prisma', 'MySQL', 'Flutter']);
  expect(await technologyLabels('vnua-study')).toEqual(['Flutter', 'Dart', 'SQLite', 'Supabase Realtime']);
  expect(await technologyLabels('fpt')).toEqual(['FastAPI', 'Vue.js', 'PostgreSQL']);
  await expect(page.locator('[data-experience-id="fpt-fresher"] [data-experience-technologies]')).toHaveCount(0);

  for (const hiddenName of ['Hùng Cường Education', 'NanoBioAI', 'Study2Work', 'VentureX', 'Learn2Earn', 'LinguaSphere', 'LabVnua', 'EduAI']) {
    await expect(page.locator('main').getByText(hiddenName, { exact: false })).toHaveCount(0);
  }

  await expect(page.locator('.timeline-entry__location')).toHaveCount(4);

  for (const width of [360, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    const dimensions = await page.locator('html').evaluate((element) => ({
      client: element.clientWidth,
      scroll: element.scrollWidth,
    }));
    expect(dimensions.scroll, width + 'px experience page').toBeLessThanOrEqual(dimensions.client);
  }
});

test('background music notice remains for five seconds, then fades from view', async ({ page }) => {
  await page.goto(APP);

  const notice = page.getByRole('status');
  await expect(notice).toContainText('Portfolio có nhạc nền');
  await expect(notice).toBeVisible();
  await page.waitForTimeout(4500);
  expect(await notice.isVisible()).toBe(true);
  await expect(notice).toBeHidden({ timeout: 1500 });
});

test('blocked autoplay shows a play hint and the player provides keyboard audio controls', async ({ page }) => {
  await page.goto(APP + '?audio-play-results=blocked,playing');
  const notice = page.getByRole('status');
  await expect(notice).toContainText('Trình duyệt đã chặn tự phát. Bấm phát để nghe nhạc.');

  const audio = page.locator('[data-audio]');
  const playButton = page.getByRole('button', { name: 'Phát nhạc nền' });
  await playButton.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Tạm dừng nhạc nền' })).toBeVisible();
  await expect(notice).toBeHidden();
  await expect.poll(() => audio.evaluate((element) => (element as HTMLAudioElement).volume)).toBe(0.2);

  const volume = page.getByRole('slider', { name: 'Âm lượng nhạc nền' });
  await volume.focus();
  await page.keyboard.press('End');
  await expect(volume).toHaveValue('1');
  await expect.poll(() => audio.evaluate((element) => (element as HTMLAudioElement).volume)).toBe(1);

  const mute = page.getByRole('button', { name: 'Tắt tiếng' });
  await mute.click();
  await expect(page.getByRole('button', { name: 'Bật tiếng' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Bật tiếng' }).click();
  await expect(page.getByRole('button', { name: 'Tắt tiếng' })).toHaveAttribute('aria-pressed', 'false');
});

test('background music advances to part two once, stops, and can be restarted', async ({ page }) => {
  await page.goto(APP);
  const audio = page.locator('[data-audio]');
  const player = page.locator('[data-ambient-player]');
  await expect(audio).toHaveAttribute('src', APP + 'mp3/background-music-part-1.mp3');

  await audio.evaluate((element) => element.dispatchEvent(new Event('ended')));
  await expect(audio).toHaveAttribute('src', APP + 'mp3/background-music-part-2.mp3');
  await expect(audio).toHaveAttribute('data-part', '2');
  await expect.poll(() => page.evaluate(() => (window as unknown as { __portfolioAudioPlayCalls: number }).__portfolioAudioPlayCalls)).toBe(2);

  await audio.evaluate((element) => element.dispatchEvent(new Event('ended')));
  await expect(player).toHaveAttribute('data-playing', 'false');
  await expect(page.getByRole('button', { name: 'Phát lại nhạc nền' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => (window as unknown as { __portfolioAudioPlayCalls: number }).__portfolioAudioPlayCalls)).toBe(2);

  await page.getByRole('button', { name: 'Phát lại nhạc nền' }).click();
  await expect(audio).toHaveAttribute('src', APP + 'mp3/background-music-part-1.mp3');
  await expect.poll(() => page.evaluate(() => (window as unknown as { __portfolioAudioPlayCalls: number }).__portfolioAudioPlayCalls)).toBe(3);
});

test('the audio element and playback state persist during internal navigation', async ({ page }) => {
  await page.goto(APP);
  await page.evaluate(() => {
    (window as Window & { __portfolioAudioElement?: HTMLAudioElement }).__portfolioAudioElement =
      document.querySelector<HTMLAudioElement>('[data-audio]') ?? undefined;
  });

  await page.getByRole('link', { name: 'Dự án' }).first().click();
  await expect(page).toHaveURL(/\/portfolio\/projects\/$/);
  await expect(page.locator('[data-ambient-player]')).toHaveAttribute('data-playing', 'true');
  const persistedElement = await page.evaluate(() => (
    document.querySelector('[data-audio]') ===
    (window as Window & { __portfolioAudioElement?: HTMLAudioElement }).__portfolioAudioElement
  ));
  expect(persistedElement).toBe(true);
  await expect.poll(() => page.evaluate(() => (window as unknown as { __portfolioAudioPlayCalls: number }).__portfolioAudioPlayCalls)).toBe(1);
});

test('the fixed music controls stay inside mobile and desktop viewports', async ({ page }) => {
  await page.goto(APP);
  for (const width of [360, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    const bounds = await page.locator('[data-ambient-player]').boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(844);
  }
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
  await expect(noScript.locator('[data-ambient-player]')).toBeHidden();
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
  for (const path of ['', 'projects/', 'experience/', 'case-studies/nanobio-local-cloud-ai/', 'contact/']) {
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
  await page.getByRole('button', { name: 'Ẩn thông báo nhạc nền' }).click();
  await page.screenshot({ path: 'docs/redesign/screenshots/desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'docs/redesign/screenshots/mobile.png', fullPage: true });
});
