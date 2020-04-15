export function MP(ak) {
  return new Promise(function (resolve, reject) {
    window.onload = function () {
      resolve(BMap)
    }
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//api.map.baidu.com/api?v=2.0&ak=iMAZit8WXHPF38QS2WRSL2gp9eW6mYvK&callback=init";
    script.onerror = reject;
    document.head.appendChild(script);
  })
}