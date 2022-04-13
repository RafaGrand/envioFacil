function cambioPasoNuevoPedido(paso){
    
    if(paso == 2){
        $(".paso1").addClass('hide');
        $(".paso2").removeClass('hide');
        $(".btn-siguiente").addClass('hide');
        $(".btn-atras").removeClass('hide');
        $(".btn-guardar-pedido").removeClass('hide');
        $(".btn-cancelar").addClass('hide');
    }else if(paso == 1){
        $(".paso2").addClass('hide');
        $(".paso1").removeClass('hide');
        $(".btn-cancelar").removeClass('hide');
        $(".btn-siguiente").removeClass('hide');
        $(".btn-atras").addClass('hide');
        $(".btn-guardar-pedido").addClass('hide');
    }

}

function municipiosDepartamento(id_dpto){
     
    let html = '';

    NProgress.start();

    $.ajax({
        type: "POST",
        url:  get_base_url()+'/pedidos/lista_municipio',
        data: {departamento_id: id_dpto},
        success: function(response)                                                            
        {   
            NProgress.done();

            try{

                var dataMunicipio = jQuery.parseJSON(response);

            }catch(e){

                var dataMunicipio = new Object();
                dataMunicipio.status = false;
                dataMunicipio.message = 'Se presento un error al intentar crear el elemento';
            }

            if(!dataMunicipio.status){
                alerta(dataMunicipio.message);
                return;
            }

            $("#municipio_destinatario").empty();
            html +='<option selected disabled>- Seleccione -</option>';
            for(let i=0;i<dataMunicipio.data.length;i++){                
                html += '<option value="'+dataMunicipio.data[i].codigo_transportadora+'">'+dataMunicipio.data[i].nombre+'</option>'; 
            }

            $("#municipio_destinatario").append(html);
            $('select').formSelect();
        } ,
        error: function(){
            NProgress.done();
            alerta('Se presento un error al intentar crear el elemento');
            return;
        }                                       
    });

}

function consultaCobertura(codigo_transportadora) {

    NProgress.start();

    const btn = document.querySelector(".btn-siguiente");
    btn.disabled = false;

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
                const btn = document.querySelector(".btn-siguiente");
                btn.disabled = false;

                const select = document.querySelectorAll("#trasportadora option");
                select.forEach(option=>{
                    if (option.value == 1) {
                        option.disabled = false;
                        option.classList.remove("disabled")
                    }
                })
                //console.log(select)
                
            }else{
                toast('No se encontro cobertura para el municipio seleccionado','error');
                btn.disabled = true;
            }
        } ,
        error: function(){
            NProgress.done();
            alerta('No se puedo realizar la conexion con el WS');
            return;
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

