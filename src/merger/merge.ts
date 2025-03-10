import path from 'path';
import FileManager from './utils/FileManager';
import FileMerger from './utils/FileMerger';

export default function merge(input: string, output: string): void {
  const directories = FileManager.directories(input);
  directories.forEach((dir) => {
    if (dir === 'emailtwofactorauth') {
      FileMerger.merge(path.join(input, dir));
    }
  });
}
