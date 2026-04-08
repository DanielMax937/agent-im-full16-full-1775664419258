import { describe, expect, it } from 'vitest';
import { FULL16_TASK_ID, getFull16TaskId } from './full16.js';

describe('full16 public happy path', () => {
  it('exposes the FULL16 task id', () => {
    expect(getFull16TaskId()).toBe(FULL16_TASK_ID);
    expect(FULL16_TASK_ID).toBe('FULL16-full-1775664419258');
  });
});
