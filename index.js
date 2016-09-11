var esprima = require('esprima');
var walk = require('esprima-walk');
var escodegen = require('escodegen');
module.exports = function (source, callback) {
    var ast = esprima.parse(source);
    walk(ast, function (node) {
        if (node.type == "CallExpression") {
            if (node.callee.type == "Identifier" && node.callee.name == "require") {
                node.arguments[0].value = callback(node.arguments[0].value);
            }
        }
    })
    return escodegen.generate(ast);
}