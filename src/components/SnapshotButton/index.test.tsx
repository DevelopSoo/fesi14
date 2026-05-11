import { render } from "@testing-library/react";
import SnapshotButton from ".";

test("Button 컴포넌트 UI가 올바르게 렌더링되는지 확인", () => {
  const { container } = render(<SnapshotButton>클릭하세요</SnapshotButton>);
  expect(container).toMatchSnapshot();
});
