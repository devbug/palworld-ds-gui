import { describe, expect, test } from 'vitest';
import {
  isConfigValueChanged,
  parsePlatformList,
  serializePlatformList
} from './config-values';
import { ConfigKey } from '../types/server-config';

describe('isConfigValueChanged', () => {
  test('treats numeric strings and numbers as equal', () => {
    // ExpRate 기본값 1
    expect(isConfigValueChanged(ConfigKey.ExpRate, 1)).toBe(false);
    expect(isConfigValueChanged(ConfigKey.ExpRate, '1')).toBe(false);
    expect(isConfigValueChanged(ConfigKey.ExpRate, '1.000000')).toBe(false);
    expect(isConfigValueChanged(ConfigKey.ExpRate, '2')).toBe(true);
    expect(isConfigValueChanged(ConfigKey.ExpRate, 0.5)).toBe(true);
  });

  test('compares booleans exactly', () => {
    // bIsPvP 기본값 false, bUseAuth 기본값 true
    expect(isConfigValueChanged(ConfigKey.bIsPvP, false)).toBe(false);
    expect(isConfigValueChanged(ConfigKey.bIsPvP, true)).toBe(true);
    expect(isConfigValueChanged(ConfigKey.bUseAuth, true)).toBe(false);
    expect(isConfigValueChanged(ConfigKey.bUseAuth, false)).toBe(true);
  });

  test('compares strings exactly', () => {
    // Difficulty 기본값 'None'
    expect(isConfigValueChanged(ConfigKey.Difficulty, 'None')).toBe(false);
    expect(isConfigValueChanged(ConfigKey.Difficulty, 'Hard')).toBe(true);
    // ServerDescription 기본값 ''
    expect(isConfigValueChanged(ConfigKey.ServerDescription, '')).toBe(false);
    expect(isConfigValueChanged(ConfigKey.ServerDescription, 'hi')).toBe(true);
  });

  test('compares platform tuples as sets (order-insensitive)', () => {
    // CrossplayPlatforms 기본값 '(Steam,Xbox,PS5,Mac)'
    expect(
      isConfigValueChanged(ConfigKey.CrossplayPlatforms, '(Steam,Xbox,PS5,Mac)')
    ).toBe(false);
    expect(
      isConfigValueChanged(ConfigKey.CrossplayPlatforms, '(Mac,PS5,Xbox,Steam)')
    ).toBe(false);
    expect(
      isConfigValueChanged(ConfigKey.CrossplayPlatforms, '(Steam,Mac)')
    ).toBe(true);
  });

  test('handles NaN-producing input as changed', () => {
    expect(isConfigValueChanged(ConfigKey.ExpRate, 'abc')).toBe(true);
  });
});

describe('parsePlatformList', () => {
  test('parses a parenthesized tuple into a list', () => {
    expect(parsePlatformList('(Steam,Xbox,PS5,Mac)')).toEqual([
      'Steam',
      'Xbox',
      'PS5',
      'Mac'
    ]);
  });

  test('handles a single platform and whitespace', () => {
    expect(parsePlatformList('(Steam)')).toEqual(['Steam']);
    expect(parsePlatformList('( Steam, Xbox )')).toEqual(['Steam', 'Xbox']);
  });

  test('handles values without parentheses and empty values', () => {
    expect(parsePlatformList('Steam,Xbox')).toEqual(['Steam', 'Xbox']);
    expect(parsePlatformList('')).toEqual([]);
    expect(parsePlatformList('()')).toEqual([]);
  });
});

describe('serializePlatformList', () => {
  test('serializes back to the game tuple format', () => {
    expect(serializePlatformList(['Steam', 'Xbox'])).toBe('(Steam,Xbox)');
  });

  test('round-trips with parsePlatformList', () => {
    const original = '(Steam,Xbox,PS5,Mac)';

    expect(serializePlatformList(parsePlatformList(original))).toBe(original);
  });
});
