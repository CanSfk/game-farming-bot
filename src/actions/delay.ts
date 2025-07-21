// Interfaces
import { IDelayFnParams } from '@/interfaces/actions.js';

// Utils
import { consoleActionMessage, wait } from '@/utils.js';

/**
 * Bir sonraki aksiyona geçmeden önce belirtilen süre kadar bekler.
 * Bekleme süresi 0 veya daha az ise doğrudan devam eder.
 *
 * @param params.time Beklenecek süre (milisaniye cinsinden).
 */
export const delayFn = async ({ time }: IDelayFnParams): Promise<void> => {
  if (time <= 0) return;

  consoleActionMessage(`${time}ms waiting`);

  await wait(time);
};
