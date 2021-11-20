import * as unniqqud from "../src/index";
import { describe, it } from "mocha";
import * as assert from "assert";

const taamCodes: number[] = (() => {
	const taams = [];
	for (let charCode = 0x0591; charCode <= 0x05af; charCode++) {
		taams.push(charCode);
	}
	return taams;
})();

const niqqudCodes: number[] = (() => {
	const passthrough: number[] = [0x05be, 0x05c0, 0x05c3, 0x05c6];
	const taams = [];
	for (let charCode = 0x05b0; charCode <= 0x05c7; charCode++) {
		if (!passthrough.includes(charCode)) taams.push(charCode);
	}
	return taams;
})();

const nonDiacriticCodes: number[] = [
	...[..."abcdefghijklmnopqrstuvwxyz"].map(char => char.charCodeAt(0)),
	...[..."abcdefghijklmnopqrstuvwxyz".toUpperCase()].map(char =>
		char.charCodeAt(0)
	),
	...[..."\r\n\0 \t"].map(char => char.charCodeAt(0)),
	...[..."éøñēæœŭ"].map(char => char.charCodeAt(0)),
	...[...""].map(char => char.charCodeAt(0)),
	...[0xd83c, 0xddee, 0xd83c, 0xddf1], // emoji
	...[0x05be, 0x05c0, 0x05c3, 0x05c6], // passthrough
	...[0x0590, 0x05c8], // off by one
];

describe("unniqqud", () => {
	describe("isDiacriticCode", () => {
		it("returns true for ta'am codes", () => {
			for (const taamCode of taamCodes)
				assert.ok(unniqqud.isDiacriticCode(taamCode));
		});
		it("returns true for niqqud codes", () => {
			for (const niqqudCode of niqqudCodes)
				assert.ok(unniqqud.isDiacriticCode(niqqudCode));
		});
		it("returns false for non Hebrew diacritics", () => {
			for (const nonDiacriticCode of nonDiacriticCodes)
				assert.ok(!unniqqud.isDiacriticCode(nonDiacriticCode));
		});
	});

	describe("isNiqqudCode", () => {
		it("returns false for ta'am codes", () => {
			for (const taamCode of taamCodes)
				assert.ok(!unniqqud.isNiqqudCode(taamCode));
		});
		it("returns true for niqqud codes", () => {
			for (const niqqudCode of niqqudCodes)
				assert.ok(unniqqud.isNiqqudCode(niqqudCode));
		});
		it("returns false for non Hebrew diacritics", () => {
			for (const nonDiacriticCode of nonDiacriticCodes)
				assert.ok(!unniqqud.isNiqqudCode(nonDiacriticCode));
		});
	});

	describe("isTaamCode", () => {
		it("returns true for ta'am codes", () => {
			for (const taamCode of taamCodes)
				assert.ok(unniqqud.isTaamCode(taamCode));
		});
		it("returns false for niqqud codes", () => {
			for (const niqqudCode of niqqudCodes)
				assert.ok(!unniqqud.isTaamCode(niqqudCode));
		});
		it("returns false for non Hebrew diacritics", () => {
			for (const nonDiacriticCode of nonDiacriticCodes)
				assert.ok(!unniqqud.isTaamCode(nonDiacriticCode));
		});
	});

	describe("string", () => {
		const textDiacritics = "שָּׁל֖וֹם";
		const textNoTaam = "שָּׁלוֹם";
		const textNoNiqqud = "של֖ום";
		const textNoDiacritics = "שלום";
		it("removes diacritics", () =>
			assert.deepStrictEqual(
				unniqqud.string(textDiacritics),
				textNoDiacritics
			));
		it("removes niqqud", () =>
			assert.deepStrictEqual(
				unniqqud.string(textDiacritics, unniqqud.niqqud),
				textNoNiqqud
			));
		it("removes taam", () =>
			assert.deepStrictEqual(
				unniqqud.string(textDiacritics, unniqqud.taam),
				textNoTaam
			));
		it("leaves non-Hebrew alone", () => {
			const str = nonDiacriticCodes
				.map(code => String.fromCodePoint(code))
				.join("");
			assert.deepStrictEqual(unniqqud.string(str), str);
		});
	});
});
