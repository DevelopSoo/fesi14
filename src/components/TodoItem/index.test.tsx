import { render, screen } from "@testing-library/react";
import TodoItem from ".";

test("할 일 항목 상태 테스트", () => {
  render(<TodoItem task="리액트 공부하기" completed={true} />);

  const taskText = screen.getByText("리액트 공부하기");
  // <span>{"리액트 공부하기"}</span>
  expect(taskText).toHaveTextContent("리액트 공부하기");

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).toBeChecked();

  expect(checkbox).toBeDisabled();

  const button = screen.getByRole("button", { name: "수정" });
  expect(button).toBeDisabled();

  const listItem = screen.getByRole("listitem");
  expect(listItem).toHaveClass("completed");
});
