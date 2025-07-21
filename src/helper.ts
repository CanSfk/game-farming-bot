import fs from 'fs';
import path from 'path';
import * as readline from 'readline';

// Utils
import { consoleLineSpacing, wait } from '@/utils.js';

// Types
import { TSettings } from '@/types/settings.js';
import { TActions } from '@/types/actions.js';

// Mappings
import { ACTION_MAP } from '@/mappings/action-map.js';

// Shared State
import { getAbortSignal, getLoopRunning, setAbortController, setLoopRunning } from '@/shared-state';

const isPkg = typeof process.pkg !== 'undefined';

let actionsJsonPath: string;
let settingsJsonPath: string;

if (isPkg) {
  actionsJsonPath = path.join(path.dirname(process.execPath), 'jsons', 'actions.json');
  settingsJsonPath = path.join(path.dirname(process.execPath), 'jsons', 'settings.json');
} else {
  actionsJsonPath = path.join(process.cwd(), 'src', 'jsons', 'actions.json');
  settingsJsonPath = path.join(process.cwd(), 'src', 'jsons', 'settings.json');
}

var actionsJson = JSON.parse(fs.readFileSync(actionsJsonPath, 'utf8'));
var settingsJson = JSON.parse(fs.readFileSync(settingsJsonPath, 'utf8'));

/**
 * Belirtilen anahtar için tekrar süresi dolmadıysa bekler.
 */
interface IWaitIfNeeded {
  map: Map<string | number, Date>;
  id: string | number;
  timeOfAgain: number;
}
export const waitIfNeeded = async ({ map, id, timeOfAgain }: IWaitIfNeeded): Promise<void> => {
  if (map.has(id) && timeOfAgain > 0) {
    const elapsed = Date.now() - map.get(id)!.getTime();

    if (elapsed < timeOfAgain) {
      await wait(timeOfAgain - elapsed, getAbortSignal());
    }
  }
};

/**
 * Ayarlardan okunan değerlere göre bir işlemin kaç defa tekrarlanacağını hesaplar.
 *
 * @returns [number, number] Döngünün başlangıç ve bitiş değerlerini içeren bir tuple.
 */
export const calculationNumberOfLoop = (): [number, number] => {
  const settings = settingsJson as TSettings;

  const max = settings.isLoop ? (settings.countOfLoop === 0 ? Infinity : settings.countOfLoop) : 1;

  return [0, max];
};

/**
 * Tanımlanmış aksiyonları (eylemleri) sırasıyla çalıştırır.
 * Her bir aksiyon, tipine göre belirlenen ilgili fonksiyona yönlendirilir ve parametreleriyle birlikte çağrılır.
 *
 * @returns {Promise<void>} Aksiyonların tamamlanmasını bekleyen bir Promise.
 */
export const runActions = async (): Promise<void> => {
  for (const action of actionsJson as TActions[]) {
    const fn = ACTION_MAP[action.type];

    if (typeof fn !== 'function') continue;

    await fn(action.params as any);

    if (!getLoopRunning()) break;
  }

  consoleLineSpacing();
};

/**
 * Uygulama başlamadan önce çalıştırılan geri sayım fonksiyonu.
 *
 * @param count Baslangic saniyesi
 *
 * @returns {Promise<void>} Sayimin tamamlanmasını bekleyen bir Promise.
 */
export const countdown = async (): Promise<void> => {
  let cnt = (settingsJson as TSettings).secondOfCountdown;

  console.log(cnt);

  let intervalId: NodeJS.Timeout;

  return new Promise<void>((resolve) => {
    const signal = getAbortSignal();
    if (signal && signal.aborted) resolve();

    const onAbort = () => {
      clearInterval(intervalId);

      resolve();
    };

    if (signal) signal.addEventListener('abort', onAbort, { once: true });

    intervalId = setInterval(() => {
      cnt--;

      console.log(cnt);

      if (cnt <= 0) {
        clearInterval(intervalId);

        if (signal) signal.removeEventListener('abort', onAbort);

        resolve();
      }
    }, 1000);
  });
};

/**
 * Esc tuşuna basıldığında Node.js sürecini sonlandıran bir dinleyici başlatır.
 * Terminalin ham moda alınmasını gerektirir.
 */
export const enableExitOnEsc = (): void => {
  readline.emitKeypressEvents(process.stdin);

  // stdin ham moda ayarlaniyor (Windows icin)
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }

  process.stdin.resume();

  process.stdin.on('keypress', (str, key) => {
    if ((key && key.name === 'escape') || str === '\u001b') {
      consoleLineSpacing();
      console.log('ESC tuşuna basıldı, uygulama sonlandırılıyor...');

      setAbortController();
      setLoopRunning(false);

      process.exit(0);
    }
  });

  console.log("Uygulamadan çıkmak için 'Esc' tuşuna basın.");
};
