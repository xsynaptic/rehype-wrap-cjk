import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { describe, expect, test } from 'vitest';

import type { VFileCompatible } from 'vfile';

import rehypeWrapCjk from '../src/index.js';

const chineseProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeWrapCjk, { langCode: 'zh' })
  .use(rehypeStringify);

const japaneseProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeWrapCjk, { langCode: 'ja' })
  .use(rehypeStringify);

const koreanProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeWrapCjk, { langCode: 'ko' })
  .use(rehypeStringify);

const cjkProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeWrapCjk, { langCode: 'cjk' })
  .use(rehypeStringify);

const processChinese = async (
  contents: VFileCompatible
): Promise<VFileCompatible> =>
  chineseProcessor.process(contents).then(({ value }) => value);

const processJapanese = async (
  contents: VFileCompatible
): Promise<VFileCompatible> =>
  japaneseProcessor.process(contents).then(({ value }) => value);

const processKorean = async (
  contents: VFileCompatible
): Promise<VFileCompatible> =>
  koreanProcessor.process(contents).then(({ value }) => value);

const processCjk = async (
  contents: VFileCompatible
): Promise<VFileCompatible> =>
  cjkProcessor.process(contents).then(({ value }) => value);

const chineseMarkdownText = [
  [
    '_Lorem ipsum_ dolor sit amet, consectetur adipiscing elit.',
    '<p><em>Lorem ipsum</em> dolor sit amet, consectetur adipiscing elit.</p>',
  ],
  [
    '林登玩即媽包候更穿光文去十！',
    '<p><span lang="zh">林登玩即媽包候更穿光文去十！</span></p>',
  ],
  [
    'Sample text with CJK characters (中日韓字符) interspersed. 中文 can appear anywhere in the text.',
    '<p>Sample text with CJK characters (<span lang="zh">中日韓字符</span>) interspersed. <span lang="zh">中文</span> can appear anywhere in the text.</p>',
  ],
  [
    'Sample text with CJK characters already wrapped: <span lang="zh">中日韓字符</span>... and some that is not: 中日韓字符',
    '<p>Sample text with CJK characters already wrapped: <span lang="zh">中日韓字符</span>... and some that is not: <span lang="zh">中日韓字符</span></p>',
  ],
  ['你好', '<p><span lang="zh">你好</span></p>'],
  ['Hello 世界', '<p>Hello <span lang="zh">世界</span></p>'],
  [
    '一二三 ABC 四五六',
    '<p><span lang="zh">一二三</span> ABC <span lang="zh">四五六</span></p>',
  ],
];

const japaneseMarkdownText = [
  ['こんにちは世界', '<p><span lang="ja">こんにちは世界</span></p>'],
  [
    'Hello こんにちは world',
    '<p>Hello <span lang="ja">こんにちは</span> world</p>',
  ],
  [
    'ひらがな カタカナ 漢字',
    '<p><span lang="ja">ひらがな</span> <span lang="ja">カタカナ</span> <span lang="ja">漢字</span></p>',
  ],
  [
    'English text with ひらがな mixed in',
    '<p>English text with <span lang="ja">ひらがな</span> mixed in</p>',
  ],
  ['アニメ', '<p><span lang="ja">アニメ</span></p>'],
  ['日本語', '<p><span lang="ja">日本語</span></p>'],
  [
    'ひらがな、カタカナ、漢字',
    '<p><span lang="ja">ひらがな、カタカナ、漢字</span></p>',
  ],
];

const koreanMarkdownText = [
  ['안녕하세요', '<p><span lang="ko">안녕하세요</span></p>'],
  ['Hello 안녕 world', '<p>Hello <span lang="ko">안녕</span> world</p>'],
  [
    '한국어 문자열 테스트',
    '<p><span lang="ko">한국어</span> <span lang="ko">문자열</span> <span lang="ko">테스트</span></p>',
  ],
  [
    'Mixed text with 한글 characters',
    '<p>Mixed text with <span lang="ko">한글</span> characters</p>',
  ],
  ['김치', '<p><span lang="ko">김치</span></p>'],
  [
    '한국어와 漢字 混合',
    '<p><span lang="ko">한국어와</span> <span lang="ko">漢字</span> <span lang="ko">混合</span></p>',
  ],
];

const cjkMarkdownText = [
  [
    'Sample text with CJK characters (中日韓字符) interspersed. 中文 can appear anywhere in the text.',
    '<p>Sample text with CJK characters (<span lang="cjk">中日韓字符</span>) interspersed. <span lang="cjk">中文</span> can appear anywhere in the text.</p>',
  ],
  [
    'Hello こんにちは world',
    '<p>Hello <span lang="cjk">こんにちは</span> world</p>',
  ],
  ['Hello 안녕 world', '<p>Hello <span lang="cjk">안녕</span> world</p>'],
  [
    'Combined text sample with Chinese (中日韓字符), Japanese (こんにちは), and Korean (안녕).',
    '<p>Combined text sample with Chinese (<span lang="cjk">中日韓字符</span>), Japanese (<span lang="cjk">こんにちは</span>), and Korean (<span lang="cjk">안녕</span>).</p>',
  ],
];

describe('rehype wrap CJK plugin for Chinese characters', () => {
  for (const [input, output] of chineseMarkdownText) {
    test(`Chinese: ${input}`, async () => {
      await expect(processChinese(input)).resolves.toEqual(output);
    });
  }
});

describe('rehype wrap CJK plugin for Japanese charactes', () => {
  for (const [input, output] of japaneseMarkdownText) {
    test(`Japanese: ${input}`, async () => {
      await expect(processJapanese(input)).resolves.toEqual(output);
    });
  }
});

describe('rehype wrap CJK plugin for Korean characters', () => {
  for (const [input, output] of koreanMarkdownText) {
    test(`Korean: ${input}`, async () => {
      await expect(processKorean(input)).resolves.toEqual(output);
    });
  }
});

describe('rehype wrap CJK plugin for CJK characters', () => {
  for (const [input, output] of cjkMarkdownText) {
    test(`CJK: ${input}`, async () => {
      await expect(processCjk(input)).resolves.toEqual(output);
    });
  }
});
