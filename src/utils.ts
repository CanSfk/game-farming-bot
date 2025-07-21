/**
 * Belirtilen süre kadar bekler.
 *
 * @param delay Bekleme süresi (ms), varsayılan 0.
 * @param signal Bir AbortSignal nesnesi. Sinyal tetiklenirse bekleme iptal edilir.
 */
export const wait = (delay: number = 0, signal?: AbortSignal): Promise<void> => {
  return new Promise<void>((resolve) => {
    if (signal && signal.aborted) resolve();

    const onAbort = () => {
      clearTimeout(timeId);

      resolve();
    };

    if (signal) signal.addEventListener('abort', onAbort, { once: true });

    const timeId = setTimeout(() => {
      if (signal) signal.removeEventListener('abort', onAbort);

      resolve();
    }, delay);
  });
};

/**
 * Konsola gerçekleşen aksiyonu zaman damgasıyla birlikte yazar.
 *
 * @param action Gerçekleşen aksiyonun açıklaması.
 */
export const consoleActionMessage = (action: string): void => {
  console.log('TIME: ', new Date().toLocaleTimeString(), '\t\t Action: ', action);
};

/**
 * Konsol ekranında belirtilen sayıda boş satır ekler.
 *
 * @param count Eklenecek boş satır sayısı (varsayılan: 1).
 */
export const consoleLineSpacing = (count: number = 1): void => {
  let spacing = '';

  if (count > 1) spacing = '\n'.repeat(count - 1);

  console.log(spacing);
};
