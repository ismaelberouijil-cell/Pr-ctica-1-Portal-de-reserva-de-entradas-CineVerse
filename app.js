document.addEventListener('DOMContentLoaded', () => {
  const outBom = document.getElementById('out-bom');



// 2 identificacion de session
const idioma = navigator.language;
const estadoConexion = navigator.onLine ? 'Conectado' : 'Desconectado';

const params = new URLSearchParams(window.location.search);
const usuario = params.get('usuario') || 'Invitado';
const rol = params.get('rol') || 'Usuario_Normal';

console.log("Idioma:", idioma);
console.log("Estado de Conexión:", estadoConexion);
console.log("Usuario:", usuario);
console.log("Parametros:", rol);
console.log("Rol:", rol);
outBom.innerHTML = 
`<p><strong>Idioma:</strong> ${idioma}</p>
<p><strong>Estado de Conexión:</strong> ${estadoConexion}</p>
<p><strong>Usuario:</strong> ${usuario}</p>
<p><strong>Rol:</strong> ${rol}</p>`;
});
function guardarCorreo() {

// 3 limpieza de correo electrónico
let Entrada = document.getElementById("Correos").value;

localStorage.setItem("textoGuardado", Entrada);

alert("Correo electrónico guardado ");


let idPedido;
const correoSocioLimpio = Entrada.trim().toLowerCase();
console.log("Correo electrónico limpio:", correoSocioLimpio);
const partes = correoSocioLimpio.split("@");
const nombreUsuario = partes[0];
console.log("Nombre de usuario:", nombreUsuario);
const dominio = partes[1];
console.log("Dominio:", dominio);

const codigoPedido = String(idPedido).padStart(6, '0');

const Entrada_General = 8.50;
const Entrada_VIP = 20;
const Entrada_Pareja = 12;
const Entrada_Senior = 5;
}


