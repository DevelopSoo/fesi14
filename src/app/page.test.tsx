// src/app/page.test.tsx

import { render, screen } from "@testing-library/react";
import Home from "./page";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";

describe("MSW 모킹 테스트", () => {
  test("fetch API 모킹 테스트", async () => {
    render(<Home />);

    const postItem = await screen.findByText("1: 첫 번째 게시글");
    expect(postItem).toBeInTheDocument();
  });

  test("서버 에러 시 모킹 테스트", async () => {
    server.use(
      http.get("http://localhost:4000/posts/1", () => {
        return HttpResponse.json({ message: "실패" }, { status: 500 });
      }),
    );

    render(<Home />);

    const errorText =
      await screen.findByText("데이터를 불러오는데 실패했습니다.");
    expect(errorText).toBeInTheDocument();
  });

  test("네트워크 에러 발생 시 모킹 테스트", async () => {
    server.use(
      http.get("http://localhost:4000/posts/1", () => {
        return HttpResponse.error();
      }),
    );

    render(<Home />);

    const errorMessage =
      await screen.findByText("데이터를 불러오는데 실패했습니다.");

    // 에러 메시지가 화면에 잘 나오는지 확인
    expect(errorMessage).toBeInTheDocument();
  });
});
