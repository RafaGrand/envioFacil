export class API {
    async buscaCobertura(obj) {
        // try {
            //console.log(obj)
            let {usuario, clave} = obj

            NProgress.start()
            
            $.ajax({
                type: "POST",
                url:  get_base_url()+'/pedidos/verCoberturas',
                data: obj,
                success: function(response)                                                            
                {   
                    NProgress.done();

                    try{
                        var dataResponse = jQuery.parseJSON(response);
                    }catch(e){
                        var dataResponse = new Object();
                        dataResponse.status = false;
                        dataResponse.message = 'Se presento un error al intentar crear el elemento';
                    }

                    if(!dataResponse.status){
                        alerta(dataResponse.message);
                        return;
                    }

                    Swal.fire({
                        icon: 'success',
                        html: dataResponse.message,
                        backdrop: 'swal2-backdrop-show',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        position: 'center',
                        showConfirmButton: true,
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: '<span style="font-size:16px"><strong>Aceptar</strong></span>',
                        width: 400
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = get_base_url()+'pedidos';
                        }
                    });
                } ,
                error: function(){
                    NProgress.done();
                    alerta('Se presento un error al intentar crear el elemento');
                    return;
                }                                       
              });

        // } catch (error) {
        //     console.error(`Error: ${error.message}`)
        // }
    }

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