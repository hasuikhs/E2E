export async function dragAndDrop(page, { target, to }) {
  await page.locator(target).dragTo(page.locator(to));
}
