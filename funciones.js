//fecha de naciemito del usuario
let fechausuario = document.getElementById("fechanacimiento");
console.log(fechaNacimiento)


const nombreDelDiaSegunFecha = fecha => [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
]
    [new Date(fecha).getDay()];
    
const fechasParaProbar = [
    "2013-01-18 17:00:00",
    "2013-08-03 10:00:00",
    "1997-06-21 22:00:00",
];
    fechasParaProbar.forEach(fecha => {
    console.log(`En ${fecha} fue ${nombreDelDiaSegunFecha(fecha)}`);
    });


function calcularEdad() {
    var fecha=document.getElementById("user_date").value;
    if(validate_fecha(fecha)==true)
{

// Si la fecha es correcta, calculamos la edad
var values=fecha.split("-");
var dia = values[2];
var mes = values[1];
var ano = values[0];

// cogemos los valores actuales
var fecha_hoy = new Date();
var ahora_ano = fecha_hoy.getYear();
var ahora_mes = fecha_hoy.getMonth()+1;
var ahora_dia = fecha_hoy.getDate();

// realizamos el calculo
var edad = (ahora_ano + 1900) - ano;
if ( ahora_mes < mes ){
    edad--;
}
if ((mes == ahora_mes) && (ahora_dia < dia)){
    edad--;
}
if (edad > 1900){
    edad -= 1900;
}
// calculamos los meses

var meses=0;
if(ahora_mes>mes)
    meses=ahora_mes-mes;
if(ahora_mes<mes)
    meses=12-(mes-ahora_mes);
if(ahora_mes==mes && dia>ahora_dia)
    meses=11;

// calculamos los dias
var dias=0;
if(ahora_dia>dia) dias=ahora_dia-dia;
    if(ahora_dia<dia){
        ultimoDiaMes=new Date(ahora_ano, ahora_mes, 0);
    dias=ultimoDiaMes.getDate()-(dia-ahora_dia);
}
document.getElementById("result").innerHTML="Tienes "+edad+" años, "+meses+" meses y"+dias+" días";
} 
    else {
    document.getElementById("result").innerHTML="La fecha "+fecha+" es incorrecta";
}
}
