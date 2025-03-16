import { TransKeys } from '../merger/common/TransKeys';

export default class KeysKeyExtractor {
  private static keys: string[];
  
  public static extract(keys: TransKeys): string[] {
    this.keys = [];
    this.recursiveKeys(keys, []);
    return this.keys;
  }
  
  private static recursiveKeys(keys: TransKeys, keyStack: string[]): void {
    for (const key in keys) {
      if (typeof keys[key] === 'string') {
        this.keys.push([...keyStack, keys[key]].join('.'));
      } else {
        keyStack.push(key);
        this.recursiveKeys(keys[key], keyStack);
        keyStack.pop();
      }
    }
  }
}