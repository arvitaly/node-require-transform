
var walk = require('esprima-walk');
var acorn = require('acorn');
var escodegen = require('escodegen');
module.exports = function (source, callback) {
    var ast = acorn.parse(source);
    walk(ast, function (node) {
        if (node.type == "CallExpression") {
            if (node.callee.type == "Identifier" && node.callee.name == "require") {
                var res = callback(node.arguments.map((l) => {
                    return l.value;
                }));
                for (var i = 0; i < res.length; i++) {
                    node.arguments[i] = { type: "Literal", value: res[i], raw: "'" + res[i] + "'" };
                }
            }
        }
    })
    return escodegen.generate(ast);
}