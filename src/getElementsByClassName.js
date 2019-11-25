// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  var result = [];
  var node = document.body;
  var search = function (node) {

    if (node.classList && node.classList.contains(className)) {
      result.push(node);
    }

    if (node.hasChildNodes()) {
      for (var i = 0; i < node.childNodes.length; i++) {
        search(node.childNodes[i]);
      }
    }
  }
  search(node);
  return result;
};
