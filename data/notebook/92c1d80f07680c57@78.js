// https://observablehq.com/@mbostock/lazy-download@78
function _1(md){return(
md`# Lazy Download

An alternative to DOM.download that lazily computes the value to be downloaded, and allows the value to be specified asynchronously. However, the downside is that two clicks are required if the value is asynchronous: first to save the value, and then the second to download it.`
)}

function _2(download,Promises){return(
download(async () => {
  await Promises.delay(1000);
  return new Blob(
    [JSON.stringify({hello: "world"})], 
    {type: "application/json"}
  );
})
)}

function _download(html){return(
function download(value, name = "untitled", label = "Save") {
  const a = html`<a><button></button></a>`;
  const b = a.firstChild;
  b.textContent = label;
  a.download = name;

  async function reset() {
    await new Promise(requestAnimationFrame);
    URL.revokeObjectURL(a.href);
    a.removeAttribute("href");
    b.textContent = label;
    b.disabled = false;
  }

  a.onclick = async event => {
    b.disabled = true;
    if (a.href) return reset(); // Already saved.
    b.textContent = "Saving…";
    try {
      const object = await (typeof value === "function" ? value() : value);
      b.textContent = "Download";
      a.href = URL.createObjectURL(object);
    } catch (ignore) {
      b.textContent = label;
    }
    if (event.eventPhase) return reset(); // Already downloaded.
    b.disabled = false;
  };

  return a;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["download","Promises"], _2);
  main.variable(observer("download")).define("download", ["html"], _download);
  return main;
}
