import { expect, test, type Page } from "@playwright/test";

const TopicPages = [
  {
    path: "/fibonacci",
    input: "input-TermCount",
    invalidValue: "100001",
    finalTestId: "sequence-final-value",
  },
  {
    path: "/lucas-numbers",
    input: "input-TermCount",
    invalidValue: "100001",
    finalTestId: "sequence-final-value",
  },
  {
    path: "/tribonacci",
    input: "input-TermCount",
    invalidValue: "100001",
    finalTestId: "sequence-final-value",
  },
  {
    path: "/palindrome",
    input: "input-Candidate",
    invalidValue: "-1",
    finalTestId: "procedure-final-value",
  },
  {
    path: "/division",
    input: "input-FirstValue",
    invalidValue: "0",
    finalTestId: "procedure-final-value",
  },
  {
    path: "/euclidean",
    input: "input-FirstValue",
    invalidValue: "0",
    finalTestId: "procedure-final-value",
  },
  {
    path: "/collatz",
    input: "input-StartValue",
    invalidValue: "0",
    finalTestId: "sequence-final-value",
  },
] as const;

async function WaitForAppReady(page: Page) {
  await expect(page.locator("html")).toHaveAttribute("data-app-ready", "true");
}

test("landing page links navigate to every topic page", async ({ page }) => {
  await page.goto("/");
  await WaitForAppReady(page);

  for (const TopicPage of TopicPages) {
    const Slug = TopicPage.path.replace("/", "");
    const Card = page.getByTestId(`landing-card-${Slug}`);
    await expect(Card).toBeVisible();
    await Card.click();
    await expect(page).toHaveURL(new RegExp(`${TopicPage.path}$`));
    await page.goto("/");
  }
});

test("theme toggle changes colors and persists across reload", async ({ page }) => {
  await page.goto("/");
  await WaitForAppReady(page);

  const Html = page.locator("html");
  const ThemeToggle = page.getByTestId("theme-toggle");

  await expect(Html).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(8, 8, 26)");

  await ThemeToggle.click();

  await expect(Html).toHaveAttribute("data-theme", "light");
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(243, 240, 251)",
  );

  await page.reload();
  await expect(Html).toHaveAttribute("data-theme", "light");
});

for (const TopicPage of TopicPages) {
  test(`valid compute flow works for ${TopicPage.path}`, async ({ page }) => {
    await page.goto(TopicPage.path);
    await WaitForAppReady(page);
    await page.getByTestId("compute-button").click();

    const SkipButton = page.getByTestId("skip-button");
    await expect(SkipButton).toBeVisible();
    await SkipButton.click();

    await expect(page.getByTestId(TopicPage.finalTestId)).toBeVisible();

    await page.getByTestId("reset-button").click();
    await expect(page.getByTestId(TopicPage.finalTestId)).toHaveCount(0);
  });

  test(`invalid input is rejected for ${TopicPage.path}`, async ({ page }) => {
    await page.goto(TopicPage.path);
    await WaitForAppReady(page);
    await page.getByTestId(TopicPage.input).fill(TopicPage.invalidValue);
    await page.getByTestId("compute-button").click();

    const ValidationMessage = page.getByTestId("validation-message");
    await expect(ValidationMessage).not.toHaveText("");
  });
}

test("palindrome accepts letter input", async ({ page }) => {
  await page.goto("/palindrome");
  await WaitForAppReady(page);

  await page.getByTestId("input-Candidate").fill("Racecar");
  await page.getByTestId("compute-button").click();
  await page.getByTestId("skip-button").click();

  await expect(page.getByTestId("procedure-final-value")).toContainText("Palindrome");
});

test("mobile layout remains usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto("/");
  await WaitForAppReady(page);

  const LandingFitsViewport = await page.evaluate(() => {
    return document.documentElement.scrollWidth <= window.innerWidth + 1;
  });
  expect(LandingFitsViewport).toBeTruthy();

  await page.goto("/fibonacci");
  await WaitForAppReady(page);

  const TopicFitsViewport = await page.evaluate(() => {
    return document.documentElement.scrollWidth <= window.innerWidth + 1;
  });
  expect(TopicFitsViewport).toBeTruthy();
});
