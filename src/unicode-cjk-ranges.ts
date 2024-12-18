export const cjkUnifiedIdeographs = String.raw`\u4E00-\u9FFF`;
export const cjkUnifiedIdeographsExtensionA = String.raw`\u3400-\u4DBF`;
export const cjkUnifiedIdeographsExtensionB = String.raw`\u{20000}-\u{2A6DF}`;
export const cjkUnifiedIdeographsExtensionC = String.raw`\u{2A700}-\u{2B73F}`;
export const cjkUnifiedIdeographsExtensionD = String.raw`\u{2B740}-\u{2B81F}`;
export const cjkUnifiedIdeographsExtensionE = String.raw`\u{2B820}-\u{2CEAF}`;
export const cjkUnifiedIdeographsExtensionF = String.raw`\u{2CEB0}-\u{2EBEF}`;
export const cjkUnifiedIdeographsExtensionG = String.raw`\u{30000}-\u{3134F}`;
export const cjkUnifiedIdeographsExtensionH = String.raw`\u{31350}-\u{323AF}`;
export const cjkUnifiedIdeographsExtensionI = String.raw`\u{2EBF0}-\u{2EE5F}`;
export const cjkRadicalsSupplement = String.raw`\u2E80-\u2EFF`;
export const kangxiRadicals = String.raw`\u2F00-\u2FDF`;
export const ideographicDescriptionCharacters = String.raw`\u2FF0-\u2FFF`;
export const cjkSymbolsAndPunctuation = String.raw`\u3000-\u303F`;
export const cjkStrokes = String.raw`\u31C0-\u31EF`;
export const enclosedCjkLettersAndMonths = String.raw`\u3200-\u32FF`;
export const cjkCompatibility = String.raw`\u3300-\u33FF`;
export const cjkCompatibilityIdeographs = String.raw`\uF900-\uFAFF`;
export const cjkCompatibilityForms = String.raw`\uFE30-\uFE4F`;
export const enclosedIdeographicSupplement = String.raw`\u{1F200}-\u{1F2FF}`;
export const cjkCompatibilityIdeographsSupplement = String.raw`\u{2F800}-\u{2FA1F}`;
export const halfWidthAndFullWidthForms = String.raw`\uFF00-\uFFEF`;
export const verticalForms = String.raw`\uFE10-\uFE1F`;

export const unicodeCjkRanges = [
  ...cjkUnifiedIdeographs,
  ...cjkUnifiedIdeographsExtensionA,
  ...cjkUnifiedIdeographsExtensionB,
  ...cjkUnifiedIdeographsExtensionC,
  ...cjkUnifiedIdeographsExtensionD,
  ...cjkUnifiedIdeographsExtensionE,
  ...cjkUnifiedIdeographsExtensionF,
  ...cjkUnifiedIdeographsExtensionG,
  ...cjkUnifiedIdeographsExtensionH,
  ...cjkUnifiedIdeographsExtensionI,
  ...cjkRadicalsSupplement,
  ...kangxiRadicals,
  ...ideographicDescriptionCharacters,
  ...cjkSymbolsAndPunctuation,
  ...cjkStrokes,
  ...enclosedCjkLettersAndMonths,
  ...cjkCompatibility,
  ...cjkCompatibilityIdeographs,
  ...cjkCompatibilityForms,
  ...enclosedIdeographicSupplement,
  ...cjkCompatibilityIdeographsSupplement,
  ...halfWidthAndFullWidthForms,
  ...verticalForms,
] satisfies string[];
