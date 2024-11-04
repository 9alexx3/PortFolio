// document.getElementById('menu_calculator').addEventListener("click", (e) => {
//     menu_windows.style.display = "block"
//     menu_windows.style.transform = "none"
// })

// const calculator = document.getElementById('calculator');
// const menu_calculator = document.getElementById('menu_calculator');

// menu_calculator.addEventListener("click", () => {
//     calculator.style.visibility = "visible"
//     calculator.style.transform = "none"
// })
    



let cont = 0;
const buttons = document.querySelectorAll('.calculator-button');

buttons.forEach(button => {
    const value = button.dataset.operation || button.textContent;

    button.addEventListener('click', () => {

        if (!isNaN(value)) {
            updateDisplay(value);
        } else {
            switch(value) {
                case "delete":
                    deleteCharacter();
                    break;
                case "CE":
                    clearEntry();
                    break;
                case "C":
                    clear();
                    break;
                case "+/-":
                    negative(value)
                    break;
                case ".":
                    updateDisplay(value)
                    break;

                case "power":
                    power();
                    break;

                case "sqrt":
                    sqrt();
                    break;

                case "reciprocal":
                    reciprocal();
                    break;

                default:
                    updateDisplay2(value);
                    break;
            }
        }
    });
});

const display = document.getElementsByClassName("display")[0];
const display2 = document.getElementsByClassName("display2")[0];

const percentage = (n1, percent) => {

    const number = n1.split('%', 1)[0];
    const result = (number * percent) / 100;

    display.value = result;
    display2.value = `${percent}% of ${number} =`;

};

const reciprocal = () => {

    if(!Math){
        alert('Your browser not supported reciprocal');
        return;
    };

    const value = Math.pow(display.value, -1);
    display2.value = `1/(${display.value})`;
    display.value = value;
};

const power = () => {

    if(!Math){
        alert('Your browser not supported powers');
        return;
    };

    const value = Math.pow(display.value, 2);
    display2.value = `sqr(${display.value})`;
    display.value = value;
};

const sqrt = () => {

    if(!Math){
        alert('Your browser not supported sqrt');
        return;
    };

    const value = Math.sqrt(display.value);
    display2.value = `√(${display.value})`;
    display.value = value;
};

const negative = (n) => {
    if(!n) return;

    const number = display.value * -1;
    display.value = number;
    display2.value = `negate(${display.value})`;
};

const updateDisplay2 = (n) => {
    
    if(!display2.value){
        display2.value = `${display.value}${n}`;
    }else{
        if(display2.value.includes('=')){
            display2.value = display.value + n;
        }else{
            const operation = display2.value.split('=')[0];
            if(operation.includes('%')) percentage(operation, display.value);
            else Operation(operation, display.value);
        }
    }
};

const updateDisplay = (n) => {

    if(n === "."){
        (display.value.includes('.')) ? false : display.value += n;
        return;
    } 

    if(!display2.value) (display.value == 0) ? display.value = n : display.value += n;
    else{
        if(cont === 0 ){
            display.value = n;
            cont++;
        }else{
            display.value = display.value + n;
        }
    }
};

const Operation = (prevOperand, currentOperand) => {
    const expression = prevOperand + currentOperand;
    const result = Function(`return ${expression}`)();
    display2.value = `${expression}=`;
    display.value = result;
    cont = 0;
};

const clearEntry = () => {
    const display = document.querySelector('.display');
    display.value = 0;
};

const clear = () => {
    const display = document.querySelector('.display');
    const display2 = document.querySelector('.display2');
    display.value = 0;
    display2.value = null;
};

const deleteCharacter = () => {
    const display = document.querySelector('.display');
    (display.value.length != 1) ? display.value = display.value.slice(0, -1) : clearEntry();
};

document.getElementById("calculator-copy").addEventListener('click', () => {
    navigator.clipboard.writeText(display.value)
    .then((e) => alert('Result copied!'))
    .catch((e) => alert('ERROR ON COPY!'))
});