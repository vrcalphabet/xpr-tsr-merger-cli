import { TransKeys } from '../merger/common/TransKeys';

export default class KeysParser {
  public static parse(keys: string | null): TransKeys | null {
    if (!keys) return {} as TransKeys;
    
    try {
      const keysObj = JSON.parse(keys);
      return keysObj as TransKeys;
    } catch (e) {
      console.error('"keys.json" のパースに失敗しました。有効なJSON形式ではありません。');
      return null;
    }
  }
}
