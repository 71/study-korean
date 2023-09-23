function _1(md){return(
md`# Protobuf.js

First, create a package using [\`protoc\`](#protoc).

> Note: we can also access the [\`Root\`](https://protobufjs.github.io/protobuf.js/Root.html)
> directly using [\`protoc.raw\`](#protoc).`
)}

function _root(protoc){return(
protoc`
syntax = "proto3";

message Foo {
  string bar = 1;
}
`
)}

function _3(md){return(
md`All types in the package are exported; we can lookup the type [\`Foo\`](#Foo) directly:`
)}

function _Foo(root){return(
root.Foo
)}

function _5(md){return(
md`We can then create a \`Foo\` message:`
)}

function _foo(Foo){return(
Foo.create({ bar: "quux" })
)}

function _7(md){return(
md`And encode it to a buffer, and then decode it from that buffer.`
)}

function _encoded(Foo,foo){return(
Foo.encode(foo).finish()
)}

function _decoded(Foo,encoded){return(
Foo.decode(encoded)
)}

function _10(md){return(
md`## Appendix`
)}

function _protoc(protobufjs)
{
  async function protocRaw(strings, ...args) {
    const text = String.raw(strings, ...args),
          root = new protobufjs.Root();
  
    root.fetch = function (filename, callback) {
      if (filename === "dummy.proto") {
        return callback(undefined, text);
      }
  
      return protobufjs.Root.prototype.fetch.call(this, ...arguments);
    };
  
    return (await root.load("dummy.proto")).resolveAll();
  }

  return Object.assign(
    async function protoc(strings, ...args) {
      const root = await protocRaw(strings, ...args);

      return root.nested;
    },
    { raw: protocRaw },
  );
}


function _protobufjs(){return(
import("https://cdn.jsdelivr.net/npm/protobufjs@7.2.2/dist/protobuf.min.js").then(() => {
  const pbjs = window.protobuf;

  delete window.protobuf;

  return pbjs;
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("root")).define("root", ["protoc"], _root);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("Foo")).define("Foo", ["root"], _Foo);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("foo")).define("foo", ["Foo"], _foo);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("encoded")).define("encoded", ["Foo","foo"], _encoded);
  main.variable(observer("decoded")).define("decoded", ["Foo","encoded"], _decoded);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("protoc")).define("protoc", ["protobufjs"], _protoc);
  main.variable(observer("protobufjs")).define("protobufjs", _protobufjs);
  return main;
}
