// Función que calcula la edad a partir de una fecha de nacimiento ingresada por el usuario en un input de HTML
function calcularEdad(fecha) {
    // Crear un objeto Date a partir del valor de la fecha
    const fechaNacimiento = new Date(fecha + "T00:00:00Z"); // agregar 'T00:00:00Z' y usar UTC

    const hoy = new Date();

    let edad = hoy.getUTCFullYear() - fechaNacimiento.getUTCFullYear(); // usar getUTCFullYear()
    let mes = hoy.getUTCMonth() - fechaNacimiento.getUTCMonth(); // usar getUTCMonth()
    let dia = hoy.getUTCDate() - fechaNacimiento.getUTCDate(); // usar getUTCDate()

    if (mes < 0 || (mes === 0 && dia < 0)) {
        edad--;
    }

    if (mes < 0) {
        mes += 12;
    }
 
    if (dia < 0) {
        let ultimoDiaMesAnterior = new Date(hoy.getUTCFullYear(), hoy.getUTCMonth(), 0).getUTCDate(); // usar UTC
        dia = ultimoDiaMesAnterior - fechaNacimiento.getUTCDate() + hoy.getUTCDate();

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

//Calcula cuantos dias faltan para siguiente cumpleaños
function esCumpleaños(fecha) {
    let cumpleanos = new Date(fecha);
    let hoy = new Date();

    if (cumpleanos.getDate() === hoy.getDate() && cumpleanos.getMonth() === hoy.getMonth()) {
        return true;
    } else {
        // Compara la fecha de cumpleaños sin tener en cuenta el año
        let fechaSinAnioCumple = new Date(0, cumpleanos.getMonth(), cumpleanos.getDate());
        let fechaSinAnioHoy = new Date(0, hoy.getMonth(), hoy.getDate());
        return fechaSinAnioCumple.getTime() === fechaSinAnioHoy.getTime();
    }
}

function diasParaCumpleaños(fecha) {
    let cumpleanos = new Date(fecha + "T00:00:00Z"); // agregar 'T00:00:00Z' y usar UTC
    let hoy = new Date();
    let proximoCumple = new Date(hoy.getUTCFullYear(), cumpleanos.getUTCMonth(), cumpleanos.getUTCDate()); // usar UTC

    if (proximoCumple < hoy) {
        proximoCumple.setUTCFullYear(proximoCumple.getUTCFullYear() + 1); // usar UTC
    }

    const unDia = 1000 * 60 * 60 * 24;
    const diasFaltantes = Math.floor((proximoCumple - hoy) / unDia);
    return diasFaltantes;
}

function mostrarEdad() {
    const fechaCalendario = document.getElementById("fecha-nacimiento").value;

    // Calcular la edad a partir de la fecha seleccionada
    const edad = calcularEdad(fechaCalendario); //Aqui utiliza el objeto con los datos creados en calcularEdad()

    // Obtener el nombre del día de la semana de la fecha seleccionada
    let nombreDiaNacimiento = [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
    ][(new Date(fechaCalendario).getDay() +1) % 7];

    // Actualizar el contenido del elemento HTML con el resultado
    let resultado = document.getElementById('resultado')
    resultado.innerHTML = "Tienes " + edad.años + " años, " + edad.meses + " meses y " + edad.dias + " días y naciste un " + nombreDiaNacimiento;

    // Verifica si es el cumpleaños con la funcion esCumpleaños()
    if (esCumpleaños(fechaCalendario) === true) {
        resultado.innerHTML += " ¡Feliz cumpleaños!";
    } else {
        // Calcula los días que faltan para el próximo cumpleaños
        const diasParaCumple = diasParaCumpleaños(fechaCalendario);
        resultado.innerHTML += ". Tu próximo cumpleaños es en " + diasParaCumple + " días.";
    }
}


// Parte B

function obtenerFechas() {
    // Obtiene la fecha de ingreso ingresada por el usuario
    let fechaIngreso = document.getElementById("fechaIngreso").value;
    // Muestra el tiempo transcurrido desde la fecha de ingreso hasta la fecha actual en años, meses y días
    mostrarTiempoEnOrganizacion(fechaIngreso);
  }
   
function calcularTiempo(fechaInicial, fechaFinal) {
    // Obtiene la diferencia en milisegundos entre las fechas
    let diferencia = new Date(fechaFinal) - new Date(fechaInicial);
    // Calcula los años utilizando la cantidad de milisegundos por año
    let anios = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365));
    // Resta los años para calcular los meses
    diferencia -= anios * (1000 * 60 * 60 * 24 * 365);
    // Calcula los meses utilizando la cantidad de milisegundos por mes (en promedio)
    let meses = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 30.44));
    // Resta los meses para calcular los días
    diferencia -= meses * (1000 * 60 * 60 * 24 * 30.44);
    // Calcula los días utilizando la cantidad de milisegundos por día
    let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  
    // Devuelve un objeto con los años, meses y días calculados
    return {anios, meses, dias};
  }
  
  function mostrarTiempoEnOrganizacion(fechaIngreso) {
    // Obtiene la fecha actual
    let fechaActual = new Date();
    // Calcula el tiempo transcurrido desde la fecha de ingreso hasta la fecha actual
    let tiempo = calcularTiempo(fechaIngreso, fechaActual);
    // Crea un mensaje con el tiempo transcurrido en años, meses y días
    let mensaje = "Lleva " + tiempo.anios + " años, " + tiempo.meses + " meses y " + tiempo.dias + " días en nuestra organización.";
    // Muestra el mensaje en HTML 
    document.getElementById("tiempoOrganizacion").innerHTML = mensaje;
  }
