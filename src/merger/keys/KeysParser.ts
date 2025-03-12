import { TransKeys } from '../common/TransKeys';

export default class KeysParser {
  public static parse(keys: string): TransKeys | null {
    try {
      const keysObj = JSON.parse(keys);
      this.recursive(keysObj);
      return keysObj as TransKeys;
    } catch (e) {
      console.error('"keys.json" のパースに失敗しました。有効なJSON形式ではありません。');
      return null;
    }
  }

  private static recursive(tsr: any): void {
    for (const prop in tsr) {
      if (typeof tsr[prop] === 'string') {
        const source = prop.trim().toLowerCase();
        const trans = tsr[prop];

        delete tsr[prop];
        tsr[source] = trans;
      } else {
        this.recursive(tsr[prop]);
      }
    }
  }
}
