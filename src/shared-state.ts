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
