export class API {

    async simularEnvio(obj) {
        try {
            console.log("simulando envío")
        } catch (error) {
            console.error(`Error: ${error.message}`)
        }
    }

    async rastrearEnvio(guia) {
        try {
            console.log("rastreando envío")
        } catch (error) {
            console.error(`Error: ${error.message}`)
        }
    }

    async editarEnvio(obj) {
        try {
            console.log("editando envío")
        } catch (error) {
            console.error(`Error: ${error.message}`)
        }
    }

    async novedadEnvio(obj) {
        try {
            console.log("agregar novedad")
        } catch (error) {
            console.error(`Error: ${error.message}`)
        }
    }
}