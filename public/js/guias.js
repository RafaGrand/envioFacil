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

function verGuiasSinLiquidar(id_cuenta){

    NProgress.start();
    
    var formData = new FormData();
    formData.append('id_cuenta', id_cuenta);

    $.ajax({
        type: 'post',
        url: get_base_url() + 'pedidos/guetGuiasSinLiquidarCuenta',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {

            try {
                var dataResponse = jQuery.parseJSON(response);
            } catch (e) {
                var dataResponse = new Object();
                dataResponse.status = false;
                dataResponse.message = 'Error al procesar la informacion del usuario seleccionado';
            }

            if (!dataResponse.status) {
                NProgress.done();
                alerta(dataResponse.message);
                return;
            }

            $('#modal_guias_sin_liquidar').modal('open', true);	

            var html = '';
            var data = dataResponse.data;
            $(".tbody-guias-sin-liquidar").empty();
            for(i = 0; i < data.length; i++){
                
                html += ''+
                    '<tr>'+
                        '<td>'+
                            '<p>'+
                                '<label>'+
                                    '<input type="checkbox"  name="ids_pedidos[]" value="'+data[i].id_pedido+'"/>'+
                                        '<span></span>'+
                                '</label>'+
                            '</p>'+
                        '</td>'+
                        '<td>'+data[i].fecha+'</td>'+
                        '<td>'+data[i].usuario+'</td>'+
                        '<td>'+data[i].codigo_remision+'</td>'+
                        '<td>'+data[i].estado+'</td>'+
                        '<td>'+data[i].transportadora+'</td>'+
                        '<td>'+data[i].valor_comision+'</td>'+
                        '<td>'+data[i].valor_flete+'</td>'+
                        '<td>'+data[i].valor_cobrar+'</td>'+
                        '<td>'+data[i].valor_recibir+'</td>'+
                        '<td>'+
                            '<a href="#modal_rastreo"  onclick="rastrearPedido(\''+data[i].codigo_remision+'\')" class="modal-trigger tooltipped" data-position="left" data-tooltip="Rastrear pedido"><i class="material-icons">search</i></a>'+
                        '</td>'+
                    '</tr>';
            }

            $(".tbody-guias-sin-liquidar").append(html);
            	
            NProgress.done();

        },
        error: function () {
            NProgress.done();
            alerta('Error al procesar la informacion del usuario seleccionado');
            return;
        }
    });
    

}

function  liquidarGuiasCuenta(){

    Swal.fire({
        title: '¿Esta seguro de liquidar a este usuario?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Liquidar!'
      }).then((result) => {

        if (result.isConfirmed) {

			NProgress.start();

			let id_cuenta = $("#id_cuenta").val();
			
			var formData = new FormData();
			formData.append('id_cuenta', id_cuenta);

			/*$.ajax({
				type: 'post',
				url: get_base_url() + 'ajuste/eliminarCuentaCatalogo',
				data: formData,
				contentType: false,
				processData: false,
				success: function (response) {

					try {
						var dataResponse = jQuery.parseJSON(response);
					} catch (e) {
						var dataResponse = new Object();
						dataResponse.status = false;
						dataResponse.message = 'Error al procesar la informacion de la cuenta seleccionada';
					}

					if (!dataResponse.status) {
						NProgress.done();
						alerta(dataResponse.message);
						return;
					}

					var data = dataResponse.data;

					toast("<b>Registro eliminado</b>","success");
					$(".fila-catalogo-"+id_registro).remove();			
					NProgress.done();

				},
				error: function () {
					NProgress.done();
					alerta('Error al procesar la informacion de la cuenta seleccionada');
					return;
				}
			});*/
		}
	})
}

function abrirEditarPedido(id_pedido,codigo_remision){

    $("#codigo_remision_edit").val('');
    $("#id_pedido_edit").val('');
    
    if(codigo_remision.length == 0 || codigo_remision == ''){
        alerta('Error al cargar el codigo de remision');
        return;
    }

    $("#codigo_remision_edit").val(codigo_remision);
    $("#id_pedido_edit").val(id_pedido);

    NProgress.start();
    var formData = new FormData();
    formData.append('id_pedido',id_pedido);

    $.ajax({    
        type: 'post',                                                                               
        url:  get_base_url()+'pedidos/abrirEditarPedido',												
        data: formData,
        contentType: false,
        processData: false,            
        success: function(response)                                                            
        {   
            try{
                var dataResponse = jQuery.parseJSON(response);
            }catch(e){
                var dataResponse = new Object();
                dataResponse.status = false;
                dataResponse.message = 'No se pudo cargar el registro';
            }

            if(!dataResponse.status){   			
                alerta(dataResponse.message);
                NProgress.done();
                return;
            }
            
            var data = dataResponse.data;

            $("#nombre_destinatario_edit").val(data.nombre_destinatario);
            $("#departamento_destinatario_edit").val(data.departamento_id);
            municipiosDepartamento(data.departamento_id,'municipio_destinatario_edit',data.ciudad_destinatario);
            $("#direccion_destinatario_edit").val(data.direccion_destinatario);
            $("#telefono_destinatario_edit").val(data.telefono_destinatario);
            $(".btn-siguiente").removeAttr('disabled');

            $("#contenido_edit").val(data.contenido);
            $("#valor_declarado_edit").val(data.valor_declarado);
            $("#alto_edit").val(data.alto);
            $("#ancho_edit").val(data.ancho);
            $("#largo_edit").val(data.largo);
            $("#peso_edit").val(data.peso);

            $("#transportadora_edit").val(data.transportadora_id);
      
        

            M.updateTextFields();
            $('select').formSelect();
            NProgress.done();
            $('#modal_editar_pedido').modal('open', true);
        },
        error: function(){
            alerta('ERROR¡ No se pudo cargar el registro');
            NProgress.done();
            return;
        }
    });

    
}

function anularGuia(){

    NProgress.start();
    var codigo_remision = $("#codigo_remision_edit").val();
    var formData = new FormData();
    formData.append('codigo_remision', codigo_remision);

    $.ajax({
        type: 'post',
        url: get_base_url() + 'pedidos/anularGuia',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {

            try {
                var dataResponse = jQuery.parseJSON(response);
            } catch (e) {
                var dataResponse = new Object();
                dataResponse.status = false;
                dataResponse.message = 'Error al intentar anular la guia';
            }

            if (!dataResponse.status) {
                NProgress.done();
                alerta(dataResponse.message);
                return;
            }

            Swal.fire({
				icon: 'success',
				title: 'Anulacion de guias',
                html:   dataResponse.message,
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

            	
            NProgress.done();

        },
        error: function () {
            NProgress.done();
            alerta('Error al intentar anular la guia');
            return;
        }
    });

}

function guardarEditarPedido(){

    if(!validarCamposRequridosPaso2('_edit')){
        return;
    }

    NProgress.start();

    $.ajax({                                                                             
		type: 'POST',                                                                              
		url:  get_base_url()+'/pedidos/guardarEditarPedido',										
		data: $("#fmreditarpedido").serialize(),      
		success: function(response)                                                            
		{   
            console.log(response);
			try{
				var dataResponse = jQuery.parseJSON(response);
			}catch(e){
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Error al intenar editar el pedido';
			}

			if(!dataResponse.status){
				alerta(dataResponse.message);
				NProgress.done();
				return;
			}
            
            NProgress.done();

            Swal.fire({
				icon: 'success',
				title: 'Edicion de pedidos',
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
					window.location.href = get_base_url() + 'pedidos';
				}
			});
		} ,
		error: function(){
            NProgress.done();
            alerta('Error al intenar editar el pedido');
			return;
        }                                                                                           
	});
}

function municipiosDepartamento(id_dpto,select = 'municipio_destinatario',selected = false){
     
    let html = '';
    $(".btn-siguiente").attr('disabled',true);
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

            $("#"+select).empty();
            html +='<option selected disabled>- Seleccione -</option>';
            var atributo = '';
            for(let i=0;i<dataMunicipio.data.length;i++){

                atributo = dataMunicipio.data[i].codigo_transportadora == selected ? 'selected' : '' ; 

                html += '<option '+atributo+' value="'+dataMunicipio.data[i].codigo_transportadora+'">'+dataMunicipio.data[i].nombre+'</option>'; 
            }

            $("#"+select).append(html);
            $('select').formSelect();
        } ,
        error: function(){
            NProgress.done();
            alerta('Se presento un error al intentar crear el elemento');
            return;
        }                                       
    });

}

function cambioPasoNuevoPedido(paso, formulario = ''){
    
    if(paso == 2){

        if(!validarCamposRequridosPaso1(formulario)){
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

function validarCamposRequridosPaso1(formulario){

    let nombre_destinatario         = $('#nombre_destinatario'+formulario).val();
    let departamento_destinatario   = $('#departamento_destinatario'+formulario).val();
    let municipio_destinatario      = $('#municipio_destinatario'+formulario).val();
    let direccion_destinatario      = $('#direccion_destinatario'+formulario).val();
    let telefono_destinatario       = $('#telefono_destinatario'+formulario).val();

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

function validarCamposRequridosPaso2(formulario = ''){

    let contenido       = $('#contenido'+formulario).val();
    let valor_declarado = $('#valor_declarado'+formulario).val();
    let alto            = $('#alto'+formulario).val();
    let ancho           = $('#ancho'+formulario).val();
    let largo           = $('#largo'+formulario).val();
    let peso            = $('#peso'+formulario).val();
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
    }else if(formulario != '_edit' && (transportadora == "" || transportadora == "0")){
        alerta('Debe de seleccionar una transportadora disponible');
        return false;
    }else if(valor_declarado == "" || valor_declarado <= 0){
        alerta('Debe de digitar el valor declarado del pedido');
        return false;
    }

    return true;
}
