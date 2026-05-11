import { render, screen } from "@testing-library/react";
import { Button } from ".";
import userEvent from "@testing-library/user-event";

test("버튼을 클릭하면 onClick 함수가 호출되는지 확인", async () => {
  const user = userEvent.setup();
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>버튼내용</Button>);

  // 버튼 클릭
  const button = screen.getByText("버튼내용");
  await user.click(button);

  // 버튼의 호출 여부
  expect(handleClick).toHaveBeenCalledTimes(1);
});
