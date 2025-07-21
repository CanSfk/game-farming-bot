// Robot Js
import * as robot from 'robotjs';

// Interfaces
import { IMouseFnParams } from '@/interfaces/actions.js';

// Utils
import { consoleActionMessage, wait } from '@/utils.js';

// Helpers
import { waitIfNeeded } from '@/helper.js';

/**
 * Fare olaylarında tekrarlanan aksiyonların (örneğin aynı noktaya tıklama)
 * son gerçekleşme zamanlarını takip eden Map nesnesi.
 */
const lastRecordedTime = new Map<string | number, Date>();

/**
 * Belirtilen koordinatlara fareyi hareket ettirir ve tıklar.
 * İhtiyaç duyulursa önceden belirlenen bir bekleme süresini uygular.
 *
 * @param params.id Bekleme suresi icin kullanilacak deger.
 * @param params.x X koordinatı.
 * @param params.y Y koordinatı.
 * @param params.timeOfAgain Aynı noktaya tekrar tıklamak için beklenecek minimum süre.
 */
export const mouseFn = async ({ id, x, y, timeOfAgain }: IMouseFnParams): Promise<void> => {
  await waitIfNeeded({ map: lastRecordedTime, id, timeOfAgain });

  robot.moveMouse(x, y);

  await wait(500);

  robot.mouseClick();

  lastRecordedTime.set(id, new Date());

  consoleActionMessage(`${id} x:${x} - y:${y} was clicked`);
};
