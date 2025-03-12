export default {
  GENERAL: {
    MISSING_METADATA: '@includesの指定は必須です。',
    AFTER_COMPLETE: 'ノード定義部分にメタデータを定義することはできません。',
    INVALID_TOKEN: '無効なトークンです。',
    INVALID_TOKEN_END: 'トークンをここで終わらすことはできません。',
  },
  INCLUDES: {
    DUPLICATE: '@includesを2度宣言することはできません。',
    BLOCK_NOT_STARTED: '@includesブロックが開始されていません。',
    MISSING_DIRECTORY: '@includesブロックが終了されていません。',
    EMPTY_DIRECTORIES: '@includesにはディレクトリを最低でも1つ指定する必要があります。',
    INVALID_FORMAT: '@includesで指定するディレクトリはスラッシュ`/`から始める必要があります。',
    MISSING_COMMA: '@includesの各ディレクトリの後は改行を入れなければいけません。',
  },
  EXCLUDES: {
    DUPLICATE: '@excludesを2度宣言することはできません。',
    BLOCK_NOT_STARTED: '@excludesブロックが開始されていません。',
    MISSING_DIRECTORY: '@excludesブロックが終了されていません。',
    INVALID_FORMAT: '@excludesで指定するディレクトリはスラッシュ`/`から始める必要があります。',
    MISSING_COMMA: '@excludesの各ディレクトリの後は改行を入れなければいけません。',
  },
  NODE: {
    MISSING_XPATH: 'xpathが指定されていません。',
    MISSING_KEY_OR_XPATH: 'keyまたはxpathが指定されていません。',
    MISSING_NODE: 'ネストの中に最低でも1つのノードが必要です。',
    KEY_ATTRIBUTE_CUSTOM_ERROR: '親ノードにkey, attribute, customは指定できません。',
  },
} as const satisfies XprErrorMessages;

export type XprErrorMessages = {
  readonly [key: string]: XprErrorMessageGroup;
};
export type XprErrorMessageGroup = {
  readonly [key: string]: string;
};
