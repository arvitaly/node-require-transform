var esprima = require('esprima');
var escodegen = require('escodegen');
module.exports = function (source, callback) {
    var ast = esprima.parse(source);
    parseAst(ast);
    return escodegen.generate(ast);

    function parseAst(ast) {
        switch (ast.type) {
            case "Program":
                return parseProgram(ast);
            default:
                throw new Error("Unknown type " + ast.type);
        }

    }
    function parseProgram(ast) {
        return { type: "Program", body: parseBody(ast.body) };
    }
    function parseBody(exprs) {
        return exprs.map(parseExpression)
    }
    function parseExpression(expr) {
        switch (expr.type) {
            case "ExpressionStatement":
                return parseExpressionStatement(expr);
            case "CallExpression":
                return parseCallExpression(expr);
            case 'Identifier':
                return parseIdentifier(expr);
            case 'MemberExpression':
                return parseMemberExpression(expr);
            case 'Literal':
                return parseLiteral(expr);
        }
    }
    function parseLiteral(expr) {
        return { type: 'Literal', value: expr.value, raw: expr.raw };
    }
    function parseIdentifier(expr) {
        return { type: 'Identifier', name: expr.name }
    }
    function parseMemberExpression(expr) {
        return { object: parseExpression(expr.object), property: parseExpression(expr.property) }
    }
    function parseCallExpression(expr) {
        if (expr.callee.type == "Identifier" && expr.callee.name == "require") {
            expr.arguments[0].value = callback(expr.arguments[0].value);
        }
        return {
            callee: parseExpression(expr.callee),
            arguments: expr.arguments.map(parseExpression)
        };

    }
    function parseExpressionStatement(expr) {
        return { expression: parseExpression(expr.expression) };
    }
}