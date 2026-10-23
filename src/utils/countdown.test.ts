import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTimeRemaining, padZero } from './countdown.ts';

test('padZero formats single and double digits correctly', () => {
  assert.equal(padZero(5), '05');
  assert.equal(padZero(0), '00');
  assert.equal(padZero(18), '18');
  assert.equal(padZero(99), '99');
});

test('calculateTimeRemaining calculates future delta accurately', () => {
  const current = new Date('2026-10-18T12:00:00Z');
  const target = new Date('2026-10-20T14:30:15Z'); // 2 days, 2 hours, 30 mins, 15 secs

  const result = calculateTimeRemaining(target, current);

  assert.equal(result.days, 2);
  assert.equal(result.hours, 2);
  assert.equal(result.minutes, 30);
  assert.equal(result.seconds, 15);
  assert.equal(result.isPassed, false);
});

test('calculateTimeRemaining detects birthday day correctly', () => {
  const target = new Date('2026-11-03T00:00:00');
  const onBirthday = new Date('2026-11-03T08:30:00');

  const result = calculateTimeRemaining(target, onBirthday);

  assert.equal(result.isToday, true);
  assert.equal(result.days, 0);
  assert.equal(result.hours, 0);
  assert.equal(result.minutes, 0);
  assert.equal(result.seconds, 0);
});
