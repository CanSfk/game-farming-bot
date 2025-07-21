import { TMacro } from '@/types/actions';
import { TSetting } from '@/types/settings';

let controller: AbortController | undefined = undefined;

export const setNewAbortController = (): void => {
  controller = new AbortController();
};

export const setAbortController = (): void => controller?.abort();

export const getAbortSignal = (): AbortSignal => {
  if (typeof controller === 'undefined') setNewAbortController();

  return controller!.signal;
};

let loopRunning: boolean = false;
export const setLoopRunning = (vl: boolean) => (loopRunning = vl);
export const getLoopRunning = () => loopRunning;

const isPkg = typeof process.pkg !== 'undefined';
export const getIsPkg = () => isPkg;

const dataOfMacro: TMacro[] = [];
export const setMacroData = (data: TMacro[]) => {
  dataOfMacro.push(...data);
};
export const getMacroData = () => dataOfMacro;

let dataOfSetting: TSetting;
export const setSettingData = (data: TSetting) => {
  dataOfSetting = data;
};
export const getSettingData = () => dataOfSetting;
