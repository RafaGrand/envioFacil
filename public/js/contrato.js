function formularioCrearContrato(id_empleado,modal = 'crear_contrato'){

    $('#modal_gestion_empleado').modal('close', true);
    if(Number(id_empleado) < 1001 || id_empleado === undefined){
        alerta('No fue posible cargar el formularo para la creacion del contrato.');
        $('.lista_grupo_familiar').empty();
        $('.tabs').tabs('select', 'infopersonal');
        $('#fmrcrearempleado')[0].reset();
        $('#modal_crear_empleado').modal('close', true);
        return;
    }

	$('.lista_grupo_familiar').empty();
	$('.tabs').tabs('select', 'infopersonal');
	$('#fmrcrearempleado')[0].reset();
    if(modal == 'crear_contrato'){
        $('#modal_crear_empleado').modal('close', true);
        $('#modal_crear_contrato').modal('open', true);
    }
    $("#cc_id_empleado").val(id_empleado);

    var formData = new FormData();
    formData.append('id_empleado',id_empleado);

    $.ajax({                                                                             
        type: 'POST',                                                                        
        url:  get_base_url()+'empleado/getDataEmpleado',										
        data: formData,
        contentType: false,
        processData: false, 
        success: function(response)                                                            
        {   
            NProgress.done();

            try{
                var dataResponse = jQuery.parseJSON(response);
            }catch(e){
                var dataResponse = new Object();
                dataResponse.status = false;
                dataResponse.message = 'Se presento un error al intentar validar el elemento';
            }

            if(!dataResponse.status){                   
                alerta(dataResponse.message);
                return;
            }

            $("#img_empleado_contrato").attr("src",get_base_url()+"public/imagenes/empleado/foto/"+dataResponse.data[0].foto);
            $(".text-edad").text(dataResponse.data[0].edad +' Años');
            $(".text-nombre_completo").text(dataResponse.data[0].nombre_completo);
            $(".text-cedula").text(dataResponse.data[0].numero_documento);
            $(".text-profesion").text(dataResponse.data[0].profesion);
            $(".text-telefono").text(dataResponse.data[0].telefono);

        },
        error: function(){
            NProgress.done();
            alerta('Se presento un error al intentar validar el elemeto');
            return;
        }                                                                                           
    });

}

function cambioPaso(operacion){

    if(operacion == 'siguiente'){
        if(CamposRequeridosCrearContrato() == true){
            return false;
        }
    }

    NProgress.start();
    var paso_actual = Number($("#paso_actual").val());
   
    if(paso_actual >=1 && paso_actual !== undefined){

        if(operacion == 'siguiente'){
            paso_actual = paso_actual + 1;
        }else if(operacion == 'anterior'){
            paso_actual = paso_actual - 1;
        }else{
            $("#paso_actual").val(1);
            $('.c-contrato-paso-2').removeClass('hide');
            $('.c-contrato-paso-2').addClass('hide');

            $('.c-contrato-paso-1').removeClass('hide');
            $('.bt-siguiente').removeClass('hide');
                    
            $('.bt-guardar').removeClass('hide');
            $('.bt-guardar').addClass('hide');

            $('.bt-anterior').removeClass('hide');
            $('.bt-anterior').addClass('hide');
            NProgress.done();
            return;
        }      
        
        $("#paso_actual").val(paso_actual);

        switch (paso_actual) {
            case 1:
                $('.bt-anterior').addClass('hide');
                $('.bt-guardar').addClass('hide');
                $('.c-contrato-paso-2').addClass('hide');
                $('.c-contrato-paso-1').removeClass('hide');
                $('.bt-siguiente').removeClass('hide');
                NProgress.done();
                break;
            case 2:
                $('.bt-anterior').removeClass('hide');
                $('.bt-guardar').removeClass('hide');
                $('.bt-siguiente').addClass('hide');
                $('.c-contrato-paso-1').addClass('hide');
                $('.c-contrato-paso-2').removeClass('hide');
                NProgress.done();
                break;
            default:
              
                break;
        }
    }

    NProgress.done();
}

function cambioPasoEdit(operacion){

    if(operacion == 'siguiente'){
        if(CamposRequeridosEditarContrato() == true){
            return false;
        }
    }

    NProgress.start();
    var paso_actual = Number($("#paso_actual").val());
   
    if(paso_actual >=1 && paso_actual !== undefined){

        if(operacion == 'siguiente'){
            paso_actual = paso_actual + 1;
        }else if(operacion == 'anterior'){
            paso_actual = paso_actual - 1;
        }else{
            $("#paso_actual").val(1);
            $('.c-contrato-paso-2').removeClass('hide');
            $('.c-contrato-paso-2').addClass('hide');

            $('.c-contrato-paso-1').removeClass('hide');
            $('.bt-siguiente').removeClass('hide');
                    
            $('.bt-guardar').removeClass('hide');
            $('.bt-guardar').addClass('hide');

            $('.bt-anterior').removeClass('hide');
            $('.bt-anterior').addClass('hide');
            NProgress.done();
            return;
        }      
        
        $("#paso_actual").val(paso_actual);

        switch (paso_actual) {
            case 1:
                $('.bt-anterior').addClass('hide');
                $('.bt-guardar').addClass('hide');
                $('.c-contrato-paso-2').addClass('hide');
                $('.c-contrato-paso-1').removeClass('hide');
                $('.bt-siguiente').removeClass('hide');
                NProgress.done();
                break;
            case 2:
                $('.bt-anterior').removeClass('hide');
                $('.bt-guardar').removeClass('hide');
                $('.bt-siguiente').addClass('hide');
                $('.c-contrato-paso-1').addClass('hide');
                $('.c-contrato-paso-2').removeClass('hide');
                NProgress.done();
                break;
            default:
              
                break;
        }
    }

    NProgress.done();
}

function validarEstadoContrato(id_estado){

    var id_empleado = $("#cc_id_empleado").val();

    //Si el el estado entrate = 1 y si hay un id_empleado identificado
    if(id_estado == 1 && id_empleado.length > 0){
        
        NProgress.start();

        var formData = new FormData();
        formData.append('id_empleado',id_empleado);

        $.ajax({                                                                             
            type: 'POST',                                                                        
            url:  get_base_url()+'contrato/validarEstadoContrato',										
            data: formData,
            contentType: false,
            processData: false, 
            success: function(response)                                                            
            {   
                NProgress.done();

                try{
                    var dataResponse = jQuery.parseJSON(response);
                }catch(e){
                    var dataResponse = new Object();
                    dataResponse.status = false;
                    dataResponse.message = 'Se presento un error al intentar validar el elemento';
                }

                if(!dataResponse.status){                   
                    alerta(dataResponse.message);
                    return;
                }
            } ,
            error: function(){
                NProgress.done();
                alerta('Se presento un error al intentar validar el elemeto');
                return;
            }                                                                                           
        });
    }
}

function CamposRequeridosCrearContrato(){
    
    var cc_numero_contrato      = $('#cc_numero_contrato').val();
    var cc_fecha_ini            = $('#cc_fecha_ini').val();
    var cc_tipo_contrato_id     = $('#cc_tipo_contrato_id').val();
    var cc_cargo_id             = $('#cc_cargo_id').val();
    var cc_area_id              = $('#cc_area_id').val();
    var cc_salario_basico       = $('#cc_salario_basico').val();
    var cc_auxilio_transporte   = $('#cc_auxilio_transporte').val();
    var cc_centro_costo_id      = $('#cc_centro_costo_id').val();
    var cc_maneja_turno         = $('#cc_maneja_turno').val();
    var cc_horas_dia            = $('#cc_horas_dia').val();
    var cc_pensionado           = $('#cc_pensionado').val();
    var cc_cod_caja             = $('#cc_cod_caja').val();
    var cc_cod_eps              = $('#cc_cod_eps').val();
    var cc_cod_fpen             = $('#cc_cod_fpen').val();
    var cc_cod_fces             = $('#cc_cod_fces').val();
    var cc_cod_arl              = $('#cc_cod_arl').val();
    var cc_grupo_contable_id    = $('#cc_grupo_contable_id').val();
    var cc_tipo_cuenta          = $('#cc_tipo_cuenta').val();
    var cc_num_cuenta_banco     = $('#cc_num_cuenta_banco').val();
    var cc_cod_banco            = $('#cc_cod_banco').val();
    var cc_forma_pago_id        = $('#cc_forma_pago_id').val();
    var cc_id_empleado          = $('#cc_forma_pago_id').val();

    if(cc_numero_contrato.length == 0){
        alerta('El campo <b>Numero Contrato</b> es requerido','warning');
        $('#cc_tipo_contrato_id').focus();
        return true;
    }else if(cc_fecha_ini.length == 0){
        alerta('El campo <b>Fecha inicio</b> es requerido','warning');
        return true;
    }else if(cc_tipo_contrato_id.length == 0){
        alerta('El campo <b>Tipo Contrato</b> es requerido','warning');
        return true;
    }else if(cc_cargo_id.length == 0){
        alerta('El campo <b>Cargo</b> es requerido','warning');
        return true;
    }else if(cc_area_id.length == 0){
        alerta('El campo <b>Area</b> es requerido','warning');
        return true;
    }else if(Number(cc_salario_basico) <= 0){
        alerta('El campo <b>Salario Basico</b> debe de ser mayor a $0','warning');
        return true;
    }

    return false;
}

function CamposRequeridosCrearContratoPaso2(){

    var cc_cod_caja             = $('#cc_cod_caja').val();
    var cc_cod_eps              = $('#cc_cod_eps').val();
    var cc_cod_fpen             = $('#cc_cod_fpen').val();
    var cc_cod_fces             = $('#cc_cod_fces').val();
    var cc_cod_arl              = $('#cc_cod_arl').val();
    var cc_grupo_contable_id    = $('#cc_grupo_contable_id').val();
    var cc_num_cuenta_banco     = $('#cc_num_cuenta_banco').val();
    var cc_cod_banco            = $('#cc_cod_banco').val();
    var cc_forma_pago_id        = $('#cc_forma_pago_id').val();

    
    if( cc_cod_caja.length== 0){
        alerta('El campo <b>Caja Compensacion</b> es requerido','warning');
        return true;
    }else if(cc_cod_eps.length == 0){
        alerta('El campo <b>EPS</b> es requerido','warning');
        return true;
    }else if(cc_cod_fpen.length == 0){
        alerta('El campo <b>Fondo Pensiones</b> es requerido','warning');
        return true;
    }else if(cc_cod_fces.length == 0){
        alerta('El campo <b>Fondo Cesantias</b> es requerido','warning');
        return true;
    }else if(cc_cod_arl.length == 0){
        alerta('El campo <b>ARL</b> es requerido','warning');
        return true;
    }else if((cc_grupo_contable_id) <= 0){
        alerta('El campo <b>Grupo Contable</b> es requerido','warning');
        return true;
    }else if(cc_forma_pago_id.length == 0){
        alerta('El campo <b>Forma de Pago</b> es requerido','warning');
        return true;
    }

    return false;

}

function CamposRequeridosEditarContrato(){
    
    var ec_numero_contrato      = $('#ec_numero_contrato').val();
    var ec_fecha_ini            = $('#ec_fecha_ini').val();
    var ec_tipo_contrato_id     = $('#ec_tipo_contrato_id').val();
    var ec_cargo_id             = $('#ec_cargo_id').val();
    var ec_area_id              = $('#ec_area_id').val();
    var ec_salario_basico       = $('#ec_salario_basico').val();
    var ec_auxilio_transporte   = $('#ec_auxilio_transporte').val();
    var ec_centro_costo_id      = $('#ec_centro_costo_id').val();
    var ec_maneja_turno         = $('#ec_maneja_turno').val();
    var ec_horas_dia            = $('#ec_horas_dia').val();
    var ec_pensionado           = $('#ec_pensionado').val();
    var ec_cod_caja             = $('#ec_cod_caja').val();
    var ec_cod_eps              = $('#ec_cod_eps').val();
    var ec_cod_fpen             = $('#ec_cod_fpen').val();
    var ec_cod_fces             = $('#ec_cod_fces').val();
    var ec_cod_arl              = $('#ec_cod_arl').val();
    var ec_grupo_contable_id    = $('#ec_grupo_contable_id').val();
    var ec_tipo_cuenta          = $('#ec_tipo_cuenta').val();
    var ec_num_cuenta_banco     = $('#ec_num_cuenta_banco').val();
    var ec_cod_banco            = $('#ec_cod_banco').val();
    var ec_forma_pago_id        = $('#ec_forma_pago_id').val();
    var ec_id_empleado          = $('#ec_forma_pago_id').val();

    /*if(ec_numero_contrato.length == 0){
        alerta('El campo <b>Numero Contrato</b> es requerido','warning');
        $('#ec_tipo_contrato_id').focus();
        return true;
    }else */if(ec_fecha_ini.length == 0){
        alerta('El campo <b>Fecha inicio</b> es requerido','warning');
        return true;
    }else if(ec_tipo_contrato_id.length == 0){
        alerta('El campo <b>Tipo Contrato</b> es requerido','warning');
        return true;
    }else if(ec_cargo_id.length == 0){
        alerta('El campo <b>Cargo</b> es requerido','warning');
        return true;
    }else if(ec_area_id.length == 0){
        alerta('El campo <b>Area</b> es requerido','warning');
        return true;
    }else if(Number(ec_salario_basico) <= 0){
        alerta('El campo <b>Salario Basico</b> debe de ser mayor a $0','warning');
        return true;
    }

    return false;
}

function CamposRequeridosEditarContratoPaso2(){

    var ec_cod_caja             = $('#ec_cod_caja').val();
    var ec_cod_eps              = $('#ec_cod_eps').val();
    var ec_cod_fpen             = $('#ec_cod_fpen').val();
    var ec_cod_fces             = $('#ec_cod_fces').val();
    var ec_cod_arl              = $('#ec_cod_arl').val();
    var ec_grupo_contable_id    = $('#ec_grupo_contable_id').val();
    var ec_num_cuenta_banco     = $('#ec_num_cuenta_banco').val();
    var ec_cod_banco            = $('#ec_cod_banco').val();
    var ec_forma_pago_id        = $('#ec_forma_pago_id').val();

    
    if( ec_cod_caja.length== 0){
        alerta('El campo <b>Caja Compensacion</b> es requerido','warning');
        return true;
    }else if(ec_cod_eps.length == 0){
        alerta('El campo <b>EPS</b> es requerido','warning');
        return true;
    }else if(ec_cod_fpen.length == 0){
        alerta('El campo <b>Fondo Pensiones</b> es requerido','warning');
        return true;
    }else if(ec_cod_fces.length == 0){
        alerta('El campo <b>Fondo Cesantias</b> es requerido','warning');
        return true;
    }else if(ec_cod_arl.length == 0){
        alerta('El campo <b>ARL</b> es requerido','warning');
        return true;
    }else if((ec_grupo_contable_id) <= 0){
        alerta('El campo <b>Grupo Contable</b> es requerido','warning');
        return true;
    }else if(ec_num_cuenta_banco.length == 0){
        alerta('El campo <b>Numero de Cuenta</b> es requerido','warning');
        return true;
    }else if((ec_cod_banco) <= 0){
        alerta('El campo <b>Cuenta de Banco</b> es requerido','warning');
        return true;
    }else if(ec_forma_pago_id.length == 0){
        alerta('El campo <b>Forma de Pago</b> es requerido','warning');
        return true;
    }

    return false;
}


function validarNumeroContrato(){

	var numero_contrato = $("#cc_numero_contrato").val();

    console.log(numero_contrato);

	if(numero_contrato.length > 2){

		var formData = new FormData();
		formData.append('numero_contrato',numero_contrato);

		$.ajax({    
			type: 'post',                                                                               
			url:  get_base_url()+'Contrato/validarNumeroContrato',												
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
				}
	
				if(!dataResponse.status){     
					alerta('El numero de contrato ya esta registrado para otro empleado');
					$("#cc_numero_contrato").val('');
					return;
				}
			},
			error: function(){
				return;
			}
		});

	}

}

function crearContrato(){

    if(CamposRequeridosCrearContrato() || CamposRequeridosCrearContratoPaso2() )
        return;

    NProgress.start();

    $.ajax({                                                                             
    type: 'POST',                                                                        
    url:  get_base_url()+'contrato/crearContratos',										
    data: $("#fmrcrearcontrato").serialize(),
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

        if (!dataResponse.status) {
            alerta(dataResponse.message);
            return;
        }

        Swal.fire({
            imageUrl: get_base_url()+'public/imagenes/alertas/check.gif',
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: 'loading icon',
            title:'<h4>Contrato creado con exito!</h4>',
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
                window.location.href = get_base_url() + 'empleado';
            }
        });
    },
    error: function () {
        NProgress.done();
        alerta('Se presento un error al intentar crear el elemeto');
        return;
    }                                                                                       
});

}

function editarContrato(){
    if(CamposRequeridosEditarContrato() || CamposRequeridosEditarContratoPaso2() )
        return;

    NProgress.start();

    $.ajax({                                                                             
    type: 'POST',                                                                        
    url:  get_base_url()+'contrato/editarContrato',										
    data: $("#fmreditarcontrato").serialize(),
    success: function(response)                                                            
    {   
        NProgress.done();

        try{
            var dataResponse = jQuery.parseJSON(response);
        }catch(e){
            var dataResponse = new Object();
            dataResponse.status = false;
            dataResponse.message = 'Se presento un error al intentar editar el elemento';
        }

        if (!dataResponse.status) {
            alerta(dataResponse.message);
            return;
        }

        Swal.fire({
            imageUrl: get_base_url()+'public/imagenes/alertas/check.gif',
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: 'loading icon',
            title:'<h4>'+dataResponse.message+'</h4>',
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
                window.location.href = get_base_url() + 'empleado';
            }
        });
    },
    error: function () {
        NProgress.done();
        alerta('Se presento un error al intentar editar el elemeto');
        return;
    }});
}

function cargaListaContratoEmpleado(id_empleado){

	var formData = new FormData();
	formData.append('id_empleado',id_empleado);

	$.ajax({    
		type: 'post',                                                                               
		url:  get_base_url()+'Contrato/getListaContrato',												
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
				dataResponse.message = 'Error al procesar la lista de contratos';
			}

			if(!dataResponse.status){     
				alerta(dataResponse.message);
				return;
			}

			var data  = dataResponse.data;
            $(".lista-contrato-empleado").empty();
            $(".btn-crear-contrato").empty();
            $(".nombre-empleado").text(data[0].nombre_completo);

            html='<a class="btn-floating waves-effect waves-light btn-small green tooltipped" data-tooltip="Crear Contrato"     onclick="formularioCrearContrato('+data[0].id_empleado+')" title="Crear Contrato">'+
                    '<i class="material-icons">add</i>'+
                '</a>';
                
            $(".btn-crear-contrato").append(html);

            if(data.length == 1 && data[0].numero_contrato == null){
                html =''+
                    '<tr class="grey-text">'+
                        '<td class="center-align" Colspan="5"><h5>El empleado no tiene contratos registrados</h5><br>Para continuar presione el boton crear contrato</td>'+
                    '</tr>';                
                $(".lista-contrato-empleado").append(html);
                return;
            }

			for(i=0;i<data.length;i++){

				html =''+
                    '<tr>'+
                        '<td>'+data[i].numero_contrato+'</td>'+
                        '<td>'+data[i].fecha_creacion+'</td>'+
                        '<td>'+data[i].fecha_ini+'</td>'+
                        '<td>'+data[i].tipo_contrato+'</td>';                        
                
                if(data[i].estado_id == 1){                    
                    html +=''+
                        '<td class="green-text">'+
                            '<i class="material-icons small tooltipped" data-tooltip="Activo">done</i>'+
                        '</td>'+
                        '<td>'+
                            '<a class="btn-floating waves-effect waves-light btn-small orange" onclick="abrirEditarContrato('+data[i].id_contrato+')">'+
                                '<i class="material-icons left">create</i>'+
                            '</a>'+
                        '</td>';
                        $(".btn-crear-contrato").empty();
                }else if(data[i].estado_id == 3){
                    html +=''+
                        '<td class="blue-text">'+
                            '<i class="material-icons small tooltipped" data-tooltip="Contrato Suspendido">pause</i>'+
                        '</td>'+
                        '<td>'+
                            '<a class="btn-floating waves-effect waves-light btn-small orange"  onclick="abrirEditarContrato('+data[i].id_contrato+')">'+
                                '<i class="material-icons left">create</i>'+
                            '</a>'+
                        '</td>';
                        $(".btn-crear-contrato").empty();
                }else if(data[i].estado_id == 4){
                    html +=''+
                        '<td class="red-text">'+
                            '<i class="material-icons small tooltipped" data-tooltip="Contrato Suspendido">not_interested</i>'+
                        '</td>'+
                        '<td>'+
                            '<a class="btn-floating waves-effect waves-light btn-small blue tooltipped" data-tooltip="Ver contrato"  onclick="abrirVerContrato('+data.id_contrato+')">'+
                                '<i class="material-icons left">visibility</i>'+
                            '</a>'+                         
                        '</td>';
                }
                $(".lista-contrato-empleado").append(html);
                $('.tooltipped').tooltip();
			}
            
		},
		error: function(){				
			$(".loader-filter").addClass("hide");
			alerta('Error al procesar la lista de contratos');
			return;
		}
	});
}

function abrirEditarContrato(id_contrato){

    if(id_contrato <= 0 || id_contrato === undefined){
        alerta('No fue posible identificar el ID de contrato');
    }

    NProgress.start();
    var formData = new FormData();
	formData.append('id_contrato',id_contrato);

    $.ajax({    
		type: 'post',                                                                               
		url:  get_base_url()+'Contrato/getDataContrato',												
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
				dataResponse.message = 'Error al procesar la informacion del contrato';
			}

			if(!dataResponse.status){     
				alerta(dataResponse.message);
				return;
			}

			var data  = dataResponse.data;

            $('#modal_editar_contrato').modal('open', true);
            $('select').formSelect();

                
            formularioCrearContrato(data[0].empleado_id,'editar_empleado');
            $('#fmreditarcontrato')[0].reset();
            
			$("#ec_id_contrato").val(id_contrato);
            $("#ec_numero_contrato").val(data[0].numero_contrato);
            $("#ec_fecha_ini").val(data[0].fecha_ini);

            $('#ec_tipo_contrato_id option:selected').removeAttr('selected');
			$("#ec_tipo_contrato_id option[value='"+ data[0].tipo_contrato_id +"']").attr("selected",true);

            $('#ec_cargo_id option:selected').removeAttr('selected');
			$("#ec_cargo_id option[value='"+ data[0].cargo_id +"']").attr("selected",true);

            $('#ec_area_id option:selected').removeAttr('selected');
			$("#ec_area_id option[value='"+ data[0].area_id +"']").attr("selected",true);

            $("#ec_salario_basico").val(data[0].salario_basico);

            $('#ec_auxilio_transporte option:selected').removeAttr('selected');
			$("#ec_auxilio_transporte option[value='"+ data[0].auxilio_transporte +"']").attr("selected",true);

            $('#ec_centro_costo_id option:selected').removeAttr('selected');
			$("#ec_centro_costo_id option[value='"+ data[0].centro_costo_id +"']").attr("selected",true);

            $('#ec_maneja_turno option:selected').removeAttr('selected');
			$("#ec_maneja_turno option[value='"+ data[0].maneja_turno +"']").attr("selected",true);

            $("#ec_horas_dia").val(data[0].horas_dia);

            $('#ec_integral option:selected').removeAttr('selected');
			$("#ec_integral option[value='"+ data[0].integral +"']").attr("selected",true);

            $('#ec_pensionado option:selected').removeAttr('selected');
			$("#ec_pensionado option[value='"+ data[0].pensionado +"']").attr("selected",true);

            $('#ec_pensionado option:selected').removeAttr('selected');
			$("#ec_pensionado option[value='"+ data[0].pensionado +"']").attr("selected",true);

            $('#ec_cod_caja option:selected').removeAttr('selected');
			$("#ec_cod_caja option[value='"+ data[0].cod_caja +"']").attr("selected",true);

            $('#ec_cod_eps option:selected').removeAttr('selected');
			$("#ec_cod_eps option[value='"+ data[0].cod_eps +"']").attr("selected",true);

            $('#ec_cod_eps option:selected').removeAttr('selected');
			$("#ec_cod_eps option[value='"+ data[0].cod_eps +"']").attr("selected",true);

            $('#ec_cod_fpen option:selected').removeAttr('selected');
			$("#ec_cod_fpen option[value='"+ data[0].cod_fpen +"']").attr("selected",true);

            $('#ec_cod_fpen option:selected').removeAttr('selected');
			$("#ec_cod_fpen option[value='"+ data[0].cod_fpen +"']").attr("selected",true);

            $('#ec_cod_fces option:selected').removeAttr('selected');
			$("#ec_cod_fces option[value='"+ data[0].cod_fces +"']").attr("selected",true);

            $('#ec_cod_arl option:selected').removeAttr('selected');
			$("#ec_cod_arl option[value='"+ data[0].cod_arl +"']").attr("selected",true);

            $('#ec_grupo_contable_id option:selected').removeAttr('selected');
			$("#ec_grupo_contable_id option[value='"+ data[0].grupo_contable_id +"']").attr("selected",true);

            $('#ec_tipo_cuenta option:selected').removeAttr('selected');
			$("#ec_tipo_cuenta option[value='"+ data[0].tipo_cuenta +"']").attr("selected",true);
            
            $("#ec_num_cuenta_banco").val(data[0].num_cuenta_banco);

            $('#ec_cod_banco option:selected').removeAttr('selected');
			$("#ec_cod_banco option[value='"+ data[0].cod_banco +"']").attr("selected",true);

            $('#ec_forma_pago_id option:selected').removeAttr('selected');
			$("#ec_forma_pago_id option[value='"+ data[0].forma_pago_id +"']").attr("selected",true);

            M.updateTextFields();
            $('select').formSelect();
            NProgress.done();

		},
		error: function(){				
			NProgress.done();
			alerta('Error al procesar la informacion del contrato');
			return;
		}
	});

}



