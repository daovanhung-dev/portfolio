import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const APP = '/portfolio/';
const ROUTES = [
  { path: '', heading: 'Đào Văn Hùng' },
  { path: 'projects/', heading: 'Dự án tiêu biểu' },
  { path: 'projects/nanobio-local-cloud/', heading: 'NanoBioAI · Nabi, trợ lý wellness Flutter và AI tự host' },
  { path: 'projects/hvc-implementation-evolution/', heading: 'HVC Education · Quản lý lớp và học tập liên tục' },
  { path: 'projects/labvnua-student-app/', heading: 'EduAI' },
  { path: 'experience/', heading: 'Kinh nghiệm' },
  { path: 'experience/maiatech/', heading: 'Backend Developer Intern' },
  { path: 'skills/', heading: 'Năng lực' },
  { path: 'labs/', heading: 'Labs' },
  { path: 'about/', heading: 'Đào Văn Hùng' },
  { path: 'contact/', heading: 'Trao đổi về kỹ thuật và công việc' },
  { path: 'case-studies/', heading: 'Case study' },
  { path: 'case-studies/nanobio-local-cloud-ai/', heading: 'NanoBioAI · Từ dữ liệu wellness local đến AI tự host' },
  { path: 'case-studies/hvc-implementation-evolution/', heading: 'HVC_EDU_NEW · Xây luồng quản lý lớp và học tập liên tục' },
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

test('EduAI project uses current branding and links to its pinned source', async ({ page }) => {
  const sourceUrl = 'https://github.com/daovanhung-dev/LabVnua/blob/72c1090e7a76e0a10e9feb3e429fb86ba4c0c67b/README.md';

  await page.goto(APP);
  await expect(page.locator('[data-project-card] [data-status]')).toHaveCount(0);
  const card = page.locator('[data-project-card]').filter({ hasText: 'EduAI' });
  await expect(card).toHaveCount(1);
  await expect(card).not.toContainText('LabVnua');
  await expect(card.locator('h2 a')).toHaveAttribute('href', APP + 'projects/labvnua-student-app/');

  await page.goto(APP + 'projects/labvnua-student-app/');
  await expect(page.locator('main h1')).toHaveText('EduAI');
  await expect(page.locator('.detail-header [data-status="partial"]')).toBeVisible();
  await expect(page.locator('main')).toContainText(/API đào tạo VNUA/);
  await expect(page.locator('main')).toContainText(/Gemini qua REST/);
  await expect(page.locator('main')).toContainText(/một số mục menu chưa được nối thành luồng hoàn chỉnh/i);
  await expect(page.locator('main')).toContainText(/chưa chạy ứng dụng.*xác minh dịch vụ\/production/i);
  await expect(page.locator('main')).not.toContainText('LabVnua');
  await expect(page.locator('main a[href="' + sourceUrl + '"]').first()).toBeVisible();
});

test('NanoBio presents local data and authenticated self-hosted AI without stale on-device claims', async ({ page }) => {
  const storeUrl = 'https://play.google.com/store/apps/details?id=com.nanobioai.app';
  await page.goto(APP);
  const nanoCard = page.locator('[data-project-card]').filter({ hasText: 'NanoBioAI · Nabi' });
  const coverImage = nanoCard.locator('.project-card__cover img');
  await expect(coverImage).toHaveAttribute('src', APP + 'projects/nanobio/logo.jpg');
  await expect(coverImage).toHaveAttribute('alt', /Logo Nabi/);
  await expect.poll(() => coverImage.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect(nanoCard.getByRole('link', { name: 'Google Play' })).toHaveAttribute('href', storeUrl);

  await page.goto(APP + 'projects/nanobio-local-cloud/');
  await expect(page.locator('main h1')).toContainText('NanoBioAI · Nabi');
  await expect(page.locator('main')).toContainText(/SQLite/);
  await expect(page.locator('main')).toContainText(/FastAPI.*Ollama/);
  await expect(page.locator('main')).toContainText(/chưa được xác minh/i);
  await expect(page.locator('main')).not.toContainText(/AI trên thiết bị|llamadart/i);
  await expect(page.getByRole('link', { name: 'Tải ứng dụng trên Google Play' })).toHaveAttribute('href', storeUrl);
  await expect(page.getByRole('link', { name: 'Mở Google Play' }).first()).toHaveAttribute('href', storeUrl);
  await expect(page.locator('.feature-row').filter({ hasText: 'Ứng dụng Android đã phát hành trên Google Play' }).locator('[data-status="deployed-verified"]')).toBeVisible();

  const gallery = page.locator('.project-gallery');
  const screenshots = gallery.locator('img[data-project-screenshot]');
  await expect(gallery.getByRole('heading', { name: 'Màn hình NanoBio' })).toBeVisible();
  await expect(screenshots).toHaveCount(8);
  for (const [index, screenshot] of (await screenshots.all()).entries()) {
    await expect(screenshot).toHaveAttribute('src', APP + 'projects/nanobio/screen-' + String(index + 1).padStart(2, '0') + '.jpg');
    await expect(screenshot).not.toHaveAttribute('alt', '');
    await screenshot.scrollIntoViewIfNeeded();
    await expect.poll(() => screenshot.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }

  await page.goto(APP + 'case-studies/nanobio-local-cloud-ai/');
  await expect(page.getByRole('heading', { name: 'Quyết định' })).toBeVisible();
  await expect(page.locator('main')).toContainText(/Tôi đối chiếu Flutter entrypoint/i);
  await expect(page.locator('main')).not.toContainText(/AI trên thiết bị|llamadart/i);
  await expect(page.locator('a[href="https://github.com/daovanhung-dev/NanoBioAI/blob/d867cd134fd03635022af306229d8a0c3ef64c8e/backend/src/nanobio_backend/modules/edge_api/router.py"]')).toBeVisible();
});

test('HVC project and case describe only HVC_EDU_NEW at the observed source commit', async ({ page }) => {
  const sourceUrl = 'https://github.com/daovanhung-dev/HVC_EDU_NEW/tree/c2b0f5f47466204b39f69eaa17616e14a1b5ebd3/frontend/src';

  await page.goto(APP + 'projects/hvc-implementation-evolution/');
  await expect(page.locator('main h1')).toHaveText('HVC Education · Quản lý lớp và học tập liên tục');
  await expect(page.locator('main')).toContainText(/membership.*lịch lặp.*buổi học/i);
  await expect(page.locator('main')).toContainText(/RLS.*RPC.*Edge Functions/i);
  await expect(page.locator('main')).toContainText(/ClassMonth.*không thuộc phạm vi ứng dụng hiện hành/i);
  await expect(page.locator('main')).not.toContainText(/FastAPI|Angular/i);
  await expect(page.locator('main a[href="' + sourceUrl + '"]').first()).toBeVisible();

  await page.goto(APP + 'case-studies/hvc-implementation-evolution/');
  await expect(page.locator('main h1')).toHaveText('HVC_EDU_NEW · Xây luồng quản lý lớp và học tập liên tục');
  await expect(page.locator('main')).toContainText(/đối chiếu GitHub main với checkout local/i);
  await expect(page.locator('main')).toContainText(/Không xác minh runtime Supabase/i);
  await expect(page.locator('main')).toContainText(/không gộp codebase FastAPI hoặc Angular vào implementation hiện hành/i);
  await expect(page.locator('main a[href*="github.com/daovanhung-dev/edu_hvc"]')).toHaveCount(0);
  await expect(page.locator('main a[href*="github.com/daovanhung-dev/HVC_EDU/blob"]')).toHaveCount(0);
  await expect(page.locator('main a[href="' + sourceUrl + '"]').first()).toBeVisible();
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
  await expect(page.getByRole('heading', { name: 'Dự án tiêu biểu', level: 1 })).toBeVisible();
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

test('About presents Tech Lead capability, project breadth, and end-to-end responsibility', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(APP + 'about/');

  await expect(page.locator('main h1')).toHaveText('Đào Văn Hùng');
  await expect(page).toHaveTitle(/Giới thiệu — Đào Văn Hùng · Năng lực Tech Lead/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /kiến trúc hệ thống.*có thể dẫn dắt kỹ thuật/);
  await expect(page.locator('main')).toContainText(/đã đảm nhận vai trò TechLead\/Team Lead; tôi có thể dẫn dắt/i);
  await expect(page.getByRole('link', { name: 'Xem dự án' }).first()).toHaveAttribute('href', APP + 'projects/');
  await expect(page.locator('.about-hero__actions').getByRole('link', { name: 'Liên hệ' })).toHaveAttribute('href', APP + 'contact/');
  await expect(page.locator('[data-ambient-player]')).toHaveCSS('position', 'static');
  await expect(page.getByRole('heading', { name: 'Trách nhiệm không dừng ở lúc code chạy' })).toBeVisible();

  const projectSlugs = [
    'study2work-contracts',
    'nanobio-local-cloud',
    'labvnua-student-app',
    'hvc-implementation-evolution',
    'ai-local-inference',
  ];
  const expectedRoles = [
    'TechLead',
    'Technical Owner / Full-stack Developer',
    'Flutter Team Lead',
    'Full-stack Developer',
    'Flutter Developer',
  ];
  const projectCards = page.locator('[data-about-project]');
  expect(await projectCards.evaluateAll((cards) => cards.map((card) => (card as HTMLElement).dataset.aboutProject))).toEqual(projectSlugs);
  for (const [index, slug] of projectSlugs.entries()) {
    const card = page.locator('[data-about-project="' + slug + '"]');
    await expect(card.locator('h3 a')).toHaveAttribute('href', APP + 'projects/' + slug + '/');
    await expect(card.locator('.about-project-card__role')).toHaveText(expectedRoles[index]);
    await expect(card.locator('[data-status]')).toHaveCount(0);
    await expect(card.getByRole('link', { name: 'Xem dự án' })).toHaveAttribute('href', APP + 'projects/' + slug + '/');
  }

  await expect(page.locator('.about-principle-card')).toHaveCount(3);
  expect(await page.locator('.about-workflow li').evaluateAll((steps) => steps.map((step) => (
    step.textContent?.replace(/^\s*\d+\s*/, '').trim()
  )))).toEqual(['Làm rõ', 'Thiết kế', 'Triển khai & kiểm thử', 'Bàn giao']);

  const aboutBounds = await page.locator('.about-page').boundingBox();
  const playerBounds = await page.locator('[data-ambient-player]').boundingBox();
  expect(aboutBounds).not.toBeNull();
  expect(playerBounds).not.toBeNull();
  expect(playerBounds!.y).toBeGreaterThanOrEqual(aboutBounds!.y + aboutBounds!.height);

  await page.reload();
  await expect(page.locator('main h1')).toHaveText('Đào Văn Hùng');
  await expect(page.locator('[data-about-project]')).toHaveCount(5);
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
  await expect(page.locator('[data-ambient-player]')).toHaveCSS('position', 'static');

  const entries = page.locator('[data-experience-entry]');
  await expect(entries).toHaveCount(4);
  expect(await entries.evaluateAll((items) => items.map((item) => (item as HTMLElement).dataset.experienceId))).toEqual([
    'fpt-fresher', 'fpt', 'vnua-study', 'maiatech',
  ]);
  await expect(page.locator('main a[href*="/projects/"]')).toHaveCount(0);

  const expectedStages = [
    { id: 'fpt-fresher', organization: 'CÔNG TY TNHH PHẦN MỀM FPT · HÒA LẠC (F2)', role: 'Full-stack Developer Fresher', period: '07/2026–10/2026', map: 'https://maps.app.goo.gl/dA3DyvS7BwZFpBPB6' },
    { id: 'fpt', organization: 'CÔNG TY TNHH PHẦN MỀM FPT · HÒA LẠC (F2)', role: 'Full-stack Developer Intern', period: '03/2026–07/2026', map: 'https://maps.app.goo.gl/dA3DyvS7BwZFpBPB6' },
    { id: 'vnua-study', organization: 'Trung tâm Nghiên cứu xuất sắc và Đổi mới sáng tạo (CREI) · Học viện Nông nghiệp Việt Nam', role: 'Flutter Team Lead', period: '11/2025–03/2026', map: 'https://maps.app.goo.gl/gCFZrxWAxdYPJRWw5' },
    { id: 'maiatech', organization: 'CÔNG TY TNHH CÔNG NGHỆ MAI A', role: 'Backend Developer Intern', period: '09/2025–11/2025', map: 'https://maps.app.goo.gl/Ps8RDSpJFxtjoqW38' },
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
  expect(await technologyLabels('maiatech')).toEqual(['Node.js', 'MySQL']);
  expect(await technologyLabels('vnua-study')).toEqual(['Flutter', 'Dart', 'SQLite', 'Supabase Realtime']);
  expect(await technologyLabels('fpt')).toEqual(['Flask', 'Python', 'PostgreSQL', 'Vue.js']);
  expect(await technologyLabels('fpt-fresher')).toEqual(['FastAPI', 'Python', 'Angular', 'PostgreSQL']);

  const fptFresherEntry = page.locator('[data-experience-id="fpt-fresher"]');
  const fptInternEntry = page.locator('[data-experience-id="fpt"]');
  await expect(fptInternEntry.getByRole('link', { name: 'Xem rõ hơn về công việc và vai trò của tôi' })).toHaveAttribute('href', APP + 'experience/fpt/');
  await expect(fptFresherEntry.getByRole('link', { name: 'Xem rõ hơn về công việc và vai trò của tôi' })).toHaveAttribute('href', APP + 'experience/fpt-fresher/');
  const fptLogo = fptFresherEntry.locator('[data-experience-logo]');
  const fptCampus = fptFresherEntry.locator('[data-experience-photo]');
  await expect(fptFresherEntry.locator('.experience-entry__copy > p')).toContainText('Trong giai đoạn Fresher, tôi tập trung thiết kế thuật toán');
  await expect(fptFresherEntry.locator('.experience-company-photo figcaption')).toContainText('campus của FPT Software, công ty thành viên Tập đoàn FPT');
  await expect(fptLogo).toHaveAttribute('alt', 'Logo FPT với biểu trưng chữ FPT màu xanh lam, xanh lá và cam');
  await expect(fptCampus).toHaveAttribute('alt', 'Khuôn viên campus F-Ville 2 của FPT Software tại Hòa Lạc');
  await expect(fptInternEntry.locator('[data-experience-media]')).toHaveCount(0);
  await expect(page.locator('[data-experience-logo]')).toHaveCount(3);
  await expect(page.locator('[data-experience-photo]')).toHaveCount(3);
  for (const image of [fptLogo, fptCampus]) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await expect(fptFresherEntry.getByRole('link', { name: 'Mở nguồn biểu trưng công ty' })).toHaveAttribute('href', 'https://fptsoftware.com/-/media/project/fpt-software/fso/uplift/home/logo_fpt_text_black.png?modified=20240111094946');
  await expect(fptFresherEntry.locator('.experience-company-photo figcaption a')).toHaveAttribute('href', 'https://fptsoftware.com/-/media/project/fpt-software/fso/about-us/global-presence/f-ville-2/f-ville-2-1.jpg?extension=webp&modified=20230811072321');

  for (const hiddenName of ['Hùng Cường Education', 'NanoBioAI', 'Study2Work', 'VentureX', 'Learn2Earn', 'LinguaSphere', 'LabVnua']) {
    await expect(page.locator('main').getByText(hiddenName, { exact: false })).toHaveCount(0);
  }

  await expect(page.locator('.timeline-entry__location')).toHaveCount(4);

  const maiaEntry = page.locator('[data-experience-id="maiatech"]');
  const companyLogo = maiaEntry.locator('[data-experience-logo]');
  const companyPhoto = maiaEntry.locator('[data-experience-photo]');
  await expect(maiaEntry.locator('h2')).toHaveText('CÔNG TY TNHH CÔNG NGHỆ MAI A');
  await expect(page.locator('main')).not.toContainText('MaiATech');
  await expect(companyLogo).toHaveAttribute('alt', 'Biểu trưng chữ M xanh dương của CÔNG TY TNHH CÔNG NGHỆ MAI A');
  await expect(companyPhoto).toHaveAttribute('alt', 'Tập thể công ty chụp ảnh cùng nhau tại nơi làm việc');
  for (const image of [companyLogo, companyPhoto]) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await expect(maiaEntry.getByRole('link', { name: 'Xem rõ hơn về công việc và vai trò của tôi' })).toHaveAttribute('href', APP + 'experience/maiatech/');

  const vnuaEntry = page.locator('[data-experience-id="vnua-study"]');
  const vnuaLogo = vnuaEntry.locator('[data-experience-logo]');
  const vnuaPhoto = vnuaEntry.locator('[data-experience-photo]');
  await expect(vnuaEntry.locator('.experience-entry__copy > p')).toContainText(/tôi thiết kế kiến trúc dự án EduAI/i);
  await expect(vnuaEntry.locator('.experience-entry__copy > p')).toContainText('nhóm 5 người, tính cả tôi');
  await expect(vnuaLogo).toHaveAttribute('alt', 'Biểu trưng Trung tâm Nghiên cứu xuất sắc và Đổi mới sáng tạo (CREI)');
  await expect(vnuaPhoto).toHaveAttribute('alt', 'Tòa nhà Trung tâm Nghiên cứu xuất sắc và Đổi mới sáng tạo tại Học viện Nông nghiệp Việt Nam');
  for (const image of [vnuaLogo, vnuaPhoto]) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await expect(vnuaEntry.getByRole('link', { name: 'Xem rõ hơn về công việc và vai trò của tôi' })).toHaveAttribute('href', APP + 'experience/vnua-study/');

  for (const width of [360, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    const dimensions = await page.locator('html').evaluate((element) => ({
      client: element.clientWidth,
      scroll: element.scrollWidth,
    }));
    expect(dimensions.scroll, width + 'px experience page').toBeLessThanOrEqual(dimensions.client);
  }
});

test('CREI experience detail presents institutional context and the EduAI role without mixing claims', async ({ page }) => {
  await page.goto(APP + 'experience/vnua-study/');
  await expect(page.locator('[data-ambient-player]')).toHaveCSS('position', 'static');
  await expect(page.locator('main h1')).toHaveText('Flutter Team Lead');
  await expect(page).toHaveTitle(/Trung tâm Nghiên cứu xuất sắc và Đổi mới sáng tạo \(CREI\)/);
  await expect(page.locator('main')).toContainText('11/2025–03/2026');
  await expect(page.locator('.crei-context-panel')).toContainText('SAHEP-VNUA');
  await expect(page.locator('.crei-context-panel')).toContainText('Ngân hàng Thế giới');
  await expect(page.locator('.crei-context-panel')).toContainText(/nghiên cứu.*phát triển công nghệ.*đổi mới sáng tạo/i);
  await expect(page.locator('.experience-detail-prose')).toContainText('Tôi là người thiết kế kiến trúc dự án EduAI');
  await expect(page.locator('.experience-detail-prose')).toContainText('feature-first');
  await expect(page.locator('.experience-detail-prose')).toContainText('widgets, controllers, services');
  await expect(page.locator('.experience-detail-prose')).toContainText('nhóm 5 người, tính cả tôi');
  await expect(page.locator('.experience-detail-prose')).toContainText('phân rã đầu việc và phân công công việc');
  await expect(page.locator('.experience-detail-prose')).toContainText('EduAI');
  await expect(page.locator('.experience-detail-prose')).toContainText('thông báo nền');
  await expect(page.locator('.experience-detail-prose')).not.toContainText(/sứ mệnh|Ngân hàng Thế giới|thành tựu của Trung tâm/i);
  await expect(page.locator('[data-tech-group="vnua-app"]')).toContainText('Flutter');
  await expect(page.locator('[data-tech-group="vnua-app"]')).toContainText('Dart');
  await expect(page.locator('[data-tech-group="vnua-app"]')).toContainText('SQLite');
  await expect(page.locator('[data-tech-group="vnua-app"]')).toContainText('Supabase Realtime');
  await expect(page.locator('.experience-architecture')).toHaveCount(0);
  await expect(page.locator('.experience-contributions')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText(/Backend Developer|Mai A|Express Route|MySQL/);

  const projectLink = page.getByRole('link', { name: 'Xem dự án EduAI' });
  await expect(projectLink).toHaveAttribute('href', APP + 'projects/labvnua-student-app/');
  const contextLink = page.getByRole('link', { name: 'Trang giới thiệu CREI' });
  await expect(contextLink).toHaveAttribute('href', 'https://crei.vnua.edu.vn/?page_id=29');
  await expect(page.getByRole('link', { name: 'Mở nguồn biểu trưng công ty' })).toHaveAttribute('href', 'https://crei.vnua.edu.vn/wp-content/uploads/2025/02/Picture2.png');
  await expect(page.locator('.experience-detail__caption-copy a')).toHaveAttribute('href', 'https://crei.vnua.edu.vn/wp-content/uploads/2026/04/1hcq8vmat7i_8614ho3fse.webp');

  const images = page.locator('.experience-detail__media img');
  await expect(images).toHaveCount(2);
  for (const image of await images.all()) {
    await expect(image).not.toHaveAttribute('alt', '');
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }

  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    const dimensions = await page.locator('html').evaluate((element) => ({ client: element.clientWidth, scroll: element.scrollWidth }));
    expect(dimensions.scroll, width + 'px CREI detail page').toBeLessThanOrEqual(dimensions.client);
  }

  await page.reload();
  await expect(page.locator('main h1')).toHaveText('Flutter Team Lead');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const theme of ['dark', 'light']) {
    await page.evaluate((value) => { document.documentElement.dataset.theme = value; }, theme);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations.map((violation) => ({
      id: violation.id,
      targets: violation.nodes.map((node) => node.target),
    })), 'CREI detail / ' + theme).toEqual([]);
  }
});

test('company experience detail presents backend work and layered API architecture', async ({ page }) => {
  await page.goto(APP + 'experience/maiatech/');
  await expect(page.locator('[data-ambient-player]')).toHaveCSS('position', 'static');

  await expect(page.locator('main h1')).toHaveText('Backend Developer Intern');
  await expect(page).toHaveTitle(/CÔNG TY TNHH CÔNG NGHỆ MAI A/);
  await expect(page.locator('main')).toContainText('CÔNG TY TNHH CÔNG NGHỆ MAI A');
  await expect(page.locator('main')).not.toContainText('MaiATech');
  await expect(page.locator('main')).toContainText('06/11/2015');
  await expect(page.locator('main')).toContainText('30 API');
  const contributions = page.locator('[data-contribution]');
  await expect(contributions).toHaveCount(4);
  expect(await contributions.locator('h3').allTextContents()).toEqual([
    '30 API', 'Thiết kế API', 'Tối ưu logic API', 'Tái sử dụng utilities',
  ]);
  await expect(contributions.nth(0)).toContainText(/xây dựng và hoàn thiện API/i);
  await expect(contributions.nth(1)).toContainText(/thiết kế API theo phạm vi nghiệp vụ/i);
  await expect(contributions.nth(2)).toContainText(/rà soát và tối ưu logic xử lý/i);
  await expect(contributions.nth(3)).toContainText(/utility dùng chung/i);
  await expect(page.locator('main')).toContainText(/rà soát và tối ưu logic xử lý/i);
  await expect(page.locator('main')).toContainText('thương mại điện tử');
  await expect(page.locator('main')).toContainText('Node.js');
  await expect(page.locator('main')).toContainText('TypeScript');
  await expect(page.locator('main')).toContainText('Express');
  await expect(page.locator('main')).toContainText('Prisma ORM');
  await expect(page.locator('main')).toContainText('MySQL');
  const backendTech = page.locator('[data-tech-group="backend-web"]');
  await expect(backendTech).toContainText('Passport.js');
  await expect(backendTech).toContainText('Express Session');
  await expect(backendTech).toContainText('Multer');
  await expect(backendTech).toContainText('Supabase');
  const mobileTech = page.locator('[data-tech-group="mobile-context"]');
  await expect(mobileTech).toContainText('Flutter');
  await expect(mobileTech).toContainText('Dart');
  await expect(mobileTech).toContainText('SQLite');
  await expect(page.locator('main')).not.toContainText(/Learn2Earn|hồ sơ CV|ứng viên|tuyển dụng/i);
  const architectureSteps = page.locator('.experience-architecture__step');
  await expect(architectureSteps).toHaveCount(6);
  expect(await architectureSteps.locator('h3').allTextContents()).toEqual([
    'Express Route', 'Middleware', 'Controller', 'Service', 'Prisma · Data Access', 'MySQL',
  ]);
  await expect(architectureSteps.nth(1)).toContainText(/phiên đăng nhập.*quyền truy cập/i);
  await expect(architectureSteps.nth(2)).toContainText(/dữ liệu HTTP.*response/i);
  await expect(architectureSteps.nth(3)).toContainText(/quy tắc nghiệp vụ/i);
  await expect(architectureSteps.nth(4)).toContainText(/truy vấn.*đọc\/ghi/i);
  await expect(page.locator('[data-architecture-clients]')).toContainText('EJS');
  await expect(page.locator('[data-architecture-clients]')).toContainText('Flutter / Dart');
  await expect(page.locator('[data-architecture-support]')).toHaveCount(4);
  await expect(page.locator('main')).not.toContainText(/do chủ hồ sơ cung cấp|chưa được kiểm tra độc lập|chưa được xác minh/i);
  await expect(page.locator('main a[href*="Learn2Earn"]')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Website chính thức', exact: true })).toBeVisible();

  const companyPhoto = page.locator('.experience-detail__photo img[data-experience-photo]');
  for (const image of await page.locator('.experience-detail__media img').all()) {
    await expect(image).not.toHaveAttribute('alt', '');
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  const [imageBounds, figureBounds, logoBounds] = await Promise.all([
    companyPhoto.boundingBox(),
    page.locator('.experience-detail__photo').boundingBox(),
    page.locator('.experience-detail__logo').boundingBox(),
  ]);
  expect(imageBounds).not.toBeNull();
  expect(figureBounds).not.toBeNull();
  expect(logoBounds).not.toBeNull();
  expect(imageBounds!.width).toBeGreaterThan(logoBounds!.width * 2);
  expect(logoBounds!.x).toBeGreaterThanOrEqual(figureBounds!.x);
  expect(logoBounds!.x + logoBounds!.width).toBeLessThanOrEqual(figureBounds!.x + figureBounds!.width);
  expect(logoBounds!.y).toBeGreaterThanOrEqual(imageBounds!.y + imageBounds!.height);

  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    const dimensions = await page.locator('html').evaluate((element) => ({ client: element.clientWidth, scroll: element.scrollWidth }));
    expect(dimensions.scroll, width + 'px detail page').toBeLessThanOrEqual(dimensions.client);
  }

  await page.reload();
  await expect(page.locator('main h1')).toHaveText('Backend Developer Intern');
  await page.emulateMedia({ reducedMotion: 'reduce' });

  for (const theme of ['dark', 'light']) {
    await page.evaluate((value) => { document.documentElement.dataset.theme = value; }, theme);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations.map((violation) => ({
      id: violation.id,
      targets: violation.nodes.map((node) => node.target),
    })), 'Mai A detail / ' + theme).toEqual([]);
  }
});

test('FPT Intern detail presents the confirmed stack, contributions, workflow, and frontend/backend architecture', async ({ page }) => {
  await page.goto(APP + 'experience/');
  const internLink = page.locator('[data-experience-id="fpt"]').getByRole('link', { name: 'Xem rõ hơn về công việc và vai trò của tôi' });
  await expect(internLink).toHaveAttribute('href', APP + 'experience/fpt/');
  await internLink.click();
  await expect(page).toHaveURL(new RegExp('/experience/fpt/$'));
  await expect(page.locator('main h1')).toHaveText('Full-stack Developer Intern');
  await expect(page).toHaveTitle(/CÔNG TY TNHH PHẦN MỀM FPT/);
  await expect(page.locator('main')).toContainText('03/2026–07/2026');
  await expect(page.locator('main')).toContainText('Flask');
  await expect(page.locator('main')).toContainText('Python');
  await expect(page.locator('main')).toContainText('PostgreSQL');
  await expect(page.locator('main')).toContainText('Vue.js');
  await expect(page.locator('main')).not.toContainText('FastAPI');

  const contributions = page.locator('[data-fpt-contributions] [data-contribution]');
  await expect(contributions).toHaveCount(4);
  expect(await contributions.locator('h3').allTextContents()).toEqual([
    'Thiết kế Detail Design (DD)', 'Thiết kế UTC', 'Thực hiện UTR', 'Thiết kế và lập trình',
  ]);
  await expect(contributions.nth(0)).toContainText('50 API · 17 màn hình');
  await expect(contributions.nth(1)).toContainText('50 API · 17 màn hình');
  await expect(contributions.nth(2)).toContainText('24 API · 8 màn hình');
  await expect(contributions.nth(3)).toContainText('20 API · 5 màn hình');

  const workflow = page.locator('.experience-detail-prose');
  await expect(workflow).toContainText('đọc BD từ khách hàng');
  await expect(workflow).toContainText('thiết kế DD');
  await expect(workflow).toContainText('coding');
  await expect(workflow).toContainText('thiết kế UTC');
  await expect(workflow).toContainText('chạy UTR');
  await expect(workflow).toContainText('ghi nhận bug');
  await expect(workflow).toContainText('sửa lỗi');

  const backend = page.locator('[data-architecture="backend"]');
  await expect(backend.locator('.experience-architecture__step')).toHaveCount(5);
  expect(await backend.locator('.experience-architecture__step h3').allTextContents()).toEqual([
    'Flask Route / Blueprint', 'Kiểm tra dữ liệu', 'Service', 'Data Access', 'PostgreSQL',
  ]);
  await expect(backend).toContainText('endpoint');
  await expect(backend).toContainText('quy tắc nghiệp vụ');
  await expect(backend).toContainText('truy vấn dữ liệu');

  const frontend = page.locator('[data-architecture="frontend"]');
  await expect(frontend.locator('.experience-architecture__step')).toHaveCount(4);
  expect(await frontend.locator('.experience-architecture__step h3').allTextContents()).toEqual([
    'Vue View / Component', 'Trạng thái giao diện', 'API client', 'Flask API',
  ]);
  await expect(frontend).toContainText('request');

  const images = page.locator('.experience-detail__media img');
  await expect(images).toHaveCount(2);
  await expect(images.nth(0)).toHaveAttribute('alt', 'Khuôn viên campus F-Ville 2 của FPT Software tại Hòa Lạc');
  await expect(images.nth(1)).toHaveAttribute('alt', 'Logo FPT với biểu trưng chữ FPT màu xanh lam, xanh lá và cam');
  for (const image of await images.all()) {
    await expect(image).not.toHaveAttribute('alt', '');
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }

  await expect(page.locator('main')).not.toContainText(/Study2Work|Learn2Earn|hồ sơ CV|tuyển dụng/i);
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    const dimensions = await page.locator('html').evaluate((element) => ({ client: element.clientWidth, scroll: element.scrollWidth }));
    expect(dimensions.scroll, width + 'px FPT Intern detail').toBeLessThanOrEqual(dimensions.client);
  }

  await page.reload();
  await expect(page.locator('main h1')).toHaveText('Full-stack Developer Intern');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const theme of ['dark', 'light']) {
    await page.evaluate((value) => { document.documentElement.dataset.theme = value; }, theme);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations.map((violation) => ({
      id: violation.id,
      targets: violation.nodes.map((node) => node.target),
    })), 'FPT Intern detail / ' + theme).toEqual([]);
  }
});

test('FPT Fresher detail keeps its stack and contributions separate from Intern', async ({ page }) => {
  await page.goto(APP + 'experience/');
  const fresherLink = page.locator('[data-experience-id="fpt-fresher"]').getByRole('link', { name: 'Xem rõ hơn về công việc và vai trò của tôi' });
  await expect(fresherLink).toHaveAttribute('href', APP + 'experience/fpt-fresher/');
  await page.goto(APP + 'experience/fpt-fresher/');
  await expect(page.locator('main h1')).toHaveText('Full-stack Developer Fresher');
  await expect(page).toHaveTitle(/CÔNG TY TNHH PHẦN MỀM FPT/);
  await expect(page.locator('main')).toContainText('07/2026–10/2026');
  for (const technology of ['FastAPI', 'Python', 'Angular', 'PostgreSQL']) {
    await expect(page.locator('main')).toContainText(technology);
  }
  await expect(page.locator('main')).not.toContainText(/Flask|Vue\.js|50 API|24 API|UTR/);

  const contributions = page.locator('[data-fpt-fresher-contributions] [data-contribution]');
  await expect(contributions).toHaveCount(2);
  expect(await contributions.locator('h3').allTextContents()).toEqual([
    'Thiết kế Detail Design (DD)', 'Thiết kế và lập trình',
  ]);
  await expect(contributions.nth(0)).toContainText('10 API · 3 màn hình');
  await expect(contributions.nth(1)).toContainText('30 API · 15 màn hình');
  await expect(page.locator('.experience-detail-prose')).toContainText('thiết kế thuật toán phù hợp với yêu cầu');
  await expect(page.locator('.experience-detail-prose')).toContainText('FastAPI/Python');
  await expect(page.locator('.experience-detail-prose')).toContainText('Angular');
  await expect(page.locator('.experience-detail-prose')).toContainText('PostgreSQL');

  const backend = page.locator('[data-architecture="backend"]');
  await expect(backend).toContainText('FastAPI Router');
  expect(await backend.locator('.experience-architecture__step h3').allTextContents()).toEqual([
    'FastAPI Router', 'Kiểm tra dữ liệu', 'Service', 'Data Access', 'PostgreSQL',
  ]);
  await expect(backend).toContainText('endpoint');
  await expect(backend).toContainText('logic nghiệp vụ');
  await expect(backend).toContainText('truy vấn dữ liệu');

  const frontend = page.locator('[data-architecture="frontend"]');
  expect(await frontend.locator('.experience-architecture__step h3').allTextContents()).toEqual([
    'Angular Page / Component', 'Trạng thái và logic giao diện', 'API Service', 'FastAPI',
  ]);
  await expect(frontend).toContainText('request HTTP');

  const images = page.locator('.experience-detail__media img');
  await expect(images).toHaveCount(2);
  await expect(images.nth(0)).toHaveAttribute('alt', 'Khuôn viên campus F-Ville 2 của FPT Software tại Hòa Lạc');
  await expect(images.nth(1)).toHaveAttribute('alt', 'Logo FPT với biểu trưng chữ FPT màu xanh lam, xanh lá và cam');
  for (const image of await images.all()) {
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }

  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    const dimensions = await page.locator('html').evaluate((element) => ({ client: element.clientWidth, scroll: element.scrollWidth }));
    expect(dimensions.scroll, width + 'px FPT Fresher detail').toBeLessThanOrEqual(dimensions.client);
  }

  await page.reload();
  await expect(page.locator('main h1')).toHaveText('Full-stack Developer Fresher');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const theme of ['dark', 'light']) {
    await page.evaluate((value) => { document.documentElement.dataset.theme = value; }, theme);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations.map((violation) => ({
      id: violation.id,
      targets: violation.nodes.map((node) => node.target),
    })), 'FPT Fresher detail / ' + theme).toEqual([]);
  }
});

test('background music counts down from five and starts after five seconds', async ({ page }) => {
  await page.goto(APP);

  const notice = page.getByRole('status');
  const countdown = page.locator('[data-countdown]');
  await expect(notice).toBeVisible();
  await expect(notice).toContainText('Nhạc nền sẽ được phát sau');
  await expect(countdown).toHaveText('5');
  await expect.poll(() => page.evaluate(() => (window as unknown as { __portfolioAudioPlayCalls: number }).__portfolioAudioPlayCalls)).toBe(0);

  for (const seconds of ['4', '3', '2', '1']) {
    await expect(countdown).toHaveText(seconds, { timeout: 1500 });
  }

  await expect.poll(() => page.evaluate(() => (window as unknown as { __portfolioAudioPlayCalls: number }).__portfolioAudioPlayCalls), { timeout: 3000 }).toBe(1);
  await expect(page.locator('[data-ambient-player]')).toHaveAttribute('data-playing', 'true');
  await expect(notice).toBeHidden();
});

test('canceling autoplay keeps music off across internal navigation', async ({ page }) => {
  await page.goto(APP);
  const cancelButton = page.getByRole('button', { name: 'Bấm để không phát nhạc' });
  await expect(page.locator('[data-countdown]')).toHaveText('5');
  await cancelButton.click();
  await expect(page.getByRole('status')).toBeHidden();

  await page.getByRole('link', { name: 'Dự án' }).first().click();
  await expect(page).toHaveURL(/\/portfolio\/projects\/$/);
  await page.waitForTimeout(5200);

  await expect.poll(() => page.evaluate(() => (window as unknown as { __portfolioAudioPlayCalls: number }).__portfolioAudioPlayCalls)).toBe(0);
  await expect(page.locator('[data-ambient-player]')).toHaveAttribute('data-playing', 'false');
});

test('a full page reload starts a fresh music countdown', async ({ page }) => {
  await page.goto(APP);
  const countdown = page.locator('[data-countdown]');
  await expect(countdown).toHaveText('5');
  await expect(countdown).toHaveText('4', { timeout: 1500 });

  await page.reload();
  await expect(countdown).toHaveText('5');
  await expect.poll(() => page.evaluate(() => (window as unknown as { __portfolioAudioPlayCalls: number }).__portfolioAudioPlayCalls)).toBe(0);
  await expect.poll(() => page.evaluate(() => (window as unknown as { __portfolioAudioPlayCalls: number }).__portfolioAudioPlayCalls), { timeout: 6500 }).toBe(1);
});

test('blocked autoplay shows a play hint and the player provides keyboard audio controls', async ({ page }) => {
  await page.goto(APP + '?audio-play-results=blocked,playing');
  const notice = page.getByRole('status');
  await expect(notice).toContainText('Trình duyệt đã chặn tự phát. Bấm phát để nghe nhạc.', { timeout: 6500 });
  await expect.poll(() => page.evaluate(() => (window as unknown as { __portfolioAudioPlayCalls: number }).__portfolioAudioPlayCalls)).toBe(1);

  const audio = page.locator('[data-audio]');
  const playButton = page.getByRole('button', { name: 'Phát nhạc nền' });
  await playButton.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Tạm dừng nhạc nền' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => (window as unknown as { __portfolioAudioPlayCalls: number }).__portfolioAudioPlayCalls)).toBe(2);
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
  await expect.poll(() => page.evaluate(() => (window as unknown as { __portfolioAudioPlayCalls: number }).__portfolioAudioPlayCalls), { timeout: 6500 }).toBe(1);

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
  await expect.poll(() => page.evaluate(() => (window as unknown as { __portfolioAudioPlayCalls: number }).__portfolioAudioPlayCalls), { timeout: 6500 }).toBe(1);
  await expect(page.locator('[data-ambient-player]')).toHaveAttribute('data-playing', 'true');
  const persistedElement = await page.evaluate(() => (
    document.querySelector('[data-audio]') ===
    (window as Window & { __portfolioAudioElement?: HTMLAudioElement }).__portfolioAudioElement
  ));
  expect(persistedElement).toBe(true);
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
  await expect(cards).toHaveCount(5);
  await expect(cards.locator('[data-status]')).toHaveCount(0);
  const mobileAi = page.getByRole('button', { name: 'Mobile & AI' });
  await mobileAi.click();
  await expect(cards.filter({ visible: true })).toHaveCount(3);
  await expect(page.getByText('Đang hiển thị 3 dự án.')).toBeAttached();
  await page.getByRole('button', { name: 'Tất cả' }).click();
  await expect(cards.filter({ visible: true })).toHaveCount(5);

  const noScript = await browser.newPage({ javaScriptEnabled: false });
  await noScript.goto(APP + 'projects/');
  await expect(noScript.locator('[data-filter-bar]')).toBeHidden();
  await expect(noScript.locator('[data-ambient-player]')).toBeHidden();
  await expect(noScript.locator('[data-project-card]')).toHaveCount(5);
  await expect(noScript.locator('[data-project-card] [data-status]')).toHaveCount(0);
  await noScript.close();
});

test('Study2Work project and case separate product vision from source status', async ({ page }) => {
  await page.goto(APP + 'projects/study2work-contracts/');
  await expect(page.getByRole('heading', { name: 'Study2Work · Từ học tập đến cơ hội nghề nghiệp' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Tôi định hình sản phẩm và dẫn dắt kỹ thuật' })).toBeVisible();
  await expect(page.getByText('Tôi trực tiếp coding codebase và các API #1–8, #48–103.')).toBeVisible();
  await expect(page.getByText(/user-attested|do người sở hữu xác nhận|theo xác nhận cá nhân/i)).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Tám deployable units, trạng thái theo từng phần' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Chưa có demo hoặc production' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Mở mã nguồn Study2Work/ })).toHaveAttribute(
    'href',
    'https://github.com/daovanhung-dev/Study2Work',
  );
  await expect(page.getByText(/AI matching, AI tutor/i)).toBeVisible();
  await expect(page.getByText(/#99–103 có tài liệu DD nhưng chưa có route/i).first()).toBeVisible();

  await page.goto(APP + 'case-studies/study2work-contracts-runtime/');
  await expect(page.getByRole('heading', { name: 'Study2Work — Thiết kế hệ thống từ học tập đến việc làm' })).toBeVisible();
  await expect(page.getByText('Tôi trực tiếp coding codebase và các API #1–8, #48–103.')).toBeVisible();
  await expect(page.getByText(/user-attested|do người sở hữu xác nhận|theo xác nhận cá nhân/i)).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Quyết định' })).toBeVisible();
});

test('case navigation, reduced motion, and private project boundaries render correctly', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(APP + 'case-studies/nanobio-local-cloud-ai/');
  await expect(page.getByRole('navigation', { name: 'Trong case study' }).getByRole('link', { name: 'Quyết định' })).toBeVisible();
  await expect(page.getByText(/MISSING_SOURCE|tự xác nhận|tự thuật|unverified|chưa được cung cấp|mức attribution/i)).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Phạm vi', level: 2 })).toBeVisible();
  const scrollBehavior = await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior);
  expect(scrollBehavior).toBe('auto');

  const removedProject = await page.goto(APP + 'projects/privacy-safe-story-delivery/');
  expect(removedProject?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Không tìm thấy trang này.' })).toBeVisible();
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
    '', 'projects/', 'projects/nanobio-local-cloud/', 'projects/study2work-contracts/', 'experience/', 'experience/maiatech/', 'skills/',
    'labs/', 'about/', 'contact/', 'case-studies/nanobio-local-cloud-ai/', 'case-studies/study2work-contracts-runtime/',
  ];
  const widths = [360, 390, 768, 1024, 1280, 1440];
  for (const path of paths) {
    await page.goto(APP + path);
    await expect(page.locator('main h1').first()).toBeVisible();
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        page: document.documentElement.scrollWidth,
      }));
      expect(dimensions.page, width + 'px on ' + path).toBeLessThanOrEqual(dimensions.viewport);
    }
  }
});

test('representative routes pass automated accessibility checks', async ({ page }) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const path of ['', 'projects/', 'projects/study2work-contracts/', 'experience/', 'experience/maiatech/', 'about/', 'case-studies/nanobio-local-cloud-ai/', 'case-studies/study2work-contracts-runtime/', 'contact/']) {
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
  await page.getByRole('button', { name: 'Bấm để không phát nhạc' }).click();
  await page.screenshot({ path: 'docs/redesign/screenshots/desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'docs/redesign/screenshots/mobile.png', fullPage: true });
});
