import { Pedidos } from "./pedidos.js"
import { domElements } from "./domElements.js"
const pedidosInstance = new Pedidos()

$("#btn-nuevo-pedido").click(function(){
    pedidosInstance.abreModalPedidos()
    console.log('test')
});