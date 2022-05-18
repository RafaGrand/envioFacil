import { Pedidos } from "./pedidos.js"
import { domElements } from "./domElements.js"
const pedidosInstance = new Pedidos()
let obj = {}
if (sessionStorage.cobertura){
    obj = JSON.parse(sessionStorage.cobertura);
}
// console.log(obj)
$(document).ready(function () {
    pedidosInstance.traerDepartamento()
    pedidosInstance.traerMunicipio($("#departamento_id").val())
    pedidosInstance.consultaCobertura({usuario:'retabares.ws',clave:'c04dbbaa14d2c5600ff7f2ac6de2d5ae161bf1cb5a7df20ee7050db5bae5a945'})
});

$("#btn-nuevo-pedido").click(function(){
    pedidosInstance.abreModalPedidos()
});

$("#btn-ver-cobertura").click(function(){
    pedidosInstance.consultaCobertura({usuario:'retabares.ws',clave:'c04dbbaa14d2c5600ff7f2ac6de2d5ae161bf1cb5a7df20ee7050db5bae5a945'})
});

$("#departamento_id").change(function() {
    let departamento_id = $("#departamento_id").val()
    pedidosInstance.traerMunicipio(departamento_id)
});

$("#municipio_id").change(function() {
    console.log($('#municipio_id').val())
    // Revisa que tenque cobertura
    const found = search($('#municipio_id').val(), obj)
    console.log(found)
});
// cambiar includes por === cuando se parametrize la DB
function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].codigo.includes(nameKey)) {
            return myArray[i];
        }
    }
}