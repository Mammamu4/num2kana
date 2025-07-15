import { ConversionOptions, DEFAULT_OPTIONS } from "./types.js";
import { getMyriad, getNumberOfMyriads, myriadSetToKana } from "./utils.js";
import { zeroMap } from "./numToKana.js";

/**
 * Converts a number to its Japanese reading in the specified script type
 * @param num The number to convert
 * @param options Configuration options including the script type and formatting preferences
 * @returns The number represented in Japanese reading (hiragana, katakana, or romaji)
 */
export function numToKana(
  num: number,
  options?: Partial<ConversionOptions>
): string {
  if (num < 0 || num > 1e20) {
    throw new Error(
      "Number is not within range: 0 <= num <= 10^20"
    );
  }

  const mergedOptions: ConversionOptions = { ...DEFAULT_OPTIONS, ...options };
  const { type, spaceRomaji } = mergedOptions;

  if (num === 0) {
    return zeroMap[type] || "零";
  }

  let result = "";

  // Calculate how many myriad groups there are in the number
  // https://en.wikipedia.org/wiki/Myriad
  // If the number is less than 10000, we only have one myriad group
  // 1000 0000 => 2 myriad groups
  // 1 0000 0000 => 3 myriad groups
  // 1000 0000 0000 => also 3 myriad groups
  // 1 0000 0000 0000 => 4 myriad groups
  const numberOfMyriads = getNumberOfMyriads(num);
  const MYRIAD_VALUE = 10000;

  // Process each myriad group from largest to smallest
  for (let i = numberOfMyriads; i >= 0; i--) {
    // Get the suffix for this myriad group ("man", "oku", "chou", etc.)
    const myriadSuffix = getMyriad(i, type);

    // Calculate the value for this myriad group
    const myriadValue = calculateMyriadGroupValue(num, i, MYRIAD_VALUE);
    num %= Math.pow(MYRIAD_VALUE, i > 0 ? i : 1);

    // Convert the myriad group to kana and add to result
    const myriadGroupText = myriadSetToKana(myriadValue, mergedOptions);
    if (myriadGroupText) {
      result += myriadGroupText + myriadSuffix;

      // Add space for romaji if not the last group and spacing is enabled
      if (i > 0 && type === "romaji" && spaceRomaji) {
        result += " ";
      }
    }
  }

  return result.trim();
}

function calculateMyriadGroupValue(
  num: number,
  groupIndex: number,
  myriadValue: number
): number {
  if (groupIndex === 0) {
    return num % myriadValue;
  } else {
    return Math.floor(num / Math.pow(myriadValue, groupIndex));
  }
}

export function numToKanji(
  num: number,
  options?: Partial<Omit<ConversionOptions, "type">>
): string {
  return numToKana(num, { ...options, type: "kanji" });
}

export function numToHiragana(
  num: number,
  options?: Partial<Omit<ConversionOptions, "type">>
): string {
  return numToKana(num, { ...options, type: "hiragana" });
}

export function numToKatakana(
  num: number,
  options?: Partial<Omit<ConversionOptions, "type">>
): string {
  return numToKana(num, { ...options, type: "katakana" });
}

export function numToRomaji(
  num: number,
  options?: Partial<Omit<ConversionOptions, "type">>
): string {
  return numToKana(num, { ...options, type: "romaji" });
}

export function numToAllFormats(
  num: number,
  options?: Partial<ConversionOptions>
): {
  kanji: string;
  hiragana: string;
  katakana: string;
  romaji: string;
} {
  return {
    kanji: numToKanji(num, options),
    hiragana: numToHiragana(num, options),
    katakana: numToKatakana(num, options),
    romaji: numToRomaji(num, options),
  };
}
