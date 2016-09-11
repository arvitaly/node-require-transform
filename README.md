# node-require-transform
Library for regenerate source file with rewrite require-function body

[![npm version](https://badge.fury.io/js/node-require-transform.svg)](https://badge.fury.io/js/node-require-transform)
[![Build Status](https://travis-ci.org/arvitaly/node-require-transform.svg?branch=master)](https://travis-ci.org/arvitaly/node-require-transform)
[![Coverage Status](https://coveralls.io/repos/github/arvitaly/node-require-transform/badge.svg?branch=master)](https://coveralls.io/github/arvitaly/node-require-transform?branch=master)

# Install

    npm install node-require-transform --save

# Usage

    var transform = require('node-require-transform');
    var dest = transform("console.log('a'); function a(){ require('b') } a()", (originalValue)=>{
        return originalValue + 1;
    });
    console.log(dest);
    /*console.log('a');                                                                                                                                        
      function a() {                                                                                                                                           
         require('b1');                                                                                                                                       
      }                                                                                                                                                        
     a();*/     