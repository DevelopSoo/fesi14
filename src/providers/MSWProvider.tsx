// src/providers/MSWProvider.tsx

"use client";

import { Suspense, use } from "react";
import { initMocks } from "@/mocks";

// 0. 전역에 설정하여 딱 한 번만 실행되도록 설정
// 1. 서버사이드에서 실행될 경우 즉시 Promise를 완료시켜 자식 컴포넌트가 즉시 렌더링될 수 있도록 한다.
// 2. 클라이언트 사이드에서 실행될 경우 Promise를 반환하는 initMocks 함수가 완료될 때까지 기다린다.
const mockingEnabledPromise =
  typeof window === "undefined" ? Promise.resolve() : initMocks();

// 3. use 훅을 사용하여 mockingEnabledPromise가 완료될 때까지 기다린다. (Suspense의 fallback이 표시됨)
// 4. Promise가 완료되면 자식 컴포넌트를 렌더링한다.
function MSWProviderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // use: Promise 가 완료될 때까지 기다려주는 훅
  use(mockingEnabledPromise);
  return children;
}

// 5. Suspense 컴포넌트를 사용하여 MSWProviderWrapper가 비동기 작업이 완료될 때까지 대기하도록 감싼다.
export function MSWProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={null}>
      {/* 비동기 작업이 완료될 때까지 fallback을 보여주는 역할 */}
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
}
