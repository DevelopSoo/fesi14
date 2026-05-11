import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "./useFetch";

describe("useFetch 테스트", () => {
  test("데이터를 가져오고 데이터가 올바르게 설정되는지 확인", async () => {
    const mockData = { name: "건영" };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { result } = renderHook(() => useFetch("모킹 API 주소"));

    // 초기 상태 확인
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBeNull();
    });
  });

  test("404 에러 처리가 정상적으로 작동하는지 확인", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useFetch("모킹 API 주소"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeNull();
      expect(result.current.error).toBe("네트워크 응답이 정상적이지 않습니다");
    });
  });

  test("네트워크 에러 시 error 상태가 업데이트 되는지 확인", async () => {
    // fetch가 실패하는 경우를 모킹
    // 예를 들어, 네트워크 에러가 발생한 경우
    global.fetch = jest.fn().mockRejectedValue(new Error("네트워크 에러"));

    const { result } = renderHook(() =>
      useFetch("https://api.example.com/data"),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("네트워크 에러");
    });
  });
});
