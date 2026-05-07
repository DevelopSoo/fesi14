// app/loading.tsx
// 예약 파일
// page.tsx, layout.tsx, proxy.ts, ... 이미 정해진 규칙의 파일

// 1. 사용자가 페이지를 요청한다
// 2. 서버에서 페이지를 만든다. (2초) -> 야 일단 loading.tsx 먼저 보고 있어~
// 3. 서버가 사용자에게 페이지를 보낸다. (1초)
// 4. 사용자가 페이지를 본다. (총 3초)
export default function Loading() {
  return (
    <div className="w-80 rounded-lg bg-white p-6 shadow">
      <div className="flex animate-pulse items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-3 w-1/2 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

// loading.tsx 는 페이지가 로드될 때까지 잠시 보여준다.
