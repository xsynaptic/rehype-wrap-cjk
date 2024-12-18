import { isElement } from 'hast-util-is-element';
import { h } from 'hastscript';
import { visit } from 'unist-util-visit';

import type { Element, Root, Text } from 'hast';
import type { Plugin, Transformer } from 'unified';

import { unicodeCjkRanges } from './unicode-cjk-ranges.js';

interface RehypeWrapCjkOptions {
  element: string;
  langCode: string;
  regex: RegExp;
}

const DEFAULT_SETTINGS: RehypeWrapCjkOptions = {
  element: 'span',
  langCode: 'zh',
  regex: new RegExp(`[${unicodeCjkRanges.join('')}]+`, 'gud'),
};

export const rehypeWrapCjk: Plugin<[RehypeWrapCjkOptions?], Root> = (
  options
) => {
  const settings: RehypeWrapCjkOptions = Object.assign(
    {},
    DEFAULT_SETTINGS,
    options
  );

  function transformer(tree: Root) {
    visit(tree, 'text', function visitor(node, index, parent) {
      if (!parent || index === undefined || typeof node.value !== 'string')
        return;

      // Exit early if this node already has a language attribute
      if (
        isElement(
          parent,
          ({ tagName, properties }) =>
            tagName === settings.element && !!properties.lang
        )
      )
        return;

      const parts: (Element | Text)[] = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = settings.regex.exec(node.value)) !== null) {
        const { index: matchIndex } = match;

        if (matchIndex > lastIndex) {
          parts.push({
            type: 'text',
            value: node.value.slice(lastIndex, matchIndex),
          });
        }
        parts.push(
          h(settings.element, { lang: settings.langCode }, [match[0]])
        );
        lastIndex = matchIndex + match[0].length;
      }

      if (lastIndex < node.value.length) {
        parts.push({ type: 'text', value: node.value.slice(lastIndex) });
      }

      parent.children.splice(index, 1, ...parts);
    });

    return tree;
  }

  return transformer satisfies Transformer<Root>;
};

export default rehypeWrapCjk;
