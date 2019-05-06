'use strict';

const python = require('python-bridge'); // https://www.npmjs.com/package/python-bridge
const nj = require('numjs'); // www.npmjs.com/package/numjs

const py = python(); // return value
let {
  ex, // no return value
  end,
} = py;

// <Python Modules>

ex`import numpy as np`;
ex`import pandas`;

// </>

function fromPython(pycode = {}) {
  return JSON.stringify(pycode);
}

function toJavaScript(pystr = "") {
  return JSON.parse(pystr)
}

function fromPy(pycode = {}) {
  return toJavaScript(fromPython(pycode));
}

async function pyscript() {
  try {
    // If you want, use other framework such as https://www.npmjs.com/package/benchmark

    // console.log(new Date());
    // let testnumpy = fromPy(await py`np.arange(1000).reshape(50, 20).tolist()`);
    // console.log(new Date()); // 1.8 ~ 2 seconds

    console.log(new Date());
    let testnumjs = nj.arange(1000).reshape(50, 20).tolist();
    console.log(new Date()); // About 0.05 seconds
  } catch (e) { console.log(e) } 
  end();
}

pyscript();
