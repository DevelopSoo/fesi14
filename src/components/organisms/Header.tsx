// src/components/organisms/Header.tsx

import SearchForm from "../molecules/SearchForm";
import Button from "../atoms/Button";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      {/* 분자 */}
      <SearchForm />
      <div className="flex items-center justify-center gap-4">
        {/* 네비게이션 메뉴 -> 분자 */}
        <Button>로그인</Button>
        <Button>회원가입</Button>
      </div>
    </header>
  );
}
