import { fireEvent, render, screen } from "@testing-library/react";
import { LoginForm } from ".";

describe("LoginForm 컴포넌트 테스트", () => {
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let loginButton: HTMLButtonElement;
  beforeEach(() => {
    render(<LoginForm />);
    emailInput = screen.getByLabelText("이메일");
    passwordInput = screen.getByLabelText("비밀번호");
    loginButton = screen.getByRole("button", { name: "로그인" });
  });

  // 여기에서만 LoginForm 컴포넌트를 렌더링하고
  describe("버튼 활성화 상태 테스트", () => {
    test("로그인 폼의 이메일과 비밀번호가 입력되지 않으면 버튼이 비활성화되는지 확인", () => {
      expect(emailInput).toHaveValue("");
      expect(passwordInput).toHaveValue("");

      expect(loginButton).toBeDisabled();
    });

    test("이메일, 비밀번호를 입력 시 로그인 버튼이 활성화되는지 확인", () => {
      fireEvent.change(emailInput, { target: { value: "test" } });
      fireEvent.change(passwordInput, { target: { value: "test" } });

      expect(loginButton).toBeEnabled();
    });
  });

  // 다른 컴포넌트 렌더링을 하고 싶다.
  describe("유효성 검사 테스트", () => {
    test("이메일을 잘못 입력 시 '올바른 이메일 형식이 아닙니다.' 라는 에러 메세지가 표시되는지 확인", () => {
      fireEvent.change(emailInput, { target: { value: "invalid-email" } });

      const errorMessage = screen.getByText("올바른 이메일 형식이 아닙니다.");
      expect(errorMessage).toBeInTheDocument();
    });

    test("비밀번호 6자 미만 입력 시 '비밀번호는 6자 이상이어야 합니다.' 라는 에러 메세지가 표시되는지 확인", () => {
      fireEvent.change(passwordInput, { target: { value: "12312" } });

      const errorMessage = screen.getByText(
        "비밀번호는 6자 이상이어야 합니다.",
      );
      expect(errorMessage).toBeInTheDocument();
    });

    test("제대로 된 이메일 입력 시 에러 메세지가 사라지는지 확인", () => {
      // 1. 잘못된 이메일 입력 후 에러 메세지 나오는지 확인
      fireEvent.change(emailInput, { target: { value: "test" } });
      const errorMessage = screen.getByText("올바른 이메일 형식이 아닙니다.");
      expect(errorMessage).toBeInTheDocument();

      // 2. 올바른 이메일 입력 후 에러 메세지 사라지는지 확인
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  describe("로그인 API 호출 테스트", () => {
    test("로그인 버튼 클릭 후 로그인 성공 시 모달창이 나타나는지 확인", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ message: "로그인 성공!" }),
      }); // undefined

      fireEvent.change(emailInput, { target: { value: "abc@naver.com" } });
      fireEvent.change(passwordInput, { target: { value: "123123" } });

      fireEvent.click(loginButton);
      // API 호출 -> 잠시 기다렸다가 setShowModal(true)
      // -> 모달이 띄워진다.

      // 나올 때까지 기다려
      // getBy~~: 찾는데, 없으면 에러난다.
      // queryBy~~: 찾는데, 없어도 에러는 안나고, null을 반환한다.
      // findBy~~: 찾을 때까지 기다린다. (1000ms)
      const modal = await screen.findByText("로그인 성공"); // 마음이 급해
      expect(modal).toBeInTheDocument();
    });
  });
});
