// Robot Js
import robot from 'robotjs';

// Utils
import { consoleActionMessage } from '@/utils.js';

// Interfaces
import { IKeywordFnParams } from '@/interfaces/actions.js';

// Helpers
import { waitIfNeeded } from '@/helper.js';

/**
 * Klavye olaylarında tekrarlanan aksiyonların (örneğin aynı tusa tıklama)
 * son gerçekleşme zamanlarını takip eden Map nesnesi.
 */
const lastRecordedTime = new Map<string | number, Date>();

/**
 * Belirtilen tuşa basma (key tap) işlemi yapar.
 * İhtiyaç duyulursa önceden belirlenen bir bekleme süresini uygular.
 *
 * @param params.id Bekleme suresi icin kullanilacak deger.
 * @param params.key Basılacak tuş.
 * @param params.timeOfAgain Aynı tuşa tekrar basmak için beklenecek minimum süre.
 */
export const keywordFn = async ({ id, key, timeOfAgain }: IKeywordFnParams): Promise<void> => {
  await waitIfNeeded({ map: lastRecordedTime, id, timeOfAgain });

  robot.keyTap(String(key));

  lastRecordedTime.set(id, new Date());

  consoleActionMessage(`${id} ${key} was pressed`);
};
