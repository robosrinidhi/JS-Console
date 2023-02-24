import { curry, tryCatch, ifElse, trim } from "ramda";

const prevConsoles = document.querySelector('.prev-consoles');
const consoleInput = document.querySelector('.console-input');

const enterKeyEvent = (event) =>{
    if(event.key !== 'Enter'){
        return;
    }
    if(event.target.value.length === 0){
        return;
    }
    const inputString = consoleInput.value.trim();
    tryCatch(
        ()=> addConsole(inputString,eval(inputString)),
        (error)=> addConsole(inputString, error)
    )()
    consoleInput.value = '';
}

consoleInput.addEventListener('keyup', enterKeyEvent);

const createElement = (ele) => document.createElement(ele);
const addClass = curry((ele, cls)=> ele.classList.add(cls));
const addText = curry((ele, text)=> (ele.textContent = text));

function addConsole(inputString, output){
    const outputString = "" + output;
    const inputConsoleElement = createElement('div');
    const outputConsoleElement = createElement('div');
    addClass(inputConsoleElement, 'console-input-log');
    addText(inputConsoleElement, `>${inputString}`);

    addClass(outputConsoleElement, 'console-output-log');
    addText(outputConsoleElement, `>${outputString}`);

    prevConsoles.append(inputConsoleElement, outputConsoleElement);
}