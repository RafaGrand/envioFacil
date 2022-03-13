import { API } from "./api.js"
export class Pedidos {
    constructor() {
        this.api = new API()
    }

    abreModalPedidos() {
        console.log('Modal pedidos')
    }
    
    rastrearPedidos() {
        console.log('Rastreando pedidos')
    }
    
    editarPedidos() {
        console.log('Editando pedidos')
    }
    
    novedadPedidos() {
        console.log('Novedades')
    }
    
    generarRotulo() {
        console.log('Generar rótulo')
    }
    
    generarRecibo() {
        console.log('Generar recibo')
    }

    async consultaCobertura(obj) {
        try {
            await this.api.buscaCobertura(obj)
        }
        catch (error) {
            console.error(`Error: ${error.message}`)
        }
    }
    
}