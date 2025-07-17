# num2kana

This package helps you translate numbers into Japanese writing systems, making it a useful tool for learning how to count in Japanese. While numbers are most commonly written in kanji, this package also supports conversion to hiragana and katakana—great for practicing pronunciation and understanding native usage.

Check out this [demo](https://num2kana.fredriketsare.se/)! It shows how the package can be utilized. You can use it to learn all about japanese numerals.

## Installation

```bash
npm install num2kana
```

## Usage

### Basic Usage

```javascript
import { 
  numToKana
  numToKanji, 
  numToHiragana, 
  numToKatakana, 
  numToRomaji,
  numToAllFormats 
} from 'num2kana';

// Convert numbers to kanji (default)
console.log(numToKanji(42)); // 四十二

// Convert to hiragana
console.log(numToHiragana(42)); // よんじゅうに

// Convert to katakana
console.log(numToKatakana(42)); // ヨンジュウニ

// Convert to romaji
console.log(numToRomaji(42)); // yonjuuni

// Get all formats at once
const allFormats = numToAllFormats(42);
console.log(allFormats);
// {
//   kanji: '四十二',
//   hiragana: 'よんじゅうに',
//   katakana: 'ヨンジュウニ',
//   romaji: 'yonjuuni'
// }
```

### Larger Numbers

The package supports numbers up to 10^20:

```javascript
// Ten thousand (myriad) in Japanese
console.log(numToKanji(10000)); // 一万

// One million
console.log(numToKanji(1000000)); // 百万

// One billion
console.log(numToKanji(1000000000)); // 十億

// Example with a mixed number
console.log(numToKanji(12345)); // 一万二千三百四十五
console.log(numToHiragana(12345)); // いちまんにせんさんびゃくよんじゅうご
```

### Options

You can customize the output with options:

```javascript
// For romaji, you can control spacing between number groups
console.log(numToRomaji(12345, { spaceRomaji: true })); // ichi man nisen sanbyaku yonjuu go
console.log(numToRomaji(12345, { spaceRomaji: false })); // ichimannisensanbyakuyonjuugo

// You can also use main method with options
console.log(numToKana(42, {type: "romanji", spaceRomanji: true})) // yonjuu ni
console.log(numToKana(42, {type: "katakana"})) // ヨンジュウニ
```

#### Default options
```javascript
{
  type: "kanji",
  spaceRomaji: true
}
```

## License

MIT

## Author
[@mammamu4](https://www.github.com/mammamu4)