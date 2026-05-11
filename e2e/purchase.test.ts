// e2e/purchase.test.ts

import { test, expect } from "@playwright/test";

test("로그인 후 구매까지의 시나리오", async ({ page }) => {
  // 1. 로그인 페이지에 접속한다.
  await page.goto("/auth/login");
  // 2. 이메일 입력창에 abc@test.com을 입력한다.
  await page.getByRole("textbox", { name: "이메일" }).fill("abc@test.com");
  // 3. 비밀번호 입력창에 123123을 입력한다.
  await page.getByRole("textbox", { name: "비밀번호" }).fill("123123");
  // 4. 로그인 버튼을 클릭한다. 자동으로 상품 목록 페이지로 이동한다.
  await page.getByRole("button", { name: "로그인" }).click();
  // 5. 상품 페이지에 접속했는지 확인한다.
  await expect(page).toHaveURL("/products");

  // 6. 상품의 첫 번째를 찾고 싶어
  // testid 중 product- 로 시작하는 놈 중 첫 번째를 찾아라
  const firstProduct = page.locator("[data-testid^='product-']").first();
  await expect(firstProduct).toBeVisible();

  const productId = await firstProduct.getAttribute("data-product-id");
  await firstProduct.click();

  // 상품 상세로 이동했는지 확인
  // /products/20
  await expect(page).toHaveURL(`/products/${productId}`);
  // 10. 수량 증가 버튼을 2번 클릭한다.
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  // 11. 구매 버튼을 클릭한다.
  await page.getByRole("button", { name: "구매" }).click();

  await expect(page).toHaveURL("/purchase/complete");
  await expect(page.getByText("구매가 완료되었습니다")).toBeVisible();
});
