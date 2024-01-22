import { h } from 'hastscript';
import { isElement } from 'hast-util-is-element';
import { visit } from 'unist-util-visit';

import type { Root, Text, Element } from 'hast';
import type { Plugin, Transformer } from 'unified';
import type { Visitor, VisitorResult } from 'unist-util-visit';

import { unicodeCjkRanges } from './unicodeCjkRanges.js';

interface RehypeCjkOptions {
  langCode: string;
  regex: RegExp;
}

const DEFAULT_SETTINGS: RehypeCjkOptions = {
  langCode: 'zh',
  regex: new RegExp(`[${Object.values(unicodeCjkRanges).join('')}]+`, 'gud'),
};

export const plugin: Plugin<[RehypeCjkOptions?], Root> = (options) => {
  const settings = Object.assign({}, DEFAULT_SETTINGS, options);

  const visitor: Visitor<Text> = function (node, index, parent): VisitorResult {
    if (!parent || index === undefined || typeof node.value !== 'string')
      return;

    // Avoid recursion by exiting early if the parent is already a `span` element
    if (
      isElement(
        parent,
        ({ tagName, properties }) =>
          tagName === 'span' && properties?.lang === settings.langCode
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
      parts.push(h('span', { lang: settings.langCode }, [match[0]]));
      lastIndex = matchIndex + match[0].length;
    }

    if (lastIndex < node.value.length) {
      parts.push({ type: 'text', value: node.value.slice(lastIndex) });
    }

    parent.children.splice(index, 1, ...parts);
  };

  const transformer: Transformer<Root> = (tree) => {
    visit(tree, 'text', visitor);
  };

  return transformer;
};

export default plugin;
