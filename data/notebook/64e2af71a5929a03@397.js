function _1(md){return(
md`# Korean NLP`
)}

function _2(md){return(
md`Korean Natural Language Processing, powered by [\`okt.js\`](https://github.com/71/oktjs).`
)}

function _input(html,Text,tokenize,splitSentences,getSelection)
{
  const w = "100%",
        h = "100px",
        tokenColors = {
          Noun: "#228be6",
          Verb: "#fd7e14",
          Josa: "#7950f2",
          KoreanParticle: "#be4bdb",

          Alpha: "#20c997",
          Number: "#20c997",
          Punctuation: "#20c997",
        };

  const rootElement = html`
    <div id="input-root">
      <style>
        #input-root { display: flex; }
        #input-root > .text { flex: 2; }
        #input-root > .desc { flex: 1; }

        #input-root .input {
          outline: none;
        }

        #input-root .input > .token {
          transition: all .1s ease-out;
        }

        #input-root .input > .token:hover {
          border-radius: 4px;
          background-color: var(--token-color);
          box-shadow: 0 0 0 1px var(--token-color);
        }

        #input-root .sentences {
          pointer-events: none;
          position: absolute;
          white-space: pre;
          color: transparent;
        }

        #input-root .sentences > .token {
          border-bottom: 2px solid #ced4da;
        }

        ${Object.entries(tokenColors).map(([k, v]) => `
        #input-root .input > .token.${k} { --token-color: ${v}88; }`)}
      </style>

      <div class="text">
        <div class="sentences"></div>
        <div class="input" contenteditable></div>
      </div>
      <div class="desc"></div>
    </div>
  `;

  const inputElement = rootElement.querySelector(".input"),
        sentencesElement = rootElement.querySelector(".sentences"),
        descriptionElement = rootElement.querySelector(".desc");

  const createTokenElement = ({ text, pos: kind, stem }) => {
    const el = html`<span class="token${kind ? " " + kind : ""}">${text}</span>`;

    if (kind !== undefined) {
      const descr = `${kind}${stem ? `: ${stem}` : ""}`;

      el.addEventListener("mouseenter", () => {
        descriptionElement.textContent = descr === "Space" ? "" : descr;
        descriptionElement.style.color = tokenColors[kind] ?? "inherit";
      });

      el.addEventListener("mouseleave", () => {
        if (descriptionElement.textContent === descr) descriptionElement.textContent = "";
      });
    }

    return el;
  };

  const getAbsoluteOffset = (container, offset) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Range/startOffset
    let absoluteOffset = offset;

    for (;;) {
      while (container.previousSibling === null) {
        container = container.parentNode;

        if (container === inputElement) {
          return absoluteOffset;
        }
      }

      container = container.previousSibling;
      absoluteOffset += container.textContent.length;
    }
  };

  const getNodeAndRelativeOffset = (node, absoluteOffset) => {
    for (;;) {
      if (node instanceof Text) {
        const nodeText = node.nodeValue;
  
        if (absoluteOffset <= node.length) {
          return [node, absoluteOffset];
        }

        absoluteOffset -= nodeText.length;
      }

      if (node.firstChild !== null) {
        node = node.firstChild;
        continue;
      }

      for (;;) {
        if (node.nextSibling !== null) {
          node = node.nextSibling;
          break;
        }

        node = node.parentNode;

        if (node === inputElement) throw new Error("internal error");
      }
    }
  };

  const onChange = (e) => {
    // Tokenize and split input.
    const input = inputElement.textContent.replace("\xa0", " "),
          tokens = tokenize(input),
          sentences = splitSentences(input);

    // Mark sentences.
    const selection = getSelection(),
          ranges = Array.from({ length: selection.rangeCount }, (_, i) => {
            const range = selection.getRangeAt(i),
                  start = getAbsoluteOffset(range.startContainer, range.startOffset),
                  end = range.collapsed
                    ? start
                    : getAbsoluteOffset(range.endContainer, range.endOffset);

            return { start, end };
          });

    sentencesElement.textContent = "";

    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i];

      if (i > 0) {
        const start = sentences[i - 1].offset + sentences[i - 1].length,
          end = sentence.offset;

        sentencesElement.append(input.slice(start, end));
      }

      sentencesElement.appendChild(createTokenElement({ text: sentence.text }));
    }

    // Mark tokens; we don't actually do this is the user is composing a Korean character.
    if (e?.isComposing) {
      return;
    }

    inputElement.textContent = "";
    selection.removeAllRanges();

    for (const token of tokens) {
      inputElement.appendChild(createTokenElement(token));
    }

    for (const { start, end } of ranges) {
      const [startNode, startOffset] = getNodeAndRelativeOffset(inputElement.firstChild, start),
            [endNode, endOffset] = start === end
              ? [startNode, startOffset]
              : getNodeAndRelativeOffset(inputElement.firstChild, end),
            range = document.createRange();

      range.setStart(startNode, startOffset);
      range.setEnd(endNode, endOffset);

      selection.addRange(range);
    }

    // Notify of change.
    rootElement.value = input;
    rootElement.dispatchEvent(new CustomEvent("input"));
  };

  inputElement.textContent = "맞아 어젯밤에 봤어! ㅋㅋ";
  inputElement.addEventListener("input", onChange);
  inputElement.addEventListener("keypress", (e) => e.which === 13 && e.preventDefault());

  onChange();

  return rootElement;
}


function _4(md){return(
md`### Normalize

\`\`\`ts
function normalize(text: string): string;
\`\`\``
)}

function _normalized(normalize,input){return(
normalize(input)
)}

function _6(md){return(
md`### Tokenize

\`\`\`ts
function tokenize(text: string): KoreanToken[];
\`\`\``
)}

function _7(tokenize,normalized){return(
tokenize(normalized)
  .filter((x) => x.pos !== "Space")
  .map((x) => `${x.text} (${x.pos}${x.stem ? `: ${x.stem}` : ""})`)
)}

function _8(md){return(
md`### Extract phrases

\`\`\`ts
function extractPhrases(text: string): KoreanPhrase[];
function extractPhrases(tokens: KoreanToken[]): KoreanPhrase[];
\`\`\``
)}

function _9(extractPhrases,normalized){return(
extractPhrases(normalized).map((x) => `${x.text} (${x.pos})`)
)}

function _10(md){return(
md`### Split sentences

\`\`\`ts
function splitSentences(text: string): KoreanSentence[];
\`\`\``
)}

function _11(splitSentences,normalized){return(
splitSentences(normalized).map((x) => x.text)
)}

function _12(md){return(
md`## Appendix`
)}

function _normalize(Okt){return(
Okt.normalize
)}

function _tokenize(Okt){return(
Okt.tokenize
)}

function _extractPhrases(Okt){return(
Okt.extractPhrases
)}

function _splitSentences(Okt){return(
Okt.splitSentences
)}

function _Okt(){return(
import("https://cdn.jsdelivr.net/npm/oktjs@0.1.1/index.js")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof input")).define("viewof input", ["html","Text","tokenize","splitSentences","getSelection"], _input);
  main.variable(observer("input")).define("input", ["Generators", "viewof input"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("normalized")).define("normalized", ["normalize","input"], _normalized);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["tokenize","normalized"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["extractPhrases","normalized"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["splitSentences","normalized"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("normalize")).define("normalize", ["Okt"], _normalize);
  main.variable(observer("tokenize")).define("tokenize", ["Okt"], _tokenize);
  main.variable(observer("extractPhrases")).define("extractPhrases", ["Okt"], _extractPhrases);
  main.variable(observer("splitSentences")).define("splitSentences", ["Okt"], _splitSentences);
  main.variable(observer("Okt")).define("Okt", _Okt);
  return main;
}
