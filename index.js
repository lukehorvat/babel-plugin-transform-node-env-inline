"use strict";

module.exports = function(babel) {
  var t = babel.types;

  return {
    visitor: {
      MemberExpression: function(path, state) {
        if (path.matchesPattern("process.env.NODE_ENV")) {
          path.replaceWith(t.valueToNode(process.env.NODE_ENV || state.opts.default));

          if (path.parentPath.isBinaryExpression()) {
            var evaluated = path.parentPath.evaluate();

            if (evaluated.confident) {
              path.parentPath.replaceWith(t.valueToNode(evaluated.value));
            }
          }
        }
      }
    }
  };
};
