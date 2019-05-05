'use strict';

let python = require('python-bridge');

// https://www.npmjs.com/package/python-bridge
let py = python(); // return value
let {
  ex, // not return value
  // lock, or define python function in ex
  // stdin,
  // stdout,
  // stderr,
  //
  end,
} = py; // use py instead later

let list = [3, 4, 2, 1];

// <Python Modules>

ex`import math`;
ex`import pyautogui`;
ex`import numpy`;
ex`import pandas`;
ex`import time as t`;

// </>

// python.ex`t.sleep(11111111111111111111111111111111111111)`;

let testPythonMath = py`math.sqrt(9)`;
let testPythonSort = py`sorted(${list})`;

function fromPython(pycode = {}) {
  return JSON.stringify(pycode);
}

function toJavaScript(pystr = "") {
  return JSON.parse(pystr)
}

// let returned = JSON.stringify(await python`(numpy.arange(1000).reshape(50, 20).tolist())`);
// let returned = await python`(str(numpy.arange(1000).reshape(50, 20).tolist())`;
// let returned = await python`pandas.Series(numpy.arange(10000)).tolist()`;

async function pythonWithJavaScript() {
  try {
    let math = await py`math.sqrt(9)`;
    let sort = await py`sorted(${list})`;

    ex`
      returnit = pandas.Series(numpy.random.randint(0, 7, size = 10)).tolist()
      # print("comment it")
    `;

    let test = await py`returnit`; // return value with await and python
    console.log(test);

    let returned = fromPython(await py`(numpy.arange(1000).reshape(50, 20).tolist())`);
    console.log(toJavaScript(returned));

    ex`thisislast = numpy.arange(10)**5`;
    let last = await py`str(thisislast.reshape(2, 5).tolist())`;
    console.log(typeof last);

    let position = await py`pyautogui.position()`
    console.log(position);

    ex`pyautogui.screenshot("test.png")`;

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse, remove str wrapper and back original cotnent we want
    console.log(typeof toJavaScript(last));
    console.log("payload", toJavaScript(last));
    console.log(math);
    console.log(sort);

    const test = (math + sort.reduce((a, c) => a + c, 0))
    // .toString();
    ex`print(str(${test}))`;
    ex`pyautogui.typewrite(str(${test}))`;
    ex`pyautogui.moveTo(${math}, ${test})`;
    // python `pyautogui.typewrite(str("show it to me"))`;
    // python `pyautogui.moveTo(None, str(${value}))`;
  } catch (e) { console.log(e) }
  end();
}

pythonWithJavaScript();

// Promise.all([testPythonMath, testPythonSort]).then(res => {
//  let math = res[0];
//  let sort = res[1];
//  console.log(math);
//  console.log(sort);
// }).then(() => python.end());

// python.end();

// async function fn() {
//    try {
//
//    } catch(e) { console.log(e) }
//    python.end();
// }

// (async () => {
//    let math = await python`math.sqrt(9)`;
//    let sort = await python`sorted(${list})`;
//    try {
//      console.log(math);
//      console.log(sort);
//    } catch(e) { console.log(e) }
//    python.end();
// })()