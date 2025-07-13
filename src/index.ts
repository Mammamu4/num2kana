import { ConversionOptions } from "./types.js";
import { getMyriad, getNumberOfMyriads, myriadSetToKana } from "./utils.js";

/**
 * Converts a number to its Japanese reading in the specified script type
 * @param num The number to convert
 * @param options Configuration options including the script type
 * @returns The number represented in Japanese reading (hiragana, katakana, or romaji)
 */
export function numToKana(num: number, options: ConversionOptions): string {
  const MYRIAD_VALUE = 10000;
  const { type } = options;
  let result = "";

  // Calculate how many myriad groups there are in the number 
  // https://en.wikipedia.org/wiki/Myriad
  // If the number is less than 10000, we only have one myriad group
  // 1000 0000 => 2 myriad groups
  // 1 0000 0000 => 3 myriad groups
  // 1000 0000 0000 => also 3 myriad groups
  // 1 0000 0000 0000 => 4 myriad groups
  const numberOfMyriads = getNumberOfMyriads(num);

  // Process each myriad group from largest to smallest
  for (let i = numberOfMyriads; i >= 0; i--) {
    // Get the suffix for this myriad group ("man", "oku", "chou", etc.)
    const myriadSuffix = getMyriad(i, type);

    // Calculate the value for this myriad group
    const myriadValue = calculateMyriadGroupValue(num, i, MYRIAD_VALUE);
    num %= Math.pow(MYRIAD_VALUE, i > 0 ? i : 1);

    // Convert the myriad group to kana and add to result
    const myriadGroupText = myriadSetToKana(myriadValue, type);
    if (myriadGroupText) {
      result += myriadGroupText + myriadSuffix;

      // Add space for romaji if not the last group
      if (i > 0 && type === "romaji") {
        result += " ";
      }
    }
  }

  return result.trim();
}

function calculateMyriadGroupValue(num: number, groupIndex: number, myriadValue: number): number {
  if (groupIndex === 0) {
    return num % myriadValue;
  } else {
    return Math.floor(num / Math.pow(myriadValue, groupIndex));
  }
}

export function toHiragana(num: number): string {
  return numToKana(num, { type: "hiragana" });
}

export function toKatakana(num: number): string {
  return numToKana(num, { type: "katakana" });
}

export function toRomaji(num: number): string {
  return numToKana(num, { type: "romaji" });
}
