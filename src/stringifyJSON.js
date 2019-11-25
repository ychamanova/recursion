// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function (obj) {
  var result = [];
  var val = obj;
  function stringify(val) {

    //if not array or not object
    if (!Array.isArray(val) && typeof val !== 'object') {
      /////
      if (typeof val === 'undefined') {
        result.push('');
      }
      else if (typeof val === 'string') {
        result.push('"', obj, '"');
      }
      else {
        result.push(val);
      }
    }

    //check if the value is null
    if (val === null) {
      result.push('null');
    }

    //check if the value is an array
    if (Array.isArray(val)) {
      if (val.length === 0) {
        // if array is empty
        result.push('[]');
      } else {
        result.push('[');
        val.forEach(function (e) {
          if (typeof e === 'object' && e !== null) {
            stringify(e);
          }
          else if (typeof e === 'string') {
            result.push('"', e, '"');
          }
          else if (e === null) {
            result.push('null');
          }
          else if (typeof e === 'function' || typeof e === 'undefined') {
            result.push('');
          }
          else {
            result.push(e);
          }
          result.push(','); //comma after each element iteration
        });
        result.pop(); // if array iteration is done, get rid of last comma
        result.push(']');
      }
    };
    //check if the value is not an array and an object
    if (!Array.isArray(val) && typeof val === 'object' && val !== null) {

      // check if the object is empty
      if (isEmpty(val)) {
        result.push('{}');
      }

      //if it is not empty
      else {
        result.push('{');

        for (var key in val) { //check each key in root obj

          if (typeof val[key] === 'function' || typeof val[key] === 'undefined') {
            result.push('');
          }

          else {
            var thisKey = '"' + key.toString() + '":'; //convert key to string (it can't be an object)
            result.push(thisKey);

            //if the value of this key is an object make same procedure on the root obj
            if (typeof val[key] === 'object' && val[key] !== null) {
              stringify(val[key]);
            }
            else if (typeof val[key] === 'string') {
              result.push('"', val[key], '"');
            }
            else if (val[key] === null) {
              result.push('null');
            }
            else {
              result.push(val[key]);
            }
            result.push(','); //comma after each key iteration
          }
        }
        // if object iteration is done, get rid of last comma
        result.pop();
        result.push('}');
      }
    }
  }
  //function that returns true if the object is empty
  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  }

  stringify(val);
  return result.join('');
}
