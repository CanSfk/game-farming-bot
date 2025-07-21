// Filesystem
import { readJsonFile } from '@/filesystem';

// Shared State
import { setMacroData, setSettingData } from '@/shared-state';

const bootstrap = async () => {
  setMacroData(await readJsonFile(['jsons'], 'macro.json'));
  setSettingData(await readJsonFile(['jsons'], 'settings.json'));
};

export default bootstrap;
