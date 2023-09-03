## Background

This repository is the basis for my study of Korean, at least when it comes to
using vocabulary.

After going through all the free [TTMIK Essential Korean course](
https://talktomeinkorean.com/curriculum/) and finishing the (old)
[Duolingo](https://www.duolingo.com/course/ko/en/Learn-Korean) course, I no
longer have fun studying Korean, and no longer make progress.

Other apps are either too expensive, only teach basics, or just don't keep me
entertained. Anki is good, but is more of a chore than anything else, and when
studying using sentences I memorize sentences rather than the individual words
making them up.

Ideally, [Lingvist](https://lingvist.com/) would work, but:
1. It's not available for Korean,
2. Even if it were, this would be too expensive for me, especially since
   Lingvist doesn't work offline.

There's [Clozemaster](https://www.clozemaster.com/), but I can't see any logic
in how it teaches me new words. Words in a single study session aren't related
and use widely different grammar points. Unlike Lingvist, Clozemaster doesn't
recognize that two synonyms can be used for a same blank.

This repository uses the idea behind Lingvist and adapts it to Korean:
- Words are sorted by usage, and taught from the most used Korean words to the
  least used ones.
- Words aren't taught by themselves, but rather as parts of larger sentences.
  Since a lot of sentences make up the corpus, the same word is taught through
  different sentences, avoiding to memorize sentences instead of words.
  - Note that this is the reason why this cannot be an Anki deck. Here
    different sentences teach the same word (which progresses independently
    from the sentences), which cannot be done in Anki.
- Spaced repetition is used.

Additionally:
- It's 100% free, and exclusively works offline.
  - Sorry, no syncing for now.
- Similarly, the data used to make the app is available, and the [notebook
  used to generate that data][notebook] is also available.
- It's entirely generated automatically. The only "curation" is done by
  choosing a limited amount of examples extracted from [this excellent Anki
  deck][evita-anki].

## Data

All data is produced by the [notebook] using the specified files:
- `data/한국어 학습용 어휘 목록.xls`: most common Korean words ([source](https://www.korean.go.kr/front/etcData/etcDataView.do?mn_id=46&etc_seq=71))
- `data/kodict.zip`: Korean words with definitions, translations, examples and more ([source](https://krdict.korean.go.kr/download/downloadList))
- `data/Korean_Grammar_Sentences_by_Evita.apkg`: self-explanatory ([source][evita-anki])

Other files in `data/` are produced by the [notebook]. Tokenization is
performed using [Open Korean Text](https://github.com/open-korean-text/open-korean-text).

The notebook was also saved to [`data/notebook`](data/notebook).

## App

I'm working on an Android app using that data right now. It's not ready yet, so
please bear with me.

## Disclaimer

This data was produced by me, for free, using other free resources. I don't
make guarantees regarding its quality, and more than anything, authors of the
works cited above are in no way involved in this project. Please don't use the
data in this repository for commercial purposes without asking them for their
permission first.


[notebook]: https://observablehq.com/@71/korean-words
[evita-anki]: https://ankiweb.net/shared/info/3614346923
