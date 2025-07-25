export type OutputFormat = "kanji" | "hiragana" | "katakana" | "romaji";
export interface NumeralStrings {
    myriads: string[];
    units: string[];
    tens: string[];
    hundreds: string[];
    thousands: string[];
    traditional?: {
        4: string;
        7: string;
        9: string;
    };
}
export interface PlaceValues {
    thousand: number;
    hundred: number;
    ten: number;
    one: number;
}
export interface ConversionOptions {
    type: OutputFormat;
    spaceRomaji?: boolean;
}
export declare const DEFAULT_OPTIONS: ConversionOptions;
