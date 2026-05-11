import "@testing-library/jest-dom";
import { server } from "./src/mocks/server";

// 모든 테스트 전에 서버를 실행한다.
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
