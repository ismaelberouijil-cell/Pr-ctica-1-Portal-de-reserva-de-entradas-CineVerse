# Pr-ctica-1-Portal-de-reserva-de-entradas-CineVerse

## Contexto del caso de uso
La cadena de cines CineVerse va a estrenar su nueva plataforma de venta de
entradas y reserva de combos de palomitas online. Para la versión de
lanzamiento, la dirección necesita un sistema web que gestione la identificación
del espectador, calcule los costes de las entradas con descuentos temporales y
permita guardar comentarios sobre las películas de forma persistente y segura.
Como desarrollador Front-End, debes construir el módulo cliente aplicando la
lógica de negocio, validaciones numéricas, lectura del entorno y renderizado seguro.

## Requisitos de negocio y funcionalidades a desarrollar
Bloque 1: Acceso, diagnóstico del entorno y perfil
1. Carga estratégica de scripts: La plataforma requiere un script de métricas
y un script con la lógica de la taquilla. Configura el documento para que el
navegador descargue y ejecute los scripts sin bloquear el dibujado de la
página ni generar fallos por falta del árbol DOM.
2. Identificación de la sesión: Lee los parámetros enviada en la URL (usuario
y rol de socio; si no existen, establece valores por defecto). Registra el
idioma del navegador, el estado de la conexión a internet, genera un
identificador único y criptográficamente seguro para la sesión y obtén la
fecha actual formateada en texto extendido en español.
3. Limpieza del correo: Procesa la cadena del correo electrónico del socio
(eliminando espacios sobrantes en las orillas y pasando todo el texto a
minúsculas). Extrae por separado el nombre de usuario y el dominio, y
asegúrate de que el código numérico de socio siempre se muestre
rellenado con ceros a la izquierda hasta completar 6 dígitos.

