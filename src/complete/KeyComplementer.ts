import { TransKeys } from '../merger/common/TransKeys';

export default class KeyComplementer {
  private static transKeys: TransKeys;

  public static complete(
    transKeys: TransKeys,
    keys: string[],
    completeString?: boolean
  ): TransKeys {
    this.transKeys = transKeys;
    for (const key of keys) {
      this.create(key.split('.'), completeString);
    }

    return this.transKeys;
  }

  private static create(key: string[], completeString?: boolean): void {
    let temp = this.transKeys;
    for (const [i, k] of key.entries()) {
      if (typeof temp[k] === 'string') return;
      if (!(k in temp)) {
        if (completeString && key.length === i + 1) {
          temp[k] = '__________';
          return;
        } else {
          temp[k] = {};
        }
      }

      temp = temp[k];
    }
  }
}
