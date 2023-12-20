# rehype-wrap-cjk

**[rehype](https://github.com/rehypejs/rehype)** plugin to wrap [CJK character](https://en.wikipedia.org/wiki/CJK_characters) sequences in a `span` element with `lang` attribute, useful for styling in multilingual contexts.

Typical usage scenario with Remark and Rehype:

```
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

Input:

```
Sample text with CJK characters (中日韓字符) interspersed. 中文 can appear anywhere in the text and will be appropriately wrapped.
```

Output: 

```
<p>Sample text with CJK characters (<span lang="zh">中日韓字符</span>) interspersed. <span lang="zh">中文</span> can appear anywhere in the text and will be appropriately wrapped.</p>
```

## Reference

- [CJK Unified Ideographs](https://en.wikipedia.org/wiki/CJK_Unified_Ideographs)
- [CJK Ideographs in Unicode](https://en.wikipedia.org/wiki/Template:CJK_ideographs_in_Unicode)
- [Halfwidth and Fullwidth Forms](https://en.wikipedia.org/wiki/Halfwidth_and_Fullwidth_Forms_(Unicode_block))

## License

MIT