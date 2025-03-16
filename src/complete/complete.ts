import path from 'path';
import FileManager from '../utils/FileManager';
import FileComplementer from './FileComplementer';

export default async function complete(input: string): Promise<void> {
  const directories = FileManager.directories(input);
  for (const dir of directories) {
    const success = await FileComplementer.complete(path.join(input, dir));
    if (!success) return;
  }
}
