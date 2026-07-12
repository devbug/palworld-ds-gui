import { ConfigKey, configDefaults, configTypes } from '../types/server-config';

// '(Steam,Xbox,PS5,Mac)' 형태의 튜플 값을 플랫폼 목록으로 변환한다.
export const parsePlatformList = (value: string): string[] => {
  const trimmed = (value ?? '').trim();
  const inner =
    trimmed.startsWith('(') && trimmed.endsWith(')')
      ? trimmed.substring(1, trimmed.length - 1)
      : trimmed;

  return inner
    .split(',')
    .map((platform) => platform.trim())
    .filter((platform) => platform.length > 0);
};

export const serializePlatformList = (platforms: string[]): string => {
  return `(${platforms.join(',')})`;
};

// 편집 중인 값은 문자열일 수 있으므로 선언된 타입 기준으로 정규화해
// 기본값과 의미상 같은지 비교한다.
export const isConfigValueChanged = (
  key: ConfigKey,
  value: unknown
): boolean => {
  const defaultValue = configDefaults[key];
  const type = configTypes[key];

  if (type === 'number') {
    const parsed =
      typeof value === 'number' ? value : parseFloat(String(value));

    if (isNaN(parsed)) return true;

    return parsed !== defaultValue;
  }

  if (type === 'boolean') {
    return Boolean(value) !== defaultValue;
  }

  if (type === 'tuple') {
    // 플랫폼 튜플은 순서와 무관하게 집합으로 비교한다.
    const current = new Set(parsePlatformList(String(value ?? '')));
    const defaults = new Set(parsePlatformList(String(defaultValue)));

    if (current.size !== defaults.size) return true;

    for (const platform of current) {
      if (!defaults.has(platform)) return true;
    }

    return false;
  }

  return String(value ?? '') !== String(defaultValue);
};
