const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novonumero = true;
let operador;
let numeroanterior;

const operacaopendente = () => operador !== undefined;

const calcular = () => {
    if (operacaopendente())
    {
        const numeroatual = parseFloat(display.textContent.replace(',','.'));
        novonumero = true;
         const resultado = eval (`${numeroanterior}${operador}${numeroatual}`);
         atualizardisplay(resultado) 

        // if (operador == '+')
        // {
        //     atualizardisplay(numeroanterior + numeroatual);
        // }
        // if (operador == '-')
        // {
        //     atualizardisplay(numeroanterior - numeroatual);
        // }
        // if (operador == '*')
        // {
        //     atualizardisplay(numeroanterior * numeroatual);
        // }
        // if (operador == '/')
        // {
        //     atualizardisplay(numeroanterior / numeroatual);
        // } // poderia ser utilizado dessa forma, mas com o eval, esta função do codigo
        // é feita mais facilmente.
    }
}

const atualizardisplay = (texto) =>{
    if (novonumero)
    {
        display.textContent = texto.toLocaleString('BR');
        novonumero = false;
    }
    else
    {
        display.textContent += texto.toLocaleString('BR');
    }
}

const inserirnumero = (evento) => atualizardisplay(evento.target.textContent);

numeros.forEach ((numero) => numero.addEventListener('click', inserirnumero));

const selecionaroperador = (evento) => {
    if (!novonumero)
    {
        calcular();
        novonumero = true
        operador = evento.target.textContent;
        numeroanterior = parseFloat(display.textContent.replace(',','.'));
        console.log(operador)
    }
};
operadores.forEach (operador => operador.addEventListener ('click', selecionaroperador));

const ativarigual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', ativarigual);

const limpardisplay = () => display.textContent = ''
document.getElementById('limpardisplay').addEventListener('click', limpardisplay);

const limparcalculo = () => {
    limpardisplay();
    operador = undefined;
    novonumero = true;
    numeroanterior = undefined
}
document.getElementById('limparcalculo').addEventListener('click', limparcalculo);

const removerultimonumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerultimonumero);

const invertersinal = () => {
    novonumero = true;
    atualizardisplay (display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', invertersinal);

const existedecimal = () => display.textContent.indexOf(',') !== -1;
const existevalor = () => display.textContent.length > 0;
const inserirdecimal = () => {
    if (!existedecimal())
    {
        if(existevalor())
        {
            atualizardisplay(',')
        }
        else
        {
            atualizardisplay('0,')
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirdecimal);

const mapateclado = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2',
    '3' : 'tecla3',
    '4' : 'tecla4',
    '5' : 'tecla5',
    '6' : 'tecla6',
    '7' : 'tecla7',
    '8' : 'tecla8',
    '9' : 'tecla9',
    '/': 'operadordivisao',
    '*': 'operadormultiplicacao',
    '-': 'operadorsubtracao',
    '+': 'operadorsoma',
    '=': 'igual',
    'Enter' : 'igual',
    'Backspace' : 'backspace',
    'c' : 'limpardisplay',
    'Escape' : 'limparcalculo',
    ',' : 'decimal',
    'Tab' : 'inverter'
}

const mapearteclado = (evento) => {
    const tecla = evento.key 
    const teclapermitida = () => Object.keys(mapateclado).indexOf(tecla) !== -1;
    if (teclapermitida())  document.getElementById(mapateclado[tecla]).click();
};
document.addEventListener('keydown', mapearteclado);