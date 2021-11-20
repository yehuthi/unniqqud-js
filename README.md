# unniqqud [<img src="https://img.shields.io/npm/v/unniqqud?logo=npm" align="right" />](https://www.npmjs.com/package/unniqqud)

Remove niqqud (Hebrew vowel diacritics) and/or ta'amim (Hebrew cantillation diacritics; singular: ta'am) from text.

## Installation

```shell
npm i unniqqud
```

## Usage

### Examples

To just remove all diacritics from strings:
```ts
import unniqqud from "unniqqud";
unniqqud("שָּׁל֖וֹם") // = "שלום"
```

To selectively remove either niqqud or ta'amim:
```ts
import * as unniqqud from "unniqqud";
unniqqud.string("שָּׁל֖וֹם", unniqqud.niqqud) // = "של֖ום"
unniqqud.string("שָּׁל֖וֹם", unniqqud.taam) // = "שָּׁלוֹם"
unniqqud.string("שָּׁל֖וֹם", unniqqud.diacritic) // = "שלום"
// or just
unniqqud.string("שָּׁל֖וֹם") // = "שלום"
```

If you work with individual characters you can use `niqqud`, `taam` and `diacritics` as predicates as well:
```ts
import * as unniqqud from "unniqqud";
const qamatz = '\u05B8';
niqqud.niqqud(qamatz) // = true
niqqud.taam(qamatz) // = false
niqqud.diacritic(qamatz) // = true
```

ALl three predicates have a `is*Code` variant that checks a character-code number instead of a string. E.g.
```ts
import * as unniqqud from "unniqqud";
unniqqud.isNiqqud(0x05B8 /* i.e. Qamatz */) // = true
```

## See Also

[he2paleo](https://github.com/yehuthi/he2paleo/): convert Hebrew script to Paleo-Hebrew / Phoenician script.
