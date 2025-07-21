// Actions
import { delayFn, keywordFn, mouseFn } from '@/actions/index.js';

export const ACTION_MAP = {
  keyword: keywordFn,
  delay: delayFn,
  mouse: mouseFn,
} as const;
