/**
 * The char-codes in this array are in punctuation Unicode sections but aren't really
 * niqqud, so we shouldn't consider them as such when we're strict.
 *
 * They're not mingled with cantillation, however, so no need to check for them there.
 *
 * @private
 */
const passthroughCharCodes: number[] = [
	0x05be, // Maqaf
	0x05c0, // Paseq
	0x05c3, // Sof-Pasuq
	0x05c6, // Nun Hafukha
];

/**
 * @returns whether the given character code is a diacritic character (either niqqud or cantillation).
 */
export function isDiacriticCode(charCode: number): boolean {
	return (
		0x0591 <= charCode &&
		charCode <= 0x05c7 &&
		!passthroughCharCodes.includes(charCode)
	);
}

/**
 * @returns whether the given character code is a niqqud (vowel diacritic) character.
 */
export function isNiqqudCode(charCode: number): boolean {
	return (
		0x05b0 <= charCode &&
		charCode <= 0x05c7 &&
		!passthroughCharCodes.includes(charCode)
	);
}

/**
 * @returns whether the given character code is a ta'am (cantillation diacritic) character.
 */
export function isTaamCode(charCode: number): boolean {
	return 0x0591 <= charCode && charCode <= 0x05af;
}

/**
 * @returns whether the given character is a diacritic character (either niqqud or cantillation).
 */
export function diacritic(charCode: string): boolean {
	return isDiacriticCode(charCode.charCodeAt(0));
}

/**
 * @returns whether the given character is a niqqud (vowel diacritic) character.
 */
export function niqqud(charCode: string): boolean {
	return isNiqqudCode(charCode.charCodeAt(0));
}

/**
 * @returns whether the given character is a ta'am (cantillation diacritic) character.
 */
export function taam(charCode: string): boolean {
	return isTaamCode(charCode.charCodeAt(0));
}

/**
 * Removes diacritics from the given string.
 * @param input The input string.
 * @param diacriticType The type of diacritics to remove. Must be one of:
 * - {@link diacritic}: removes all diacritics (default).
 * - {@link niqqud}: removes all niqqud diacritics.
 * - {@link taam}: removes all ta'am diacritics.
 * @returns The input string with the desired diacritics removed.
 */
export function string(
	input: string,
	diacriticType: (char: string) => boolean = diacritic
): string {
	return [...input].filter(char => !diacriticType(char)).join("");
}

export default string;
