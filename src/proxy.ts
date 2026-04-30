// src/proxy.ts

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 페이지 접근 전에 실행되는 함수다.
export async function proxy(request: NextRequest) {
  // 자기들 메모리에 저장 X
  // 브라우저에 저장하라고 시키는 것
  // 자유롭게 꺼내서 쓸 수 있는 형태 (어디에 저장되지?)
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.log("페이지 렌더링 전 여기서 먼저 처리해버림");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mypage"], // mypage 로 접근하면 위에 있는 함수 실행해줄게
};
