import test from "node:test";
import assert from "node:assert";
import {
  getMyriad,
  getNumberOfMyriads,
  myriadSetToKana,
} from "../src/utils.js";
import {
  numToKana,
  numToHiragana,
  numToKatakana,
  numToRomaji,
  numToKanji,
} from "../src/index.js";
import { ConversionOptions } from "../src/types.js";

test("getMyriad", async (t) => {
  await t.test("returns correct hiragana myriads", () => {
    assert.strictEqual(getMyriad(0, "hiragana"), "");
    assert.strictEqual(getMyriad(1, "hiragana"), "まん");
    assert.strictEqual(getMyriad(2, "hiragana"), "おく");
    assert.strictEqual(getMyriad(3, "hiragana"), "ちょう");
  });

  await t.test("returns correct katakana myriads", () => {
    assert.strictEqual(getMyriad(0, "katakana"), "");
    assert.strictEqual(getMyriad(1, "katakana"), "マン");
    assert.strictEqual(getMyriad(2, "katakana"), "オク");
  });

  await t.test("returns correct romaji myriads", () => {
    assert.strictEqual(getMyriad(0, "romaji"), "");
    assert.strictEqual(getMyriad(1, "romaji"), "man");
    assert.strictEqual(getMyriad(2, "romaji"), "oku");
    assert.strictEqual(getMyriad(3, "romaji"), "chou");
    assert.strictEqual(getMyriad(4, "romaji"), "kei");
    assert.strictEqual(getMyriad(5, "romaji"), "gai");
  });
});

test("getNumberOfMyriads", async (t) => {
  await t.test("calculates myriad groups correctly", () => {
    assert.strictEqual(getNumberOfMyriads(0), 0);
    assert.strictEqual(getNumberOfMyriads(9), 0);
    assert.strictEqual(getNumberOfMyriads(10), 0);
    assert.strictEqual(getNumberOfMyriads(999), 0);
    assert.strictEqual(getNumberOfMyriads(1000), 0);
    assert.strictEqual(getNumberOfMyriads(9999), 0);
    assert.strictEqual(getNumberOfMyriads(10000), 1);
    assert.strictEqual(getNumberOfMyriads(10001), 1);
    assert.strictEqual(getNumberOfMyriads(99999999), 1);
    assert.strictEqual(getNumberOfMyriads(100000000), 2);
    assert.strictEqual(getNumberOfMyriads(999999999999), 2);
    assert.strictEqual(getNumberOfMyriads(1000000000000), 3);
    assert.strictEqual(getNumberOfMyriads(10000000000000), 3);
    assert.strictEqual(getNumberOfMyriads(Math.pow(10, 4)), 1);
    assert.strictEqual(getNumberOfMyriads(Math.pow(10, 8)), 2);
    assert.strictEqual(getNumberOfMyriads(Math.pow(10, 12)), 3);
    assert.strictEqual(getNumberOfMyriads(Math.pow(10, 16)), 4);
    assert.strictEqual(getNumberOfMyriads(Math.pow(10, 20)), 5);
  });
});

test("myriadSetToKana", async (t) => {
  const hiraganaOptions: ConversionOptions = { type: "hiragana" };
  const katakanOptions: ConversionOptions = { type: "katakana" };
  const romajiOptions: ConversionOptions = {
    type: "romaji",
    spaceRomaji: false,
  };
  const romajiSpaceOptions: ConversionOptions = {
    type: "romaji",
    spaceRomaji: true,
  };

  await t.test("converts simple numbers to hiragana correctly", () => {
    assert.strictEqual(myriadSetToKana(1, hiraganaOptions), "いち");
    assert.strictEqual(myriadSetToKana(5, hiraganaOptions), "ご");
    assert.strictEqual(myriadSetToKana(10, hiraganaOptions), "じゅう");
    assert.strictEqual(myriadSetToKana(42, hiraganaOptions), "よんじゅうに");
    assert.strictEqual(
      myriadSetToKana(123, hiraganaOptions),
      "ひゃくにじゅうさん"
    );
    assert.strictEqual(
      myriadSetToKana(1234, hiraganaOptions),
      "せんにひゃくさんじゅうよん"
    );
  });

  await t.test("converts simple numbers to katakana correctly", () => {
    assert.strictEqual(myriadSetToKana(1, katakanOptions), "イチ");
    assert.strictEqual(myriadSetToKana(5, katakanOptions), "ゴ");
    assert.strictEqual(myriadSetToKana(10, katakanOptions), "ジュウ");
    assert.strictEqual(myriadSetToKana(42, katakanOptions), "ヨンジュウニ");
  });

  await t.test("converts simple numbers to romaji correctly", () => {
    assert.strictEqual(myriadSetToKana(1, romajiOptions), "ichi");
    assert.strictEqual(myriadSetToKana(5, romajiOptions), "go");
    assert.strictEqual(myriadSetToKana(10, romajiOptions), "juu");
    assert.strictEqual(myriadSetToKana(42, romajiOptions), "yonjuuni");
  });

  await t.test("handles spacing in romaji correctly", () => {
    assert.strictEqual(
      myriadSetToKana(123, romajiSpaceOptions),
      "hyaku nijuu san"
    );
    assert.strictEqual(myriadSetToKana(123, romajiOptions), "hyakunijuusan");
  });
});

test("numToKana", async (t) => {
  await t.test("converts zero correctly", () => {
    assert.strictEqual(numToKana(0), "零");
    assert.strictEqual(numToKana(0, { type: "hiragana" }), "れい");
    assert.strictEqual(numToKana(0, { type: "katakana" }), "レイ");
    assert.strictEqual(numToKana(0, { type: "romaji" }), "rei");
  });

  await t.test(
    "converts single digit numbers correctly with default kanji",
    () => {
      assert.strictEqual(numToKana(1), "一");
      assert.strictEqual(numToKana(9), "九");
      assert.strictEqual(numToKana(5, { type: "hiragana" }), "ご");
      assert.strictEqual(numToKana(5, { type: "katakana" }), "ゴ");
      assert.strictEqual(numToKana(7, { type: "romaji" }), "nana");
    }
  );

  await t.test("converts teen numbers correctly", () => {
    assert.strictEqual(numToKana(10), "十");
    assert.strictEqual(numToKana(15), "十五");
    assert.strictEqual(numToKana(19, { type: "katakana" }), "ジュウキュウ");
  });

  await t.test("converts larger numbers correctly", () => {
    assert.strictEqual(numToKana(42), "四十二");
    assert.strictEqual(numToKana(100), "百");
    assert.strictEqual(numToKana(999), "九百九十九");
    assert.strictEqual(numToKana(1000), "千");
    assert.strictEqual(numToKana(1234), "千二百三十四");
    assert.strictEqual(numToKana(9999), "九千九百九十九");
  });

  await t.test("converts myriad groups correctly", () => {
    assert.strictEqual(numToKana(10000), "一万");
    assert.strictEqual(numToKana(10001), "一万一");
    assert.strictEqual(numToKana(12345), "一万二千三百四十五");
    assert.strictEqual(numToKana(100000000), "一億");
    assert.strictEqual(numToKana(1000000000000), "一兆");
  });

  await t.test("handles spacing in romaji correctly", () => {
    assert.strictEqual(
      numToKana(12345, { type: "romaji", spaceRomaji: true }),
      "ichiman nisen sanbyaku yonjuu go"
    );
    assert.strictEqual(
      numToKana(12345, { type: "romaji", spaceRomaji: false }),
      "ichimannisensanbyakuyonjuugo"
    );
  });
});

// Helper function tests
test("helper functions", async (t) => {
  await t.test("numToKanji converts correctly", () => {
    assert.strictEqual(numToKanji(123), "百二十三");
    assert.strictEqual(numToKanji(1234567), "百二十三万四千五百六十七");
  });

  await t.test("numToHiragana converts correctly", () => {
    assert.strictEqual(numToHiragana(123), "ひゃくにじゅうさん");
    assert.strictEqual(
      numToHiragana(1234567),
      "ひゃくにじゅうさんまんよんせんごひゃくろくじゅうなな"
    );
  });

  await t.test("numToKatakana converts correctly", () => {
    assert.strictEqual(numToKatakana(123), "ヒャクニジュウサン");
    assert.strictEqual(
      numToKatakana(1234567),
      "ヒャクニジュウサンマンヨンセンゴヒャクロクジュウナナ"
    );
  });

  await t.test("numToRomaji converts correctly", () => {
    assert.strictEqual(numToRomaji(123), "hyaku nijuu san");
    assert.strictEqual(
      numToRomaji(123, { spaceRomaji: false }),
      "hyakunijuusan"
    );
    assert.strictEqual(
      numToRomaji(1234567),
      "hyaku nijuu sanman yonsen gohyaku rokujuu nana"
    );
  });
});
