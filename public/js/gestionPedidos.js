import { Pedidos } from "./pedidos.js"
import { domElements } from "./domElements.js"
const pedidosInstance = new Pedidos()

$(document).ready(function () {
    pedidosInstance.traerDepartamento()
    pedidosInstance.traerMunicipio($("#departamento_id").val())
    // pedidosInstance.consultaCobertura({usuario:'retabares.ws',clave:'c04dbbaa14d2c5600ff7f2ac6de2d5ae161bf1cb5a7df20ee7050db5bae5a945'})

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
    pedidosInstance.consultaCobertura({usuario:'retabares.ws',clave:'c04dbbaa14d2c5600ff7f2ac6de2d5ae161bf1cb5a7df20ee7050db5bae5a945'})
});