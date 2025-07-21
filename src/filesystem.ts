import * as fs from 'fs/promises';
import * as path from 'path';

// Shared State
import { getIsPkg } from '@/shared-state.js';

/**
 * Belirtilen bir klasördeki JSON dosyasını okur ve içeriğini döndürür.
 *
 * @param directoryPaths JSON dosyalarının bulundugu klasör yolu.
 * @returns {Promise<any | null>} İlk JSON dosyasının içeriği veya bulunamazsa null.
 */
export async function readJsonFile(directoryPaths: string[], fileName: string): Promise<any | null> {
  try {
    let filePath: string;

    if (getIsPkg()) filePath = path.join(path.dirname(process.execPath), ...directoryPaths, fileName);
    else filePath = path.join(process.cwd(), 'src', ...directoryPaths, fileName);

    console.log(`dosya: '${fileName}' okunuyor.`);

    const jsonData = JSON.parse(await fs.readFile(filePath, { encoding: 'utf8' }));

    return jsonData;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.error(`Hata: '${fileName}' dosyasi bulunamadı.`);
    } else if (error instanceof SyntaxError) {
      console.error(`Hata: '${fileName}' dosyasi geçerli bir JSON formatında değil. Detay: ${error.message}`);
    } else {
      console.error(`Dosya okuma sırasında beklenmeyen bir hata oluştu: ${error.message}`);
    }

    process.exit(1);
  }
}
