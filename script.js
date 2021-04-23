"use strict";

//aqui eu pego os valores digitados pelo usuário
const display = document.getElementById("display");
const numeros = document.querySelectorAll("[id*=tecla]");
const operadores = document.querySelectorAll("[id*=operador]");

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador != undefined;

const calcular = () => {
  if (operacaoPendente()) {
    const numeroAtual = parseFloat(display.textContent.replace(',','.'));
    novoNumero = true;
    //aqui eu faço a soma dos numeros com Template String ``, e mando para o Display
    const resultado = eval ( `${numeroAnterior}${operador}${numeroAtual}` );
    atualizarDisplay(resultado);

    /*if (operador == "+") {
      atualizarDisplay(numeroAnterior + numeroAtual);
    } else if (operador == "-") {
      atualizarDisplay(numeroAnterior - numeroAtual);
    } else if (operador == "*") {
      atualizarDisplay(numeroAnterior * numeroAtual);
    } else if (operador == "/") {
      atualizarDisplay(numeroAnterior / numeroAtual);
    }*/
  }
};

//função para atualizar o display quando o usuário inserir um novo número 
const atualizarDisplay = (texto) => {
  if (novoNumero) {
    display.textContent = texto.toLocaleString('BR');
    novoNumero = false;
  } else {
    display.textContent += texto.toLocaleString('BR');
  }
};

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

numeros.forEach((numero) => numero.addEventListener("click", inserirNumero));

//função para selecionar e armezenar o operador da conta
const selecionarOperador = (evento) => {
  if (!novoNumero) {
    calcular();
    novoNumero = true;
    operador = evento.target.textContent;
    numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    console.log(operador);
  }
};

operadores.forEach((operador) => operador.addEventListener("click", selecionarOperador)
);

//configurando o botão igual
const ativarIgual = () => {
    calcular();
    operador = undefined;
}

document.getElementById('igual').addEventListener('click', ativarIgual);

//configurando o botão CE (limpa o que está no display)
const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

//configurando o botão C (limpa a operação por inteiro)
const limparCalculo = () => {
  limparDisplay();
  operador = undefined;
  novoNumero = undefined;
  numeroAnterior = undefined;
}

//adicionando a função limpar calculo ao botão com id limparCalculo
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

//configurando o botão « (backspace) ele remove o ultimo número
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);

//adicionando a função lremoverUltimoNumero ao botão com id backspace
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

//configurando o botão de inverter sinal (±)
const inverterSinal = () => {
  novoNumero = true;
  atualizarDisplay(display.textContent * -1);
}

//adicionando a função inverterSinal ao botão com id inverter
document.getElementById('inverter').addEventListener('click', inverterSinal);

         //para procurar se tem a string virgula no display
const existeDecimal = () => display.textContent.indexOf(',') != -1;

//verifico se existe valor no display pra poder colocar a vírgula
const existeValor = () => display.textContent.length > 0;

//aqui faço as validações para inserir uma virgula caso o valor somado seja decimal
const inserirDecimal = () => {
  if(!existeDecimal()){
    if(existeValor()){
      atualizarDisplay(',');
    }
    else{
      atualizarDisplay('0,');
    }
  }
}

//adicionando a função inserirDecimal ao botão com id decimal
document.getElementById('decimal').addEventListener('click', inserirDecimal);

//"cadastrando" as teclas que o usuário pode digitar
const mapaTeclado = {
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
  'C' : 'limparCalculo',
  '/' : 'operadorDividir',
  '*' : 'operadorMultiplicar',
  '-' : 'operadorSubtrair',
  '+' : 'operadorSomar',
  ',' : 'decimal',
  '=' : 'igual',
  'Enter' : 'igual',
  'Backspace' : 'backspace',
  'Escape' : 'limparCalculo'
}

//função para o usuário fazer a operação pelas teclas do teclado
const mapearTeclado = (evento) => {
  const tecla = evento.key;

  //validação para ver se o usuário digitou as teclas da calculadora
  const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;
  if(teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
}

//aqui capturo as teclas que o usuário digita
document.addEventListener('keydown', mapearTeclado);