import { Tsr } from '../common/Tsr';

export default class TsrParser {
  public static parse(keys: string): Tsr | null {
    try {
      const tsrObj = JSON.parse(keys);
      return tsrObj as Tsr;
    } catch (e) {
      console.error('"trans.json" のパースに失敗しました。有効なJSON形式ではありません。');
      return null;
    }
  }
}
