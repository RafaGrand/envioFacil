function cambioPasoNuevoPedido(paso){
    
    if(paso == 2){

        if(!validarCamposRequridosPaso1()){
            return;
        }

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

async function rastrearPedido(codigo_remision) {
    NProgress.start();
    try {
        let formData = JSON.stringify({codigo_remision: codigo_remision})
        const response = await fetch(`${get_base_url()}/pedidos/rastrear_pedido`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: formData,
        })
        const data = await response.json()
        if(data) {
            NProgress.done();
            console.log(data)
        }
    } catch (error) {
        console.error(`Error: ${error.message}`)
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
    btn.disabled = true;

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

                const select = document.querySelectorAll("#transportadora option");
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


function validarCamposRequridosPaso1(){

    let nombre_destinatario         = $('#nombre_destinatario').val();
    let departamento_destinatario   = $('#departamento_destinatario').val();
    let municipio_destinatario      = $('#municipio_destinatario').val();
    let direccion_destinatario      = $('#direccion_destinatario').val();
    let telefono_destinatario       = $('#telefono_destinatario').val();

    if(nombre_destinatario == ""){
        alerta('Debe de digitar el nombre del destinatario');
        return false;
    }else if(departamento_destinatario == ""){
        alerta('Debe de seleccionar un departamento');
        return false;
    }else if(municipio_destinatario == ""){
        alerta('Debe de seleccionar un municipio');
        return false;
    }else if(direccion_destinatario == ""){
        alerta('Debe de digitar una direccion del destinatario');
        return false;
    }else if(telefono_destinatario == ""){
        alerta('Debe de digitar el telefono del destinatario');
        return false;
    }
    return true;
}

function validarCamposRequridosPaso2(){

    let contenido       = $('#contenido').val();
    let valor_declarado = $('#valor_declarado').val();
    let alto            = $('#alto').val();
    let ancho           = $('#ancho').val();
    let largo           = $('#largo').val();
    let peso            = $('#peso').val();
    let transportadora   = $('#transportadora').val();

    if(contenido == ""){
        alerta('Debe de digitar el contenido del pedido');
        return false;
    }else if(alto == "" || alto <= 0 ){
        alerta('El <b>alto</b> del empaque es necesario');
        return false;
    }else if(ancho == "" || ancho <= 0){
        alerta('El <b>ancho</b> del empaque es necesario');
        return false;
    }else if(largo == "" || largo <= 0){
        alerta('El <b>largo</b> del empaque es necesario');
        return false;
    }else if(peso == "" || peso <= 0){
        alerta('El <b>peso</b> del empaque es necesario');
        return false;
    }else if(transportadora == "" || transportadora == "0"){
        alerta('Debe de seleccionar una transportadora disponible');
        return false;
    }else if(valor_declarado == "" || valor_declarado <= 0){
        alerta('Debe de digitar el valor declarado del pedido');
        return false;
    }

    return true;
}


function guardarPedido(){

    if(!validarCamposRequridosPaso2()){
        return;
    }

    NProgress.start();

    $.ajax({                                                                             
		type: 'POST',                                                                              
		url:  get_base_url()+'/pedidos/guardarPedido',										
		data: $("#fmrnuevopedido").serialize(),      
		success: function(response)                                                            
		{   
            console.log(response);
			try{
				var dataResponse = jQuery.parseJSON(response);
			}catch(e){
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Esposible que el pedido se haya creado pero no se puedo traducir la respues, por favor revise la tabla de pedidos';
			}

			if(!dataResponse.status){
				alerta(dataResponse.message);
				NProgress.done();
				return;
			}

            let data = dataResponse.data;
            
            NProgress.done();

            Swal.fire({
				icon: 'success',
				title: 'Pedido Registrado de forma correcta',
                html: '<br><b>Id de remision: </b>'+data.id_remision+'<br><b>Codigo de remision; </b>'+data.codigo_remision,
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
					window.location.href = get_base_url() + 'pedidos';
				}
			});
		} ,
		error: function(){
            NProgress.done();
            alerta('Se presento un error al intentar crear el pedido');
			return;
        }                                                                                           
	});


}

