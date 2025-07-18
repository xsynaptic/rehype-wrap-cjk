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

// Japanese-specific character ranges
export const hiragana = String.raw`\u3041-\u3093`;
export const hiraganaIterationMarks = String.raw`\u309D-\u309E`;
export const katakana = String.raw`\u30A1-\u30F6`;
export const katakanaPunctuation = String.raw`\u30FB-\u30FE`;
export const japanesePunctuation = String.raw`\u3001-\u3003`;
export const ideographicIterationMark = String.raw`\u3005`;
export const japaneseBrackets = String.raw`\u3008-\u3011`;
export const tortoiseBrackets = String.raw`\u3014-\u3015`;
export const waveDash = String.raw`\u301C`;

// Korean-specific character ranges
export const hangulJamo = String.raw`\u3131-\u314E`;
export const hangulSyllables = String.raw`\uAC00-\uD7A3`;

// Chinese character ranges
export const unicodeZhRanges = [
  cjkUnifiedIdeographs,
  cjkUnifiedIdeographsExtensionA,
  cjkUnifiedIdeographsExtensionB,
  cjkUnifiedIdeographsExtensionC,
  cjkUnifiedIdeographsExtensionD,
  cjkUnifiedIdeographsExtensionE,
  cjkUnifiedIdeographsExtensionF,
  cjkUnifiedIdeographsExtensionG,
  cjkUnifiedIdeographsExtensionH,
  cjkUnifiedIdeographsExtensionI,
  cjkRadicalsSupplement,
  kangxiRadicals,
  ideographicDescriptionCharacters,
  cjkSymbolsAndPunctuation,
  cjkStrokes,
  enclosedCjkLettersAndMonths,
  cjkCompatibility,
  cjkCompatibilityIdeographs,
  cjkCompatibilityForms,
  enclosedIdeographicSupplement,
  cjkCompatibilityIdeographsSupplement,
  halfWidthAndFullWidthForms,
  verticalForms,
] satisfies string[];

// Japanese character ranges
export const unicodeJaRanges = [
  cjkUnifiedIdeographs,
  cjkUnifiedIdeographsExtensionA,
  cjkUnifiedIdeographsExtensionB,
  cjkUnifiedIdeographsExtensionC,
  cjkUnifiedIdeographsExtensionD,
  cjkUnifiedIdeographsExtensionE,
  cjkUnifiedIdeographsExtensionF,
  cjkUnifiedIdeographsExtensionG,
  cjkUnifiedIdeographsExtensionH,
  cjkUnifiedIdeographsExtensionI,
  kangxiRadicals,
  ideographicDescriptionCharacters,
  cjkSymbolsAndPunctuation,
  cjkStrokes,
  enclosedCjkLettersAndMonths,
  cjkCompatibility,
  cjkCompatibilityIdeographs,
  cjkCompatibilityForms,
  hiragana,
  hiraganaIterationMarks,
  katakana,
  katakanaPunctuation,
  japanesePunctuation,
  ideographicIterationMark,
  japaneseBrackets,
  tortoiseBrackets,
  waveDash,
] satisfies string[];

// Korean character ranges
export const unicodeKoRanges = [
  cjkUnifiedIdeographs,
  cjkUnifiedIdeographsExtensionA,
  cjkUnifiedIdeographsExtensionB,
  cjkUnifiedIdeographsExtensionC,
  cjkUnifiedIdeographsExtensionD,
  cjkUnifiedIdeographsExtensionE,
  cjkUnifiedIdeographsExtensionF,
  cjkUnifiedIdeographsExtensionG,
  cjkUnifiedIdeographsExtensionH,
  cjkUnifiedIdeographsExtensionI,
  kangxiRadicals,
  ideographicDescriptionCharacters,
  cjkSymbolsAndPunctuation,
  cjkStrokes,
  enclosedCjkLettersAndMonths,
  cjkCompatibility,
  cjkCompatibilityIdeographs,
  cjkCompatibilityForms,
  hangulJamo,
  hangulSyllables,
] satisfies string[];
