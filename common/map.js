export function MP(ak) {
  return new Promise(function (resolve, reject) {
    window.onload = function () {
      resolve(BMap)
    }
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//api.map.baidu.com/api?v=2.0&ak=Rh2WG4A1yr3ioPoSS4veIedSpfPDDYza&callback=init";
    script.onerror = reject;
    document.head.appendChild(script);
  })
}