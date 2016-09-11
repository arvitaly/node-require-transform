# node-require-transform
Library for regenerate source file with rewrite require-function body

[![Build Status](https://travis-ci.org/arvitaly/node-require-transform.svg?branch=master)](https://travis-ci.org/arvitaly/node-require-transform)

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