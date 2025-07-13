export type OutputFormat = "hiragana" | "katakana" | "romaji";

export interface NumeralStrings {
  myriads: string[];
  units: string[];
  tens: string[];
  hundreds: string[];
  thousands: string[];
}

export interface PlaceValues {
  thousand: number;
  hundred: number;
  ten: number;
  one: number;
}

export interface ConversionOptions {
  type: OutputFormat;
}
