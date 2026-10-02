"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // BLOQUE 1: ENTORNO Y PERFIL
    // =========================

    const outBom = document.getElementById("out-bom");
    const outPreferencias = document.getElementById("out-preferencias");
    const outCorreo = document.getElementById("out-correo");

    const params = new URLSearchParams(window.location.search);

    const usuario = params.get("usuario") || "Invitado";
    const rol = params.get("rol") || "Usuario_Normal";

    const idioma = navigator.language;
    const estadoConexion = navigator.onLine ? "Conectado" : "Desconectado";

    // Identificador único y seguro para la sesión
    const idSesion = crypto.randomUUID();

    // Fecha actual en español y formato extendido
    const fechaActual = new Date().toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    outBom.innerHTML = `
        <p><strong>Idioma:</strong> ${idioma}</p>
        <p><strong>Estado de conexión:</strong> ${estadoConexion}</p>
        <p><strong>Usuario:</strong> ${usuario}</p>
        <p><strong>Rol:</strong> ${rol}</p>
        <p><strong>ID de sesión:</strong> ${idSesion}</p>
        <p><strong>Fecha:</strong> ${fechaActual}</p>
    `;

    // Asignaciones lógicas
    let apodo = "";
    let tipoSuscripcion = null;
    let entradasRegalo = 0;

    apodo ||= "Espectador VIP";
    tipoSuscripcion ??= "Básica";
    entradasRegalo ??= 2;

    outPreferencias.innerHTML = `
        <p><strong>Apodo:</strong> ${apodo}</p>
        <p><strong>Suscripción:</strong> ${tipoSuscripcion}</p>
        <p><strong>Entradas de regalo:</strong> ${entradasRegalo}</p>
    `;


    // =========================
    // LIMPIEZA DEL CORREO
    // =========================

    document.getElementById("guardar-correo").addEventListener("click", function () {

        const entrada = document.getElementById("correo").value;
        const codigoOriginal = document.getElementById("codigo-socio").value;

        const correoLimpio = entrada.trim().toLowerCase();
        const partes = correoLimpio.split("@");

        const nombreUsuario = partes[0] || "";
        const dominio = partes[1] || "";

        // Si no se introduce código, usamos 0 y lo rellenamos hasta 6 dígitos
        const codigoSocio = String(codigoOriginal || 0).padStart(6, "0");

        outCorreo.innerHTML = `
            <p><strong>Correo limpio:</strong> ${correoLimpio}</p>
            <p><strong>Usuario:</strong> ${nombreUsuario}</p>
            <p><strong>Dominio:</strong> ${dominio}</p>
            <p><strong>Código de socio:</strong> ${codigoSocio}</p>
        `;
    });


    // =========================
    // BLOQUE 2: TAQUILLA
    // =========================

    const cartel = document.getElementById("cartel");

    let entradaGeneral = "8.50€";
    let entradaPareja = "12.00€";
    let codigoPromocional = "3";

    entradaGeneral = parseFloat(entradaGeneral);
    entradaPareja = parseFloat(entradaPareja);
    codigoPromocional = parseFloat(codigoPromocional);

    const subtotal = entradaGeneral + entradaPareja;

    if (Number.isNaN(subtotal)) {
        cartel.textContent = "Error: el importe no es válido.";
    } else {

        const descuento = codigoPromocional;
        const totalSinIVA = subtotal - descuento;
        const iva = totalSinIVA * 0.21;
        const total = totalSinIVA + iva;

        // Número de reserva usando pre-incremento
        let reserva = 0;
        const nuevaReserva = ++reserva;

        const euros = new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR"
        });

        cartel.innerHTML = `
            <p><strong>Número de reserva:</strong> ${nuevaReserva}</p>
            <p><strong>Subtotal:</strong> ${euros.format(subtotal)}</p>
            <p><strong>Descuento:</strong> -${euros.format(descuento)}</p>
            <p><strong>IVA (21%):</strong> ${euros.format(iva)}</p>
            <p><strong>Total a pagar:</strong> ${euros.format(total)}</p>
        `;
    }


    // =========================
    // BLOQUE 3: DESCUENTO FLASH
    // =========================

    const botonDescuento = document.getElementById("activar-descuento");
    const contador = document.getElementById("contador");

    let temporizador = null;
    let segundos = 20;

    botonDescuento.addEventListener("click", function () {

        // Si ya hay un temporizador, ignoramos el clic
        if (temporizador !== null) {
            return;
        }

        segundos = 20;
        contador.textContent = "Descuento activo: " + segundos + " segundos";

        temporizador = setInterval(function () {

            segundos--;
            contador.textContent = "Descuento activo: " + segundos + " segundos";

            if (segundos === 0) {
                clearInterval(temporizador);
                temporizador = null;
                contador.textContent = "La promoción ha caducado.";
                alert("La promoción ha caducado.");
            }

        }, 1000);
    });


    // =========================
    // BLOQUE 4: RESEÑAS
    // =========================

    const opinion = document.getElementById("opinion");
    const botonResena = document.getElementById("publicar-resena");
    const cards = document.getElementById("cards");

    let resenas = [];

    // Recuperar reseñas guardadas
    try {
        const datosGuardados = localStorage.getItem("resenasCineVerse");

        if (datosGuardados) {
            resenas = JSON.parse(datosGuardados);
        }
    } catch (error) {
        console.error("No se han podido recuperar las reseñas.", error);
        resenas = [];
    }

    function mostrarResenas() {

        cards.innerHTML = "";

        resenas.forEach(function (resena) {

            const article = document.createElement("article");

            const nombre = document.createElement("h3");
            nombre.textContent = resena.nombre;

            const fecha = document.createElement("p");
            fecha.textContent = "Creada: " + resena.fecha;

            const hora = document.createElement("p");
            hora.textContent = "Hora de envío: " + resena.hora;

            const texto = document.createElement("p");
            texto.textContent = resena.opinion;

            article.appendChild(nombre);
            article.appendChild(fecha);
            article.appendChild(hora);
            article.appendChild(texto);

            cards.appendChild(article);
        });
    }

    botonResena.addEventListener("click", function () {

        const textoOpinion = opinion.value.trim();

        if (textoOpinion === "") {
            alert("Escribe una opinión antes de publicarla.");
            return;
        }

        const ahora = new Date();

        const nuevaResena = {
            fecha: ahora.toISOString(),
            nombre: usuario,
            hora: ahora.toLocaleTimeString("es-ES"),
            opinion: textoOpinion
        };

        resenas.push(nuevaResena);

        try {
            localStorage.setItem("resenasCineVerse", JSON.stringify(resenas));
        } catch (error) {
            console.error("No se ha podido guardar la reseña.", error);
        }

        opinion.value = "";
        mostrarResenas();
    });

    mostrarResenas();
});
