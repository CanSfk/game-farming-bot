// Bootstrap
import bootstrap from '@/bootstrap';

// Helpers
import { calculationNumberOfLoop, countdown, enableExitOnEsc, runActions } from '@/helper.js';

// Shared State
import { getLoopRunning, setLoopRunning, setNewAbortController } from '@/shared-state.js';

// Utils
import { consoleLineSpacing } from '@/utils.js';

(async function main() {
  await bootstrap();

  setLoopRunning(true);

  enableExitOnEsc();

  setNewAbortController();

  await countdown();

  consoleLineSpacing(2);

  let [iMin, iMax] = calculationNumberOfLoop();

  while (iMin < iMax && getLoopRunning()) {
    await runActions();

    iMin++;
  }

  process.exit(0);
})();
