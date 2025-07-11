import { describe, it, expect } from 'vitest';

import { pluralize } from './pluralize';

describe('pluralize', () => {
  it('should return singular for count of 1', () => {
    expect(pluralize(1, 'byte', 'bytes')).toBe('byte');
    expect(pluralize(1, 'transaction', 'transactions')).toBe('transaction');
    expect(pluralize(1, 'block', 'blocks')).toBe('block');
    expect(pluralize(1, 'miner', 'miners')).toBe('miner');
  });

  it('should return plural for count of 0', () => {
    expect(pluralize(0, 'byte', 'bytes')).toBe('bytes');
    expect(pluralize(0, 'transaction', 'transactions')).toBe('transactions');
    expect(pluralize(0, 'block', 'blocks')).toBe('blocks');
    expect(pluralize(0, 'miner', 'miners')).toBe('miners');
  });

  it('should return plural for count greater than 1', () => {
    expect(pluralize(2, 'byte', 'bytes')).toBe('bytes');
    expect(pluralize(10, 'transaction', 'transactions')).toBe('transactions');
    expect(pluralize(100, 'block', 'blocks')).toBe('blocks');
    expect(pluralize(1000, 'miner', 'miners')).toBe('miners');
  });

  it('should handle negative counts', () => {
    expect(pluralize(-1, 'byte', 'bytes')).toBe('byte');
    expect(pluralize(-5, 'transaction', 'transactions')).toBe('transactions');
    expect(pluralize(-10, 'block', 'blocks')).toBe('blocks');
  });

  it('should handle decimal numbers', () => {
    expect(pluralize(0.5, 'byte', 'bytes')).toBe('bytes');
    expect(pluralize(1.0, 'transaction', 'transactions')).toBe('transaction');
    expect(pluralize(1.5, 'block', 'blocks')).toBe('blocks');
    expect(pluralize(2.7, 'miner', 'miners')).toBe('miners');
  });

  it('should handle edge cases', () => {
    expect(pluralize(Number.MAX_SAFE_INTEGER, 'byte', 'bytes')).toBe('bytes');
    expect(
      pluralize(Number.MIN_SAFE_INTEGER, 'transaction', 'transactions')
    ).toBe('transactions');
    expect(pluralize(Infinity, 'block', 'blocks')).toBe('blocks');
    expect(pluralize(-Infinity, 'miner', 'miners')).toBe('miners');
    expect(pluralize(NaN, 'byte', 'bytes')).toBe('bytes');
  });

  it('should handle different word forms', () => {
    // Regular plurals
    expect(pluralize(1, 'child', 'children')).toBe('child');
    expect(pluralize(2, 'child', 'children')).toBe('children');

    // Irregular plurals
    expect(pluralize(1, 'person', 'people')).toBe('person');
    expect(pluralize(2, 'person', 'people')).toBe('people');

    // Same singular and plural
    expect(pluralize(1, 'sheep', 'sheep')).toBe('sheep');
    expect(pluralize(2, 'sheep', 'sheep')).toBe('sheep');

    // Words ending in 'y'
    expect(pluralize(1, 'city', 'cities')).toBe('city');
    expect(pluralize(2, 'city', 'cities')).toBe('cities');
  });

  it('should handle empty strings', () => {
    expect(pluralize(1, '', '')).toBe('');
    expect(pluralize(2, '', '')).toBe('');
    expect(pluralize(1, 'word', '')).toBe('word');
    expect(pluralize(2, 'word', '')).toBe('');
  });

  it('should handle special characters and spaces', () => {
    expect(pluralize(1, 'test-word', 'test-words')).toBe('test-word');
    expect(pluralize(2, 'test-word', 'test-words')).toBe('test-words');
    expect(pluralize(1, 'test word', 'test words')).toBe('test word');
    expect(pluralize(2, 'test word', 'test words')).toBe('test words');
  });
});
