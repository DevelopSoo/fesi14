import { render, screen } from "@testing-library/react";
import ProductItem from ".";

test("props에 전달된 title과 description이 제대로 렌더링되는지 확인", () => {
  const testTitle = "테스트 상품명";
  const testDescription = "테스트 상품 설명입니다.";

  render(<ProductItem title={testTitle} description={testDescription} />);

  const element = screen.getByText(testTitle);
  const descriptionElement = screen.getByText(testDescription);
  expect(element).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});
