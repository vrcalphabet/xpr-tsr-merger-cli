import { TransKeys } from '../merger/common/TransKeys';

export default class KeyComplementer {
  private static transKeys: TransKeys;
  
  public static complete(transKeys: TransKeys, keys: string[]): TransKeys {
    this.transKeys = transKeys;
    for (const key of keys) {
      this.create(key.split('.'));
    }
    
    return this.transKeys;
  }
  
  private static create(key: string[]): void {
    let temp = this.transKeys;
    for (const k of key) {
      if (typeof temp[k] === 'string') return;
      if (!(k in temp)) {
        temp[k] = {};
      }
      
      temp = temp[k];
    }
  }
}