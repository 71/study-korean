// https://observablehq.com/@mbostock/hello-jszip@69
function _1(md){return(
md`# Hello, JSZip

This notebook demonstrates how to use [JSZip](http://stuk.github.io/jszip/) to read files from a ZIP archive. JSZip’s \`main\` entry is CommonJS, but it provides a minified UMD in the \`dist\` folder which we can require.`
)}

function _jszip(require){return(
require("jszip@3/dist/jszip.min.js")
)}

function _3(md){return(
md`You can [fetch](https://fetch.spec.whatwg.org/) binary files using *response*.arrayBuffer. Then pass the result to [JSZip.loadAsync](http://stuk.github.io/jszip/documentation/api_jszip/load_async.html).`
)}

function _archive(FileAttachment,jszip){return(
FileAttachment("ne_50m_admin_0_countries.zip")
  .arrayBuffer()
  .then(buffer => jszip.loadAsync(buffer))
)}

function _5(md){return(
md`Now that the archive has been downloaded, we can extract files from it using [*archive*.file](http://stuk.github.io/jszip/documentation/api_jszip/file_name.html) and then [*file*.async](http://stuk.github.io/jszip/documentation/api_zipobject/async.html). These are binary files, so we’ll use ArrayBuffers.`
)}

function _shp(archive){return(
archive.file("ne_50m_admin_0_countries.shp").async("arraybuffer")
)}

function _dbf(archive){return(
archive.file("ne_50m_admin_0_countries.dbf").async("arraybuffer")
)}

function _8(md){return(
md`To make this example a little bit more compelling, we’ll use a [Shapefile parser](https://github.com/mbostock/shapefile) to convert these binary files into the more browser-friendly GeoJSON format.`
)}

function _shapefile(require){return(
require("shapefile@0.6")
)}

function _collection(shapefile,shp,dbf){return(
shapefile.read(shp, dbf)
)}

function _11(md){return(
md`Lastly, we’ll use D3 to display the shapefile as a map.`
)}

function _d3(require){return(
require("d3-geo@1")
)}

function _13(DOM,width,d3,collection)
{
  const height = 500;
  const context = DOM.context2d(width, height);
  const projection = d3.geoEqualEarth();
  const path = d3.geoPath(projection, context);
  context.lineJoin = "round";
  context.beginPath();
  path(collection);
  context.lineWidth = 0.5;
  context.stroke();
  context.beginPath();
  path({type: "Sphere"});
  context.lineWidth = 1.5;
  context.stroke();
  return context.canvas;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["ne_50m_admin_0_countries.zip", {url: new URL("./files/d8d1178d5b75a25f7f1e19695aa6554c317f40323b64971e01a4bfbaaed8c047a50fa616a6ad6c7acc85210d63adcbe47b0576504f0bfef93ba33cc1676a85de.zip", import.meta.url), mimeType: "application/zip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("jszip")).define("jszip", ["require"], _jszip);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("archive")).define("archive", ["FileAttachment","jszip"], _archive);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("shp")).define("shp", ["archive"], _shp);
  main.variable(observer("dbf")).define("dbf", ["archive"], _dbf);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("shapefile")).define("shapefile", ["require"], _shapefile);
  main.variable(observer("collection")).define("collection", ["shapefile","shp","dbf"], _collection);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer()).define(["DOM","width","d3","collection"], _13);
  return main;
}
