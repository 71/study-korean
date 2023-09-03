// http://www.programminginkorean.com/programming/hangul-in-unicode/composing-syllables-in-unicode/
// http://www.unicode.org/charts/PDF/U1100.pdf
const initial = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const medial  = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
const final   = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";
const allJamo = initial + medial + final;
const base    = 0xAC00;

const [replacePairsRegex, replacePairsMap] = (() => {
  const replacePairs = ( "ㅂㅂ ㅃ, ㅈㅈ ㅉ, ㄷㄷ ㄸ, ㄱㄱ ㄲ, ㅅㅅ ㅆ, ㄱㅅ ㄳ, ㄴㅈ ㄵ, ㄴㅎ ㄶ, "
                       + "ㄹㄱ ㄺ, ㄹㅁ ㄻ, ㄹㅂ ㄼ, ㄹㅅ ㄽ, ㄹㅌ ㄾ, ㄹㅍ ㄿ, ㄹㅎ ㅀ, ㅂㅅ ㅄ, "
                       + "ㅗㅏ ㅘ, ㅗㅐ ㅙ, ㅗㅣ ㅚ, ㅡㅣ ㅢ, ㅜㅣ ㅟ, ㅜㅓ ㅝ, ㅜㅔ ㅞ"
                       ).split(", ").map(x => x.split(" "));

  return [
    new RegExp(replacePairs.map((x) => x[0]).join("|"), "g"),
    Object.fromEntries(replacePairs),
  ];
})();

function isSyllable(charCode: number): boolean {
  return charCode >= 0xAC00 && charCode <= 0xD7A3;
}

function isJamo(charCode: number): boolean {
  return allJamo.includes(String.fromCharCode(charCode));
}

export function syllablesToJamo(syllables: string): string {
  let result = "";

  for (const syl of syllables) {
    const x = syl.charCodeAt(0);

    if (!isSyllable(x)) {
      if (isJamo(x)) {
        result += String.fromCharCode(x);
        continue;
      }

      throw new Error("invalid syllable");
    }

    const syllable     = x - base;
    const initialIndex = (syllable / 28) / 21 | 0;
    const medialIndex  = (syllable / 28) % 21 | 0;
    const finalIndex   = syllable % 28;
    const initialChar  = initial[initialIndex];
    const medialChar   = medial[medialIndex];

    result += finalIndex === 0
      ? initialChar + medialChar
      : initialChar + medialChar + final[finalIndex - 1];
  }

  return result;
}

export function jamoToSyllable(jamo: string): string {
  jamo = jamo.replace(replacePairsRegex, (pair) => replacePairsMap[pair]);

  if (jamo.length !== 2 && jamo.length !== 3) {
    throw new Error("a syllable must have two or three jamo");
  }

  const initialIndex = initial.indexOf(jamo[0]);
  const medialIndex = medial.indexOf(jamo[1]);

  if (initialIndex === -1) {
    throw new Error("invalid initial jamo");
  }
  if (medialIndex === -1) {
    throw new Error("invalid medial jamo");
  }

  if (jamo.length === 2) {
    return String.fromCharCode(base + initialIndex * 588 + medialIndex * 28);
  }

  const finalIndex = final.indexOf(jamo[2])

  if (finalIndex === -1) {
    throw new Error("invalid final jamo");
  }

  return String.fromCharCode(base + initialIndex * 588 + medialIndex * 28 + finalIndex + 1);
}
