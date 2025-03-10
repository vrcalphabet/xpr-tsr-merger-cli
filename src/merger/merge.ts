import FileManager from './utils/FileManager';
import FileMerger from './utils/FileMerger';

export default function merge(input: string, output: string): void {
  const directories = FileManager.directories(input);
  directories.forEach((dir) => {
    FileMerger.merge(dir);
  });
}
