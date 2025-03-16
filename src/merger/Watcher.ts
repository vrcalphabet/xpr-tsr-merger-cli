import * as chokidar from 'chokidar';

export default class Watcher {
  private watcher: chokidar.FSWatcher | null;

  public constructor() {
    this.watcher = null;
  }

  public watch(input: string, callback: () => void): void {
    this.watcher = chokidar.watch(input, {
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100,
      },
    });

    this.watcher.on('all', () => {
      callback();
    });
  }

  public close(): void {
    if (this.watcher) {
      this.watcher.close();
    }
  }
}
