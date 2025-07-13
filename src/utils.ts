import * as data from "./numToKana.js";
import { OutputFormat, PlaceValues } from "./types.js";

export function getMyriad(num: number, type: OutputFormat): string {
  switch (type) {
    case "hiragana":
      return data.hiragana.myriads[num];
    case "katakana":
      return data.katakana.myriads[num];
    case "romaji":
      return data.romaji.myriads[num];
  }
}

export function getNumberOfMyriads(num: number): number {
  return Math.floor((num.toString().length - 1) / 4);
}

function getMyriadSet(num: number): PlaceValues {
  const thousand: number = Math.floor(num / 1000);
  let remainder: number = num % 1000;
  const hundred: number = Math.floor(remainder / 100);
  remainder = remainder % 100;
  const ten: number = Math.floor(remainder / 10);
  const one: number = remainder % 10;
  return {
    thousand,
    hundred,
    ten,
    one,
  };
}

export function myriadSetToKana(num: number, type: OutputFormat): string {
  const myriadSet: PlaceValues = getMyriadSet(num);
  const script = data[type];
  return [
    script.thousands[myriadSet.thousand],
    script.hundreds[myriadSet.hundred],
    script.tens[myriadSet.ten],
    script.units[myriadSet.one],
  ]
    .filter((str): str is string => str !== "")
    .join(type === "romaji" ? " " : "");
}
