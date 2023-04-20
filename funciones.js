// Función que devuelve el nombre del día de la semana de una fecha dada
const nombreDelDiaSegunFecha = fecha => [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',]
[new Date(fecha).getDay()];

// Fechas para probar la función anterior
const fechasParaProbar = [
    "2013-01-18 17:00:00",
    "2013-08-03 10:00:00",
    "1997-06-21 22:00:00",];

// Itera por cada fecha en el arreglo anterior e imprime su nombre de día correspondiente
fechasParaProbar.forEach(fecha => {
    console.log("En " + fecha + "fue " + nombreDelDiaSegunFecha(fecha));
});

// Función que calcula la edad a partir de una fecha de nacimiento ingresada por el usuario en un input de HTML
function calcularEdad() {
    let fecha = document.getElementById("user_date").value;
    if (validate_fecha(fecha) == true) { // Valida que la fecha sea correcta

        // Si la fecha es correcta, se calcula la edad
        let values = fecha.split("-");
        let dia = values[2];
        let mes = values[1];
        let ano = values[0];

        // Se obtienen los valores actuales
        let fecha_hoy = new Date();
        let ahora_ano = fecha_hoy.getYear();
        let ahora_mes = fecha_hoy.getMonth() + 1;
        let ahora_dia = fecha_hoy.getDate();

        // Se realiza el cálculo de la edad
        let edad = (ahora_ano + 1900) - ano;
        if (ahora_mes < mes) {
            edad--;
        }
        if ((mes == ahora_mes) && (ahora_dia < dia)) {
            edad--;
        }
        if (edad > 1900) {
            edad -= 1900;
        }

        // Se calculan los meses
        let meses = 0;
        if (ahora_mes > mes)
            meses = ahora_mes - mes;
        if (ahora_mes < mes)
            meses = 12 - (mes - ahora_mes);
        if (ahora_mes == mes && dia > ahora_dia)
            meses = 11;

        // Se calculan los días
        let dias = 0;
        if (ahora_dia > dia) dias = ahora_dia - dia;
        if (ahora_dia < dia) {
            ultimoDiaMes = newDate(ahora_ano, ahora_mes, 0);
            dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
        }
        document.getElementById("result").innerHTML = "Tienes " + edad + " años, " + meses + " meses y" + dias + " días";
    }
    else {
        // Si la fecha es incorrecta, se muestra un mensaje de error
        document.getElementById("result").innerHTML = "La fecha " + fecha + " es incorrecta";
    }
};

// Función que obtiene información de la edad a partir de una fecha de nacimiento dada
function obtenerInformacionDeEdad(fechaNacimiento) {
    const diasDeLaSemana = [ 
        'domingo', 
        'lunes', 
        'martes', 
        'miércoles', 
        'jueves', 
        'viernes', 
        'sábado'];
    
    // Crea un objeto de fecha a partir de la fecha de nacimiento dada
    const fecha = new Date(fechaNacimiento);

    // Obtiene el nombre del día de la semana correspondiente a la fecha de nacimiento
    const diaDeLaSemana = diasDeLaSemana[fecha.getDay()];   
    
    // Crea un objeto de fecha actual
    const fechaActual = new Date();

    // Calcula la edad en años restando el año de la fecha de nacimiento del año actual
    const edadEnAnos = fechaActual.getFullYear() - fecha.getFullYear();

    // Calcula la edad en meses restando el mes de la fecha de nacimiento del mes actual, y ajustando por si el mes actual es menor al mes de nacimiento
    const edadEnMeses = (fechaActual.getMonth() + 12 - fecha.getMonth()) % 12;

    // Calcula la edad en días restando el día de la fecha de nacimiento del día actual
    const edadEnDias = fechaActual.getDate() - fecha.getDate();
    
    // Calcula la cantidad de meses absolutos (sin ajuste por años)
    const mesesAbsolutos = edadEnAnos * 12 + edadEnMeses;
    
    // Calcula la fecha del próximo cumpleaños
    const siguienteCumpleanos = new Date(fechaActual.getFullYear() + (fechaActual.getMonth() > fecha.getMonth() || (fechaActual.getMonth() === fecha.getMonth() && fechaActual.getDate() >= fecha.getDate())), fecha.getMonth(), fecha.getDate());
    
    // Calcula el tiempo restante (en días) para el próximo cumpleaños
    const tiempoParaCumpleanos = Math.floor((siguienteCumpleanos - fechaActual) / (1000 * 60 * 60 * 24));
    
    // Obtiene la hora actual en formato legible
    const horaActual = fechaActual.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
    
    // Crea un mensaje con la información de edad y días de vida
    let mensaje = "El día que nació fue: " + diaDeLaSemana + ". Su edad es: " + edadEnAnos + " años, " + edadEnMeses + " meses y " + edadEnDias + " días. La cantidad de meses que tiene son: " + mesesAbsolutos + " meses. La cantidad de días que tiene son: " + Math.floor((fechaActual - fecha) / (1000 * 60 * 60 * 24)) + " días";
    //Si es el dia de su cumpleaños le arroja el mensaje:
      if (tiempoParaCumpleanos === 0) {
        return "¡Felicidades, está de cumpleaños! La hora en que ha realizado su consulta es: " + horaActual;
      } else { //Si no es su cumpleaños le da el tiempo que falta par ael siguiente y la hora de consulta
        return "Para su próximo cumpleaños faltan: " + tiempoParaCumpleanos + " días. La hora en que ha realizado su consulta es: " + horaActual;
      }
    }