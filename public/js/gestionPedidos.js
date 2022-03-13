import { Pedidos } from "./pedidos.js"
import { domElements } from "./domElements.js"
const pedidosInstance = new Pedidos()

$("#btn-nuevo-pedido").click(function(){
    pedidosInstance.abreModalPedidos()
});

$("#btn-ver-cobertura").click(function(){
    pedidosInstance.consultaCobertura({usuario:'retabares.ws',clave:'c04dbbaa14d2c5600ff7f2ac6de2d5ae161bf1cb5a7df20ee7050db5bae5a945'})
});