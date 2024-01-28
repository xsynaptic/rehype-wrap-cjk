import { describe, expect, test } from 'vitest';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

import type { VFileCompatible } from 'vfile';

import plugin from '../src';

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(plugin)
  .use(rehypeStringify);

const process = async (contents: VFileCompatible): Promise<VFileCompatible> =>
  processor.process(contents).then(({ value }) => value);

const markdownText = [
  [
    '_Lorem ipsum_ dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. **Ut enim ad minim veniam**, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...',
    '<p><em>Lorem ipsum</em> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <strong>Ut enim ad minim veniam</strong>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...</p>',
  ],
  [
    '林登玩即媽包候更穿光文去十！上長戊笑畫民功筆的汁足話果風拉蝴已？走可掃同田出穿夏足詞媽怎爪點不具兩。',
    '<p><span lang="zh">林登玩即媽包候更穿光文去十！上長戊笑畫民功筆的汁足話果風拉蝴已？走可掃同田出穿夏足詞媽怎爪點不具兩。</span></p>',
  ],
  [
    'Sample text with CJK characters (中日韓字符) interspersed. 中文 can appear anywhere in the text and will be appropriately wrapped.',
    '<p>Sample text with CJK characters (<span lang="zh">中日韓字符</span>) interspersed. <span lang="zh">中文</span> can appear anywhere in the text and will be appropriately wrapped.</p>',
  ],
  [
    'Sample text with CJK characters already wrapped: <span lang="zh">中日韓字符</span>... and some that is not: 中日韓字符',
    '<p>Sample text with CJK characters already wrapped: <span lang="zh">中日韓字符</span>... and some that is not: <span lang="zh">中日韓字符</span></p>',
  ],
];

describe('rehype wrap CJK plugin input matches expected output', () => {
  for (const [input, output] of markdownText) {
    test(input, async () => {
      expect(process(input)).resolves.toEqual(output);
    });
  }
});
