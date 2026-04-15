import type { Element, Root, Text } from 'hast';
import type { Plugin, Transformer } from 'unified';

import { h } from 'hastscript';
import { visitParents } from 'unist-util-visit-parents';

export interface RehypeWrapCjkOptions {
  element?: string;
  langAttribute?: string;
  langCode?: string;
  regex?: RegExp;
  skipTags?: string[];
}

const defaultSkipTags = ['code', 'pre', 'kbd', 'samp', 'script', 'style'];

/**
 * Script-based ranges using Unicode Script Extensions property
 * Authoritative and auto-updates with the JS engine's Unicode version
 */
export const zhScriptRange = String.raw`\p{scx=Han}\p{scx=Bopomofo}`;
export const jaScriptRange = String.raw`\p{scx=Hiragana}\p{scx=Katakana}\p{scx=Han}`;
export const koScriptRange = String.raw`\p{scx=Hangul}\p{scx=Han}`;
export const cjkScriptRange = String.raw`\p{scx=Han}\p{scx=Hiragana}\p{scx=Katakana}\p{scx=Hangul}\p{scx=Bopomofo}`;

/**
 * Fullwidth ASCII variants (FF01-FF5E): digits,letters, punctuation
 * Not covered by script extensions but sometimes used in CJK contexts
 */
export const fullwidthAsciiRange = String.raw`\uFF01-\uFF5E`;

export const cjkRegexPresets = {
  zh: new RegExp(`[${zhScriptRange}${fullwidthAsciiRange}]+`, 'gu'),
  ja: new RegExp(`[${jaScriptRange}${fullwidthAsciiRange}]+`, 'gu'),
  ko: new RegExp(`[${koScriptRange}${fullwidthAsciiRange}]+`, 'gu'),
  cjk: new RegExp(`[${cjkScriptRange}${fullwidthAsciiRange}]+`, 'gu'),
};

export const rehypeWrapCjk: Plugin<[RehypeWrapCjkOptions?], Root> = (
  options
) => {
  const settings = {
    element: options?.element ?? 'span',
    langAttribute: options?.langAttribute ?? 'lang',
    langCode: options?.langCode ?? 'cjk',
    regex: options?.regex,
    skipTags: options?.skipTags ?? defaultSkipTags,
  };

  const baseRegex =
    settings.regex ??
    (settings.langCode && settings.langCode in cjkRegexPresets
      ? cjkRegexPresets[settings.langCode as keyof typeof cjkRegexPresets]
      : cjkRegexPresets.cjk);

  const regex = baseRegex.flags.includes('g')
    ? baseRegex
    : new RegExp(baseRegex.source, baseRegex.flags + 'g');

  function transformer(tree: Root) {
    visitParents(tree, 'text', function visitor(node, ancestors) {
      const parent = ancestors.at(-1);
      if (!parent || !('children' in parent) || typeof node.value !== 'string')
        return;

      // Skip text inside excluded tags (code, pre, script, etc.)
      if (
        ancestors.some(
          (ancestor) =>
            ancestor.type === 'element' &&
            settings.skipTags.includes(ancestor.tagName)
        )
      )
        return;

      // Skip if any ancestor already declares the target language
      if (
        ancestors.some(
          (ancestor) =>
            ancestor.type === 'element' &&
            ancestor.properties[settings.langAttribute] === settings.langCode
        )
      )
        return;

      const index = parent.children.indexOf(node);
      if (index === -1) return;

      const parts: (Element | Text)[] = [];
      let lastIndex = 0;

      for (const match of node.value.matchAll(regex)) {
        const matchIndex = match.index;

        if (matchIndex > lastIndex) {
          parts.push({
            type: 'text',
            value: node.value.slice(lastIndex, matchIndex),
          });
        }
        parts.push(
          h(settings.element, { [settings.langAttribute]: settings.langCode }, [
            match[0],
          ])
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
