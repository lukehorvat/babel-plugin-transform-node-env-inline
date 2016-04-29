"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      MemberExpression: function MemberExpression(path, state) {
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
