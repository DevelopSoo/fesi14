import { act, renderHook } from "@testing-library/react";
import { useInputs } from "./useInputs";

describe("useInputs 테스트", () => {
  test("초기값이 올바르게 설정되는지 확인", () => {
    const { result } = renderHook(() =>
      useInputs({
        name: "",
        nickname: "",
      }),
    );

    expect(result.current.values).toEqual({
      name: "",
      nickname: "",
    });
  });

  test("handleChange 함수가 값을 올바르게 업데이트하는지 확인", () => {
    const { result } = renderHook(() =>
      useInputs({
        email: "",
        password: "",
      }),
    );

    // handleChange의 인자로 들어가는 값
    const event = {
      target: {
        name: "email",
        value: "abc@naver.com",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(event);
    });

    expect(result.current.values.email).toBe("abc@naver.com");
  });

  test("handleChange 함수로 여러 값을 업데이트할 때 올바르게 동작하는지 확인", () => {
    const { result } = renderHook(() =>
      useInputs({
        email: "",
        password: "",
      }),
    );

    // handleChange의 인자로 들어가는 값
    const emailEvent = {
      target: {
        name: "email",
        value: "abc@naver.com",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    // handleChange의 인자로 들어가는 값
    const passwordEvent = {
      target: {
        name: "password",
        value: "123123123",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(emailEvent);
      result.current.handleChange(passwordEvent);
    });

    expect(result.current.values).toEqual({
      email: "abc@naver.com",
      password: "123123123",
    });
  });

  test("handleDelete 함수가 특정 필드를 올바르게 삭제하는지 확인", () => {
    const { result } = renderHook(() =>
      useInputs({
        email: "abc@naver.com",
        password: "123123123",
      }),
    );

    act(() => {
      result.current.handleDelete("email");
    });

    expect(result.current.values).toEqual({
      email: "",
      password: "123123123",
    });
  });
});
