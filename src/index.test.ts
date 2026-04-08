import { describe, expect, it } from 'vitest';
import { FULL16_TASK_ID, getFull16TaskId } from './index.js';

describe('package public entry', () => {
  it('re-exports the full16 public API from the package root', () => {
    expect(getFull16TaskId()).toBe(FULL16_TASK_ID);
    expect(FULL16_TASK_ID).toBe('FULL16-full-1775664419258');
  });
});
