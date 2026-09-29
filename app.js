document.addEventListener("DOMContentLoaded", function() {



// 2 identificacion de session
const idioma = navigator.language;
const estadoConexion = navigator.onLine ? 'Conectado' : 'Desconectado';

const params = new URLSearchParams(window.location.search);
const usuario = params.get('usuario') || 'Invitado';
const rol = params.get('rol') || 'Usuario_Normal';
outBom.innerHTML = 
`<p><strong>Idioma:</strong> ${idioma}</p>
<p><strong>Estado de Conexión:</strong> ${estadoConexion}</p>
<p><strong>Usuario:</strong> ${usuario}</p>
<p><strong>Rol:</strong> ${rol}</p>`;


// 3 limpieza de correo electrónico
let Entrada = document.getElementById("correoSocio");
let idPedido;
const correoSocioLimpio = Entrada.trim().toLowerCase();

const partes = correoSocioLimpio.split("@");
const nombreUsuario = partes[0];
const dominio = partes[1];

const codigoPedido = String(idPedido).padStart(6, '0');




});