document.addEventListener("DOMContentLoaded", function() {



let Entrada = document.getElementById("correoSocio");
const correoSocioLimpio = Entrada.trim().toLowerCase();

const partes = correoSocioLimpio.split("@");
const nombreUsuario = partes[0];
const dominio = partes[1];


});