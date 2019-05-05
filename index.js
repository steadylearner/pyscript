'use strict';

let pythonBridge = require('python-bridge');

// https://www.npmjs.com/package/python-bridge
let python = pythonBridge(); // return value
let { 
  ex, // not return value
  lock, // or define python function in ex 
  //
  stdin,
  stdout,
  stderr,
  //
  end,
} = python; // use py instead later

let list = [3, 4, 2, 1];

python.ex`import math`;
python.ex`import pyautogui`;
python.ex`import numpy`;
python.ex`import pandas`;
python.ex`import time as t`;

// python.ex`t.sleep(11111111111111111111111111111111111111)`;

// python.ex`import js2py`;

let testPythonMath = python`math.sqrt(9)`;
let testPythonSort = python`sorted(${list})`;

// (async () => {
//    let math = await python`math.sqrt(9)`;
//    let sort = await python`sorted(${list})`;
//    try {
//      console.log(math);
//      console.log(sort);
//    } catch(e) { console.log(e) }
//    python.end();
// })()

// let value = document.getElementById("input").value;
// console.log(value);

function fromPython(pycode = {}) {
  return JSON.stringify(pycode);
}

function toJavaScript(pystr = "") {
  return JSON.parse(pystr)
}

async function pythonWithJavaScript() {
    let math = await python`math.sqrt(9)`;
    let sort = await python`sorted(${list})`;
    
    // use ex instead and function if possible
    // let testlock = await lock(python => {
    //  python.ex`hello = 123`;
    //  return python`hello + 321`;
    // });
    // console.log(testlock);
    
    python.ex`
      returnit = pandas.Series(numpy.random.randint(0, 7, size = 10)).tolist()
      
      # print("comment it")
    `;
    let test = await python`returnit`; // return value with await and python
    console.log(test);
    
    let returned = fromPython(await python`(numpy.arange(1000).reshape(50, 20).tolist())`);

    // let returned = JSON.stringify(await python`(numpy.arange(1000).reshape(50, 20).tolist())`);
    // let returned = await python`(str(numpy.arange(1000).reshape(50, 20).tolist())`;
    // let returned = await python`pandas.Series(numpy.arange(10000)).tolist()`;
    console.log(toJavaScript(returned));
    
    python.ex`thisislast = numpy.arange(10)**5`;
    let last = await python`str(thisislast.reshape(2, 5).tolist())`;
    console.log(typeof last);
  
    let position = await python`pyautogui.position()`
    console.log(position);
    ex`pyautogui.screenshot("test.png")`;
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse, remove str wrapper and back original cotnent we want
    console.log(typeof toJavaScript(last));
    console.log("payload", toJavaScript(last));
    try {
      console.log(math);
      console.log(sort);
      const test = (math + sort.reduce((a, c) => a + c, 0))
       // .toString();
       python.ex`print(str(${test}))`;
       // python `pyautogui.moveTo(None, str(${value}))`; 
       python.ex`pyautogui.typewrite(str(${test}))`; 
       // python `pyautogui.typewrite(str("show it to me"))`; 
       // python `pyautogui.typewrite(js2py.translate_js(${test}))`; 
       python.ex`pyautogui.moveTo(${math}, ${test})`; 
    } catch(e) { console.log(e) }
    python.end();
}

pythonWithJavaScript();

// async function fn() {
//    const a = [1, 2, 3, 4, 5];
//    let test = await python`js2py.translate_js(${a})`;
//    try {
//       console.log(test);
//    } catch(e) { console.log(e) }
//    python.end();
// }

// Promise.all([testPythonMath, testPythonSort]).then(res => {
//  let math = res[0];
//  let sort = res[1];
//  console.log(math);
//  console.log(sort);
// }).then(() => python.end());

// python.end();
