// src/providers/MSWComponent.tsx

"use client";

import { useEffect, useState } from "react";
import { initMocks } from "@/mocks";

// msw가 준비되면 children을 렌더링해
export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  // useState 부분 -> 서버 컴포넌트에서 실행??? X
  // mswReady: false라는 세팅까지는 됨
  // 개발환경이 아니면(production환경이면 -> 배포하면) mswReady를 true로 세팅한다.
  const [mswReady, setMswReady] = useState(
    process.env.NODE_ENV === "production",
  );
  // 개발환경 vs 배포 환경 -> 차이가 나게 된다. => 개발할 때는 잘 되다가 배포했더니 안돼....!

  // 서버 컴포넌트에서 실행 됨?? -> X
  useEffect(() => {
    const init = async () => {
      await initMocks();
      setMswReady(true);
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  // !mswReady: !false
  if (!mswReady) {
    return null; // 얘가 서버에서 렌더링됨
  }
  return <>{children}</>;
};
