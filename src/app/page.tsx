// src/app/page.tsx

'use client';

export default function Home() {
  return <div>환경: {process.env.NEXT_PUBLIC_MY_ENVIRONMENT}</div>;
}
