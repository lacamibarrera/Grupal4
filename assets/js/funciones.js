// Función que devuelve el nombre del día de la semana de una fecha dada
const nombreDelDiaSegunFecha = fecha => [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
][new Date(fecha).getDay()];

// Fechas para probar la función anterior
const fechasParaProbar = [
    "2014-06-20 18:30:00",
    "2013-08-03 10:00:00",
    "1997-06-21 22:00:00",
];

// Recorre por cada fecha en el arreglo anterior e imprime su nombre de día correspondiente
fechasParaProbar.forEach(fecha => {
    console.log("En " + fecha + " fue " + nombreDelDiaSegunFecha(fecha));
});


// Función que calcula la edad a partir de una fecha de nacimiento ingresada por el usuario en un input de HTML
function calcularEdad(fecha) {
    // Crear un objeto Date a partir del valor de la fecha
    const fechaNacimiento = new Date(fecha);

    let hoy = new Date();
    let cumpleanos = new Date(hoy.getFullYear(), fechaNacimiento.getMonth(), fechaNacimiento.getDate());
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
        mes += 12;
    }

    let dia = hoy.getDate() - fechaNacimiento.getDate();

    if (dia < 0) {
        let ultimoDiaMesAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
        dia = ultimoDiaMesAnterior - fechaNacimiento.getDate() + hoy.getDate();

        if (mes === 0) {
            mes = 11;
            edad--;
        } else {
            mes--;
        }
    }
    //Crea un objeto con los datos obtenidos (Dia/Mes/Año)
    return { años: edad, meses: mes, dias: dia };
}

//Calcula si la fecha ingresada corresponde al cumpleaños
function esCumpleaños(fecha) {
    let cumpleanos = new Date(fecha);
    let hoy = new Date();

    if (cumpleanos.getMonth() === hoy.getMonth() && cumpleanos.getDate() === hoy.getDate()) {
        return true;
    } else {
        return false;
    }
}

//Calcula cuantos dias faltan para siguiente cumpleaños
function diasParaCumpleaños(fecha) {
    let cumpleanos = new Date(fecha);
    let hoy = new Date();
    let proximoCumpleanos = new Date(hoy.getFullYear(), cumpleanos.getMonth(), cumpleanos.getDate());

    if (proximoCumpleanos < hoy) {
        proximoCumpleanos.setFullYear(proximoCumpleanos.getFullYear() + 1);
    }

    let diferencia = proximoCumpleanos.getTime() - hoy.getTime();
    let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    return dias;
}

function mostrarEdad() {
    const fechaCalendario = document.getElementById("fecha-nacimiento").value;

    // Calcular la edad a partir de la fecha seleccionada
    const edad = calcularEdad(fechaCalendario); //Aqui utiliza el objeto con los datos creados en calcularEdad()

    // Obtener el nombre del día de la semana de la fecha seleccionada
    let nombreDia = [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
    ][new Date(fechaCalendario).getDay()];

    // Actualizar el contenido del elemento HTML con el resultado
    let resultado = document.getElementById('resultado')
    resultado.innerHTML = "Tienes " + edad.años + " años, " + edad.meses + " meses y " + edad.dias + " días y naciste un " + nombreDia;

    // Verifica si es el cumpleaños con la funcion esCumpleaños()
    if (esCumpleaños(fechaCalendario)) {
        resultado.innerHTML += " ¡Feliz cumpleaños!";
    } else {
        // Calcula los días que faltan para el próximo cumpleaños
        const diasParaCumple = diasParaCumpleaños(fechaCalendario);
        resultado.innerHTML += " Tu próximo cumpleaños es en " + diasParaCumple + " días.";
    }
}

// Parte B
function obetenerFechas() {
    // Obtener el valor del input de calendario
    const fechaIngreso = document.getElementById("fechaIngreso").value;
    const fechaSalida = document.getElementById("fechaSalida").value;

    

}