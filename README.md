# rehype-wrap-cjk

This package is a [unified][]/[rehype][] plugin to wrap [CJK character][cjk-wiki] sequences in an element (defaulting to `span`) with a `lang` attribute, useful for applying different CSS styling rules in multilingual contexts.

Note: this plugin is distributed in ESM and CJS.

## Install

```sh
npm install rehype-wrap-cjk
```

## Use

A typical pipeline transforming Markdown into HTML with [remark][] and [rehype][]:

```ts
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import rehypeCjkWrap from 'rehype-wrap-cjk';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export function processMarkdown(markdownContent: string): string {
	const htmlOutput = unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeCjkWrap)
		.use(rehypeSanitize)
		.use(rehypeStringify)
		.processSync(markdownContent);

	return String(htmlOutput);
}
```

Example plain text input:

```text
Sample text with CJK characters (中日韓字符) interspersed. 中文 can appear anywhere in the text and will be appropriately wrapped.
```

Example HTML output: 

```html
Sample text with CJK characters (<span lang="zh">中日韓字符</span>) interspersed. <span lang="zh">中文</span> can appear anywhere in the text and will be appropriately wrapped.
```

Example CSS rules (for you to implement in your own projects):

```css
html:not([lang^='zh']) span[lang^='zh'] {
	font-style: normal !important;
	text-decoration: none !important;
	word-break: keep-all !important;
}
```

## Reference

- [CJK Unified Ideographs][cjk-unified-ideographs]
- [CJK Ideographs in Unicode][cjk-ideographs-in-unicode]
- [Halfwidth and Fullwidth Forms][halfwidth-and-fullwidth-forms]
- [HTMLElement lang property][html-element-lang-property]
- [word-break CSS property][wordbreak-css-property]

## License

[MIT][mit-license]

[cjk-wiki]: https://en.wikipedia.org/wiki/CJK_characters

[cjk-unified-ideographs]: https://en.wikipedia.org/wiki/CJK_Unified_Ideographs

[cjk-ideographs-in-unicode]: https://en.wikipedia.org/wiki/Template:CJK_ideographs_in_Unicode

[halfwidth-and-fullwidth-forms]: https://en.wikipedia.org/wiki/Halfwidth_and_Fullwidth_Forms_(Unicode_block)

[html-element-lang-property]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/lang

[mit-license]: https://opensource.org/licenses/MIT

[rehype]: https://github.com/rehypejs/rehype

[remark]: https://github.com/remarkjs/remark

[unified]: https://github.com/unifiedjs/unified

[wordbreak-css-property]: https://developer.mozilla.org/en-US/docs/Web/CSS/word-break