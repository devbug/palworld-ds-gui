import { defineConfig } from 'vitest/config';

// 앱 빌드 플러그인(react-swc, compression) 없이 순수 TS 테스트만 돌리도록
// 테스트 전용 설정을 분리한다.
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts']
  }
});
