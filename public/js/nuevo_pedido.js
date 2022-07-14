function feedTrackingModal(response) {
    let detalleEstados = response[0].detalle_estados
    let detalleNovedades = response[0].detalle_novedades
    let containerNovedades = ""
    let containerDetalle = ""
    detalleEstados.map(estado=>{
        let innerData = `<p><b>Movimiento:</b> ${estado.descripcion}</p>`
        containerDetalle += innerData
    })
    detalleNovedades.map(novedad=>{
        let innerData = `<p><b>Novedad:</b> ${novedad.descripcion}</p>`
        containerNovedades += innerData
    })
    let container = `<h4>Guia #${response[0].codigo_remision}</h4>
    <hr>
    <p><b>Estado:</b> ${response[0].descripcion_estado}</p>
    <p><b>Fecha Recogida:</b> ${response[0].fecha_recogida}, ${response[0].nombre_origen}</p>
    <p><b>Fecha Entrega:</b> ${response[0].fecha_entrega}, ${response[0].nombre_destino}</p>
    <hr>
    ${containerDetalle}
    <hr>
    ${containerNovedades}`
    return container
}

function rastrearPedido(codigo_remision) {
    NProgress.start();
    $.ajax({
        url:  get_base_url()+'/pedidos/rastrear_pedido',
        type: 'POST',
        data: {codigo_remision: codigo_remision},
        success: function(response) {
            const modalContainer = document.querySelector('#container-rastreos')
            NProgress.done();
            let dataResponse = JSON.parse(response);
            
            let innerContainer = feedTrackingModal(dataResponse.message, modalContainer)
            modalContainer.innerHTML = innerContainer
        } ,
        error: function(){
            NProgress.done();
            alerta('No se puedo realizar la conexion con el WS');
            return;
        }
    }); 
}

function consultaCobertura(codigo_transportadora) {

    /*NProgress.start();
    $(".btn-siguiente").attr('disabled',true);

    $.ajax({
        url:  get_base_url()+'/pedidos/verCoberturas',
        type: 'POST',
        data: null,
        success: function(response) {
            NProgress.done();
            let dataResponse = jQuery.parseJSON(response);

             result = encontrarCobertura(codigo_transportadora,dataResponse.data);
             //console.log(result);
            if(result){
                toast('Municipio con cobertura','success');
                $(".btn-siguiente").removeAttr('disabled');

                const select = document.querySelectorAll("#transportadora option");
                select.forEach(option=>{
                    if (option.value == 1) {
                        option.disabled = false;
                        option.classList.remove("disabled")
                    }
                })
                
            }else{
                toast('No se encontro cobertura para el municipio seleccionado','error');
                $(".btn-siguiente").attr('disabled',true);
            }
        } ,
        error: function(){
            NProgress.done();
            alerta('No se puedo realizar la conexion con el WS');
            $(".btn-siguiente").attr('disabled',true);
            return;
        }
    });*/

    $(".btn-siguiente").removeAttr('disabled');
    
    const select = document.querySelectorAll("#transportadora option");
    select.forEach(option=>{
        if (option.value == 1) {
            option.disabled = false;
            option.classList.remove("disabled")
        }
    });
}


function encontrarCobertura(codigo_transportadora, array_response_transportadora){
    for (var i=0; i < array_response_transportadora.length; i++) {
        if (array_response_transportadora[i].codigo.includes(codigo_transportadora)) {
            return array_response_transportadora[i];
        }
    }

    return false;
}