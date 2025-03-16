import fs from 'fs';
import path from 'path';

export default class FileManager {
  public static directories(dirPath: string): string[] {
    return fs.readdirSync(dirPath).filter((file) => {
      return fs.statSync(path.join(dirPath, file)).isDirectory();
    });
  }

  public static makeDir(dirPath: string): void {
    const dir = path.dirname(dirPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  public static readFile(filePath: string): string | null {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      // ファイルが存在しない場合
      return null;
    }
  }

  public static writeFile(filePath: string, data: string): void {
    this.makeDir(filePath);
    fs.writeFileSync(filePath, data);
  }
}
