import path from 'path';
import pc from 'picocolors';
import TsrParser from '../merger/tsr/TsrParser';
import { eraseUp, wait } from '../utils';
import FileManager from '../utils/FileManager';
import FileComplementer from './FileComplementer';
import KeyComplementer from './KeyComplementer';

export default async function complete(input: string): Promise<void> {
  const allKeys: string[] = [];
  const directories = FileManager.directories(input);
  for (const dir of directories) {
    const success = await FileComplementer.complete(path.join(input, dir), allKeys);
    if (!success) return;
  }

  const tsrPath = path.join(input, 'trans.json');
  const tsr = FileManager.readFile(tsrPath);

  console.log(`${pc.yellow('パース中')}:`, tsrPath);
  const tsrResult = TsrParser.parse(tsr ?? '{}');
  if (!tsrResult) return;

  const beforeJSON = JSON.stringify(tsrResult);

  const completedTsr = KeyComplementer.complete(tsrResult, allKeys, true);
  const afterJSON = JSON.stringify(completedTsr);

  await wait(100);
  eraseUp();
  console.log(
    `${pc.greenBright('パース完了')}:`,
    tsrPath,
    beforeJSON !== afterJSON ? '[補完]' : ''
  );

  FileManager.writeFile(tsrPath, JSON.stringify(completedTsr, null, 2));
}
