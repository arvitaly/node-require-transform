var babel = require('babel-core');
module.exports = function (source, callback) {
    return babel.transform(source, {
        plugins: [function ({ types: t }) {
            return {
                visitor: {
                    CallExpression(path) {
                        if (!path.isCallExpression()) return false;
                        if (!path.get("callee").isIdentifier({ name: "require" })) return false;
                        if (path.scope.getBinding("require")) return false;
                        var res = callback(path.node.arguments);
                        if (res) {
                            path.node.arguments = res;
                        }
                    }
                }
            }
        }]
    }).code;
}