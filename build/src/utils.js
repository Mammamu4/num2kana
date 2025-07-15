import * as data from "./numToKana.js";
export function getMyriad(num, type) {
    switch (type) {
        case "kanji":
            return data.kanji.myriads[num];
        case "hiragana":
            return data.hiragana.myriads[num];
        case "katakana":
            return data.katakana.myriads[num];
        case "romaji":
            return data.romaji.myriads[num];
    }
}
export function getNumberOfMyriads(num) {
    return Math.floor((num.toString().length - 1) / 4);
}
function getMyriadSet(num) {
    const thousand = Math.floor(num / 1000);
    let remainder = num % 1000;
    const hundred = Math.floor(remainder / 100);
    remainder = remainder % 100;
    const ten = Math.floor(remainder / 10);
    const one = remainder % 10;
    return {
        thousand,
        hundred,
        ten,
        one,
    };
}
export function myriadSetToKana(num, options) {
    const { type, spaceRomaji } = options;
    const myriadSet = getMyriadSet(num);
    const script = data[type];
    return [
        script.thousands[myriadSet.thousand],
        script.hundreds[myriadSet.hundred],
        script.tens[myriadSet.ten],
        script.units[myriadSet.one],
    ]
        .filter((str) => str !== "")
        .join(spaceRomaji && type === "romaji" ? " " : "");
}
