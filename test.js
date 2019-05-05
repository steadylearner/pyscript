'use strict';

let pythonBridge = require('python-bridge');

let python = pythonBridge();

let list = [3, 4, 2, 1];

`python.ex`import js2py`;

async function fn() {
    const a = [1, 2, 3, 4, 5];
    let test = await python`js2py.translate_js(${a})`; 
    try {     
       console.log(test);
    } catch(e) { console.log(e) }
    python.end();
}

fn();
