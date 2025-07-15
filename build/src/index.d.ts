import { ConversionOptions } from "./types.js";
/**
 * Converts a number to its Japanese reading in the specified script type
 * @param num The number to convert
 * @param options Configuration options including the script type and formatting preferences
 * @returns The number represented in Japanese reading (hiragana, katakana, or romaji)
 */
export declare function numToKana(num: number, options?: Partial<ConversionOptions>): string;
export declare function numToKanji(num: number, options?: Partial<Omit<ConversionOptions, "type">>): string;
export declare function numToHiragana(num: number, options?: Partial<Omit<ConversionOptions, "type">>): string;
export declare function numToKatakana(num: number, options?: Partial<Omit<ConversionOptions, "type">>): string;
export declare function numToRomaji(num: number, options?: Partial<Omit<ConversionOptions, "type">>): string;
export declare function numToAllFormats(num: number, options?: Partial<ConversionOptions>): {
    kanji: string;
    hiragana: string;
    katakana: string;
    romaji: string;
};
