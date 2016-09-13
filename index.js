var walk = require('estree-walker').walk;
var acorn = require('acorn');
var escodegen = require('escodegen');
module.exports = function (source, callback) {
    var ast = acorn.parse(source);
    walk(ast, {
        enter: function (node) {
            if (node.type == "CallExpression") {
                if (node.callee.type == "Identifier" && node.callee.name == "require") {
                    var res = callback(node.arguments);
                    if (res) {
                        node.arguments = res;
                    }
                }
            }
        }
    })
    return escodegen.generate(ast);
}