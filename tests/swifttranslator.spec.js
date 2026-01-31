const { test, expect } = require('@playwright/test');

const URL = 'https://www.swifttranslator.com/';

async function convertText(page, inputText) {
  await page.goto(URL, { waitUntil: 'networkidle' });

  const inputBox = page.locator('textarea[placeholder*="Type here"], textarea').first();
  const outputBox = page.locator('textarea[placeholder*="Sinhala Unicode"], textarea').last();

  await inputBox.waitFor({ state: 'visible' });

  await inputBox.fill('');
  
  if (inputText !== '') {
    await inputBox.pressSequentially(inputText, { delay: 10 });

    await expect(async () => {
      const val = await outputBox.inputValue();
      expect(val.length).toBeGreaterThan(0);
    }).toPass({ timeout: 15000 });
  }

  return await outputBox.inputValue();
}

/* ======================================================
  POSITIVE FUNCTIONAL TEST CASES (24)
====================================================== */

test('Pos_Fun_0001 - Simple sentence', async ({ page }) => {
  const output = await convertText(page, 'mama daen gedhara innaa.');
  expect(output.length).toBeGreaterThan(0);
});

test('Pos_Fun_0002 - Compound sentence', async ({ page }) => {
  const output = await convertText(page, 'mama kaema kaalaa passe nidagaththaa.');
  expect(output.length).toBeGreaterThan(0);
});

test('Pos_Fun_0003 - Complex sentence', async ({ page }) => {
  const output = await convertText(page, 'oya enavanam api ekka yamu.');
  expect(output.length).toBeGreaterThan(0);
});

test('Pos_Fun_0004 - Question form', async ({ page }) => {
  const output = await convertText(page, 'oya kohenda inne?');
  expect(output).toContain('?');
});

test('Pos_Fun_0005 - Command form', async ({ page }) => {
  const output = await convertText(page, 'issarahata yanna.');
  expect(output.length).toBeGreaterThan(0);
});

test('Pos_Fun_0006 - Negative sentence', async ({ page }) => {
  const output = await convertText(page, 'mama eeka danne nae.');
  expect(output.length).toBeGreaterThan(0);
});

test('Pos_Fun_0007 - Past tense', async ({ page }) => {
  const output = await convertText(page, 'api iye school giyaa.');
  expect(output.length).toBeGreaterThan(0);
});

test('Pos_Fun_0008 - Future tense', async ({ page }) => {
  const output = await convertText(page, 'mama heta exam ekata yanavaa.');
  expect(output.length).toBeGreaterThan(0);
});

test('Pos_Fun_0009 - Plural usage', async ({ page }) => {
  const output = await convertText(page, 'lamayi tika sellam karanavaa.');
  expect(output.length).toBeGreaterThan(0);
});

test('Pos_Fun_0010 - Pronoun variation', async ({ page }) => {
  const output = await convertText(page, 'eyaala gedhara giyaa.');
  expect(output.length).toBeGreaterThan(0);
});

test('Pos_Fun_0011 - Polite request', async ({ page }) => {
  const output = await convertText(page, 'karunakara mata udawwak denna puluwandha?');
  expect(output.length).toBeGreaterThan(0);
});

test('Pos_Fun_0012 - Slang expression', async ({ page }) => {
  const output = await convertText(page, 'ela machan supiri wadak!');
  expect(output).toContain('!');
});

test('Pos_Fun_0013 - Zoom meeting', async ({ page }) => {
  const output = await convertText(page, 'mama Zoom meeting ekata join wenavaa.');
  expect(output.toLowerCase()).toContain('zoom');
});

test('Pos_Fun_0014 - WhatsApp usage', async ({ page }) => {
  const output = await convertText(page, 'mata WhatsApp eken message ekak danna puluwandha?');
  expect(output.toLowerCase()).toContain('whatsapp');
});

test('Pos_Fun_0015 - OTP abbreviation', async ({ page }) => {
  const output = await convertText(page, 'mata OTP eka awa.');
  expect(output.toUpperCase()).toContain('OTP');
});

test('Pos_Fun_0016 - Currency format', async ({ page }) => {
  const output = await convertText(page, 'Rs. 500k wiyadam una.');
  expect(output).toContain('500');
});

test('Pos_Fun_0017 - Date format', async ({ page }) => {
  const output = await convertText(page, '25/12/2025 dina api yamu.');
  expect(output).toContain('25/12/2025');
});

test('Pos_Fun_0018 - Multiple spaces', async ({ page }) => {
  const output = await convertText(page, 'mama    gedhara    yanavaa.');
  expect(output.length).toBeGreaterThan(0);
});

test('Pos_Fun_0019 - Line break input', async ({ page }) => {
  const output = await convertText(page, 'mama gedhara yanavaa.\noya enne kawadda?');
  expect(output.length).toBeGreaterThan(0);
});

test('Pos_Fun_0020 - Long paragraph', async ({ page }) => {
  const longText = `adha ude idanma wahinawa nisaa api yanna hithapu gamanak nawaththanna una e nisaa mama office yanna parakku una`;
  const output = await convertText(page, longText);
  expect(output.length).toBeGreaterThan(20);
});

test('Pos_Fun_0021 - Greeting', async ({ page }) => {
  const output = await convertText(page, 'suba udasanak wewa!');
  expect(output.length).toBeGreaterThan(0);
});

test('Pos_Fun_0022 - Place name', async ({ page }) => {
  const output = await convertText(page, 'mama Colombo yanna hadanavaa.');
  expect(output.toLowerCase()).toContain('colombo');
});

test('Pos_Fun_0023 - Measurement unit', async ({ page }) => {
  const output = await convertText(page, 'mata kg 2k ganna ona.');
  expect(output.toLowerCase()).toContain('kg');
});

test('Pos_Fun_0024 - Repeated word', async ({ page }) => {
  const output = await convertText(page, 'hari hari api yamu.');
  expect(output.length).toBeGreaterThan(0);
});

/* ======================================================
  NEGATIVE FUNCTIONAL TEST CASES (10)
====================================================== */

test('Neg_Fun_0001 - Joined words', async ({ page }) => {
  const output = await convertText(page, 'mamageharayanavaa');
  expect(output.length).toBeGreaterThan(0);
});

test('Neg_Fun_0002 - Typo handling', async ({ page }) => {
  const output = await convertText(page, 'mmaa geedhara ynva');
  expect(output.length).toBeGreaterThan(0);
});

test('Neg_Fun_0003 - Special characters', async ({ page }) => {
  const output = await convertText(page, 'mama ### gedhara yanavaa!!!');
  expect(output).toContain('!!!');
});

test('Neg_Fun_0004 - Numbers only', async ({ page }) => {
  const output = await convertText(page, '123456789');
  expect(output).toContain('123456789');
});

test('Neg_Fun_0005 - Punctuation only', async ({ page }) => {
  const output = await convertText(page, '!!! ??? ...');
  expect(output).toContain('!');
});

test('Neg_Fun_0006 - Long joined word', async ({ page }) => {
  const output = await convertText(page, 'mamaofficeyanneparakkuuna');
  expect(output.length).toBeGreaterThan(0);
});

test('Neg_Fun_0007 - Empty input', async ({ page }) => {
  const output = await convertText(page, '');
  expect(output).toBe('');
});

test('Neg_Fun_0008 - Slang exaggeration', async ({ page }) => {
  const output = await convertText(page, 'ado machan eeka pattaaaa');
  expect(output.length).toBeGreaterThan(0);
});

test('Neg_Fun_0009 - ATM PIN command', async ({ page }) => {
  const output = await convertText(page, 'ATM PIN eka hariyata daanna');
  expect(output.toUpperCase()).toContain('ATM');
});

test('Neg_Fun_0010 - English start sentence', async ({ page }) => {
  const output = await convertText(page, 'please document eka send karanna');
  expect(output.length).toBeGreaterThan(0);
});

/* ======================================================
  UI TEST CASE (1)
====================================================== */

test('Pos_UI_0001 - Real-time update verification', async ({ page }) => {
  await page.goto(URL, { waitUntil: 'networkidle' });
  const inputBox = page.locator('textarea').first();
  const outputBox = page.locator('textarea').last();

  await inputBox.pressSequentially('m', { delay: 100 });
  await expect(async () => {
    const val = await outputBox.inputValue();
    expect(val.length).toBeGreaterThan(0);
  }).toPass();
});