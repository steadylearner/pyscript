'use strict';

const python = require('python-bridge');
// www.npmjs.com/package/numjs
const nj = require('numjs');

// https://www.npmjs.com/package/python-bridge
const py = python(); // return value
const {
  ex, // no return value
  end,
} = py; // use py instead later

const list = [3, 4, 2, 1];

// <Python Modules>

ex`import math`;
ex`import pyautogui`;
ex`import numpy as np`;
ex`import pandas`;
ex`import time`;
// ex`from numba import jit, njit`; I couldn't find how to use it here

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
    let math = await py`math.sqrt(9)`;
    let sort = await py`sorted(${list})`;

    ex`
      value = np.random.randint(0, 7, size = 10)
      returnit = pandas.Series(value).tolist()
    `;

    let returnExample = await py`returnit`; // return value with await and python
    console.log(returnExample);
 
    // If you want, use other framework such as https://www.npmjs.com/package/benchmark
    // python function first, python is fast;
    const start = new Date().getMilliseconds();
    let returned = fromPy(await py`np.arange(1000).reshape(50, 20).tolist()`);
    console.log(new Date().getMilliseconds() - start);
    let compare = nj.arange(1000).reshape(50, 20).tolist();
    console.log(new Date().getMilliseconds() - start);

    // console.log(compare)
    // console.log(returned);

    // console.log(returned == compare); // false
    // console.log(returned === compare); // false

    // python function later, python is fast;
    // const start = new Date().getMilliseconds();
    // let compare = nj.arange(1000).reshape(50, 20).tolist();
    // console.log(new Date().getMilliseconds() - start);
    // let returned = fromPy(await py`(np.arange(1000).reshape(50, 20).tolist())`);
    // console.log(new Date().getMilliseconds() - start);

    ex`thisislast = np.arange(10)**5`;
    let last = fromPy(await py`thisislast.reshape(2, 5).tolist()`);
    console.log(typeof last); // object

    let position = await py`pyautogui.position()`
    console.log(position); // object

    // ex`pyautogui.screenshot("test.png")`;

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse, remove str wrapper and back original cotnent we want
    console.log(typeof last);
    console.log("payload", last);
    console.log(math);
    console.log(sort);

    const test = (math + sort.reduce((a, c) => a + c, 0))
    // .toString(); or str()
    ex`print(str(${test}))`;
    ex`pyautogui.moveTo(${math}, ${test})`;
    // py`pyautogui.moveTo(${test}, ${math})`;
    ex`pyautogui.typewrite(str(${test}))`;
    // py`pyautogui.typewrite(str("show it to me"))`;
  } catch (e) { console.log(e) }
  end();
}

pyscript();
