/* eslint-disable no-console */
var transform = require('.');
var dest = transform("console.log('a'); function a(){ require('b') } a()", (originalValue) => {
    return originalValue + 1;
});
console.log(dest);