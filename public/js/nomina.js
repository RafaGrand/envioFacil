
function seleccionarDeseleccionarCheck(){
    if( $('.check_todos').is(':checked') ) {
        $(".checkRNM").prop("checked",true);
    }else{
        $(".checkRNM").prop("checked",false);
    }
}

function detectarCheckSeleccionado(){
    if($(".checkRNM").length == $(".checkRNM:checked").length){
        $(".check_todos").prop("checked", true);
    }else{
        $(".check_todos").prop("checked", false);
    }
}

function abrirNovedadEmpleado(id_registro_empleado_nomina){
    
    $('#fmrnovedadPD')[0].reset();
    $('#modal_novedades_nomina').modal('open', true);
    $('.tabs').tabs();
    getTablaNovedadDP(id_registro_empleado_nomina);
    getTablaNovedadEMP(id_registro_empleado_nomina);
    $('#add_id_registro_empleado_nomina').val(id_registro_empleado_nomina);
    $('#id_registro_empleado_nomina_emp').val(id_registro_empleado_nomina);
    M.updateTextFields();
}

function getConfigConceptoNovedad(id_concepto){

    if(id_concepto == 0){
        return;
    }
    NProgress.start();
    var formData = new FormData();
	formData.append('id_concepto',id_concepto);

	$.ajax({    
        type: 'post',                                                                               
        url:  get_base_url()+'Nomina/getConfigConceptoNovedad',												
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
				dataResponse.message = 'No se pudo cargar la configuracion del concepto. Recargue la pagina he intene nuevamente';
            }

            if(!dataResponse.status){   			
				alerta(dataResponse.message);
                NProgress.done();
                $("#modal_novedades_nomina").modal('close', true);
                return;
            }

            $("#se_expresa_en").val(dataResponse.data.se_expresa_en);
            M.updateTextFields();
            NProgress.done();
            return;
        },
		error: function(){
            dataResponse.message = 'No se pudo cargar la configuracion del concepto. Recargue la pagina he intene nuevamente';
            NProgress.done();
            $("#modal_novedades_nomina").modal('close', true);
			return;
        }
    });
}

function calcularValorTotalPD(){    

    var cantidad     = $("#add_cantidad").val();
    var val_unitario = $("#add_valor_unitario").val();
    var valor_total  = cantidad * val_unitario;
    $("#add_valor_total").val(valor_total);
    M.updateTextFields();
}

function camnposRequeirdosNovedadPD(){

    var id_movimiento_nomina = $("#add_id_movimeinto").val();
    var concepto_pd_id       = $("#add_concepto_pd_id").val();
    var cantidad             = $("#add_cantidad").val();
    var valor_unitario       = $("#add_valor_unitario").val();            
    var valor_total          = $("#add_valor_total").val();

    if(concepto_pd_id === undefined || concepto_pd_id.length == 0){
        alerta('Debe de seleccionar un concepto','warning');
        return false;
    }else if(cantidad === undefined || cantidad.length == 0){
        alerta('Campo cantidad requerido','warning');
        return false ;
    }else if(valor_unitario === undefined || valor_unitario.length == 0){
        alerta('Campo valor unitario requerido','warning');
        return false;
    }else if(valor_total === undefined || valor_total.length == 0){
        alerta('Campor valor total requerido','warning');
        return false;
    }

    return true;
}

function camnposRequeirdosNovedadEMP(){

    var id_novedad_empleado         = $("#novedad_empleado_id").val();
    var fecha_ini                   = $("#fecha_ini_novedad_emp").val();
    var fecha_fin                   = $("#fecha_fin_novedad_emp").val();
    var observacion                 = $("#observacion_novedad_emp").val();
    var id_registro_empleado_nomina = $("#add_id_registro_empleado_nomina").val();
    var fecha_ini_periodo_nomina    = $("#fecha_ini_periodo_nomina").val();
    var fecha_fin_periodo_nomina    = $("#fecha_fin_periodo_nomina").val();
    var id_empleado                 = $("#id_empleado_emp").val();

    if(id_novedad_empleado.length == 0){
        alerta('Seleccione la novedad que desea aplicar','warning');
        return false;
    }else if(id_registro_empleado_nomina === undefined || id_registro_empleado_nomina.length==0 || id_registro_empleado_nomina == 0){
        alerta('No se puede identificar el registro para crear el elemento','warning');        
        return false;
    }else if(fecha_fin < fecha_ini){
        alerta('La fecha fin debe ser mayor o igual a la incial','warning'); 
        return false; 
    }else if(fecha_ini < fecha_ini_periodo_nomina){
        alerta('La fecha inicio no puede ser menor a la fecha inicial del periodo de nomina ('+fecha_ini_periodo_nomina+')','warning');
        return false;  
    }else if(fecha_ini > fecha_fin_periodo_nomina){
        alerta('La fecha inicio no puede ser mayor a la fecha final del periodo de nomina ('+fecha_fin_periodo_nomina+')','warning');
        return false;  
    }else if(id_empleado == "0"){
        alerta('No se logro identificar el empleado para crear la novedad','warning');
        return false;  
    }

    return true;
}

function crearNovedadPD(){

    if(!camnposRequeirdosNovedadPD()){
        return;
    }
    
    NProgress.start();

    $.ajax({    
        type: 'post',                                                                               
        url:  get_base_url()+'Nomina/crearNovedadPD',												
        data: $("#fmrnovedadPD").serialize(),          
        success: function(response)                                                            
        {   
            try{
                var dataResponse = jQuery.parseJSON(response);
            }catch(e){
                var dataResponse = new Object();
                dataResponse.status = false;
                dataResponse.message = 'No se pudo crear el registro';
            }

            if(!dataResponse.status){   			
                alerta(dataResponse.message);
                NProgress.done();
                return;
            }

            $('#fmrnovedadPD')[0].reset();
            M.updateTextFields();
            $('select').formSelect();
            getTablaNovedadDP(dataResponse.registro_empleado_nomina_id);
            alerta(dataResponse.message,'success');

            NProgress.done();
        },
        error: function(){
            alerta('ERROR¡ No se pudo crear el registro');
            NProgress.done();
            return;
        }
    });

}

function getTablaNovedadDP(id_registro_empleado_nomina){
    
    $(".tbody-novedades-pd").empty();
    $(".tfoot-novedades-pd").removeClass("hide");

    var formData = new FormData();
	formData.append('id_registro_empleado_nomina',id_registro_empleado_nomina);

	$.ajax({    
        type: 'post',                                                                               
        url:  get_base_url()+'Nomina/getTablaNovedadDP',												
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
				dataResponse.message = 'No se pudo cargar las novedades de pago y descuento';
            }

            console.log(dataResponse.data_empleado);

            $(".nom-empleado").html(dataResponse.data_empleado.nombre_empelado);
            $(".cargo-empleado").html(dataResponse.data_empleado.nombre_cargo);
            $("#id_empleado_emp").val(dataResponse.data_empleado.id_empleado);

            if(!dataResponse.status){   			
				html = '<h5 class="grey-text center-align">'+dataResponse.message+'</h5><br>';
                $(".tbody-novedades-pd").append(html);
                $(".tfoot-novedades-pd").addClass("hide");
                return;
            }

            var data = dataResponse.data;
			var html = '';

            if (data.length > 0) {
				for (i = 0; i < data.length; i++) {

					html += ''+
                    '<tr class="tr-novedades fila-novedad-pd'+data[i].id_movimiento_nomina+'">' +
						'<td class="td-novedades" style="width:200px;font-size: 11px;">'+
							'<p>'+data[i].concepto +'</p>'+
						'</td>'+
						'<td class="td-novedades">'+
							'<p>'+data[i].cantidad +'</p>'+
						'</td>'+
						'<td class="td-novedades">'+
							'<p>'+data[i].valor_unitario +'</p>'+
						'</td>'+
                        '<td class="td-novedades">'+
							'<p>'+data[i].valor +'</p>'+
						'</td>'+
						'<td class="td-novedades" style="width:70px;">'+
                            '<a class="btn-floating  waves-effect waves-light btn-small orange" onclick="cargarNovedadPD('+data[i].id_movimiento_nomina+')">'+
                                '<i class="material-icons ">create</i>'+
                            '</a>'+
                        '</td>'+
                        '<td class="td-novedades" style="width:70px;">'+
                            '<a class="btn-floating  waves-effect waves-light btn-small red" onclick="eliminarNovedadPD('+data[i].id_movimiento_nomina+')">'+
                                '<i class="material-icons">remove</i>'+
                            '</a>'+
                        '</td>'+
                    '</tr>';
				}
			} 

            $(".tbody-novedades-pd").append(html);
            $(".tfoot-novedades-pd").addClass("hide");
            return;
        },
		error: function(){
            dataResponse.message = 'ERROR¡ No se pudo cargar las novedades de pago y descuento';
            html = '' +
					'<tr class="grey-text">' +
					    '<td class="center-align" Colspan="6"><h5>'+dataResponse.message+'</h5></td>' +
					'</tr>';
            $(".tbody-novedades-pd").append(html);
            $(".tfoot-novedades-pd").addClass("hide");
            return;
        }
    });
}

function getTablaNovedadEMP(id_registro_empleado_nomina){

    $(".tbody-novedades-emp").empty();
    $(".tfoot-novedades-emp").removeClass("hide");

    var formData = new FormData();
	formData.append('id_registro_empleado_nomina',id_registro_empleado_nomina);

	$.ajax({    
        type: 'post',                                                                               
        url:  get_base_url()+'Nomina/getTablaNovedadEMP',												
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
				dataResponse.message = 'No se pudo cargar las novedades de empelado';
            }

            if(!dataResponse.status){   			
				html = '<h5 class="grey-text center-align">'+dataResponse.message+'</h5><br>';
                $(".tbody-novedades-emp").append(html);
                $(".tfoot-novedades-emp").addClass("hide");
                return;
            }

            var data = dataResponse.data;
			var html = '';

            if (data.length > 0) {
				for (i = 0; i < data.length; i++) {

					html += ''+
                    '<tr class="tr-novedades fila-novedad-emp'+data[i].id_registro_novedad_empleado+'">' +
						'<td class="td-novedades" style="width:150px;font-size: 11px;">'+
							'<p>'+data[i].novedad +'</p>'+
						'</td>'+
						'<td class="td-novedades">'+
							'<p>'+data[i].fecha_ini +'</p>'+
						'</td>'+
						'<td class="td-novedades">'+
							'<p>'+data[i].fecha_fin +'</p>'+
						'</td>'+
                        '<td class="td-novedades">'+
							'<p>'+data[i].cantidad_dias +'</p>'+
						'</td>';
                    if(data[i].gestionable == 'SI'){
                        html +=''+
                        '<td class="td-novedades" style="width:70px;">'+
                            '<a class="btn-floating  waves-effect waves-light btn-small orange" onclick="cargarNovedadEMP('+data[i].id_registro_novedad_empleado+')">'+
                                '<i class="material-icons ">create</i>'+
                            '</a>'+
                        '</td>'+
                        '<td class="td-novedades" style="width:70px;">'+
                            '<a class="btn-floating  waves-effect waves-light btn-small red" onclick="eliminarNovedadEMP('+data[i].id_registro_novedad_empleado+')">'+
                                '<i class="material-icons">remove</i>'+
                            '</a>'+
                        '</td>'+
                    '</tr>';
                    }else{
                        html +=''+
                        '<td class="td-novedades" style="width:70px;">'+
                            '<a class="btn-floating  waves-effect waves-light btn-small orange disabled">'+
                                '<i class="material-icons">create</i>'+
                            '</a>'+
                        '</td>'+
                        '<td class="td-novedades" style="width:70px;">'+
                            '<a class="btn-floating  waves-effect waves-light btn-small red disabled">'+
                                '<i class="material-icons">remove</i>'+
                            '</a>'+
                        '</td>'+
                    '</tr>';
                    }
				}
			} 

            $(".tbody-novedades-emp").append(html);
            $(".tfoot-novedades-emp").addClass("hide");
            return;
        },
		error: function(){
            dataResponse.message = 'ERROR¡ No se pudo cargar las novedades de empleado';
            html = '' +
					'<tr class="grey-text">' +
					    '<td class="center-align" Colspan="6"><h5>'+dataResponse.message+'</h5></td>' +
					'</tr>';
            $(".tbody-novedades-emp").append(html);
            $(".tfoot-novedades-emp").addClass("hide");
            return;
        }
    });
}

function eliminarNovedadPD(id_movimiento_nomina){
    
    Swal.fire({
		//icon: 'question',
		imageUrl: get_base_url()+'public/imagenes/alertas/pregunta.gif',
		imageWidth: 150,
		imageHeight: 150,
		imageAlt: 'loading icon',
		title: 'Esta a punto de eliminar una novedad de pago y descuento',
		html: '¿Desea continuar?',
		backdrop: 'swal2-backdrop-show',
		allowOutsideClick: false,
		allowEscapeKey: false,
		position: 'center',
		showConfirmButton: true,
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		confirmButtonText: '<span style="font-size:16px"><strong>Aceptar</strong></span>',
		cancelButtonText: '<span style="font-size:16px"><strong>Cancelar</strong></span>',
		width: 500
	}).then((result) => {
		if (result.isConfirmed) {
			
            var formData = new FormData();
            formData.append('id_movimiento_nomina',id_movimiento_nomina);

            $.ajax({    
                type: 'post',                                                                               
                url:  get_base_url()+'Nomina/eliminarNovedadPD',												
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
                        dataResponse.message = 'No se pudo eliminar el registro';
                    }

                    if(!dataResponse.status){   			
                        alerta(dataResponse.message);
                        return;
                    }
                    
                    $(".fila-novedad-pd"+id_movimiento_nomina).remove();
                    return;
                },
                error: function(){
                    alerta('ERROR¡ No se pudo eliminar el registro');
                    return;
                }
            });
		}
	});
}

function eliminarNovedadEMP(id_registro_empleado_nomina){
    
    Swal.fire({
		//icon: 'question',
		imageUrl: get_base_url()+'public/imagenes/alertas/pregunta.gif',
		imageWidth: 150,
		imageHeight: 150,
		imageAlt: 'loading icon',
		title: 'Esta a punto de eliminar una novedad de empleado',
		html: '¿Desea continuar?',
		backdrop: 'swal2-backdrop-show',
		allowOutsideClick: false,
		allowEscapeKey: false,
		position: 'center',
		showConfirmButton: true,
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		confirmButtonText: '<span style="font-size:16px"><strong>Aceptar</strong></span>',
		cancelButtonText: '<span style="font-size:16px"><strong>Cancelar</strong></span>',
		width: 500
	}).then((result) => {
		if (result.isConfirmed) {
			
            var formData = new FormData();
            formData.append('id_registro_empleado_nomina',id_registro_empleado_nomina);

            $.ajax({    
                type: 'post',                                                                               
                url:  get_base_url()+'Nomina/eliminarNovedadEMP',												
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
                        dataResponse.message = 'No se pudo eliminar el registro';
                    }

                    if(!dataResponse.status){   			
                        alerta(dataResponse.message);
                        return;
                    }
                    
                    $(".fila-novedad-emp"+id_registro_empleado_nomina).remove();
                    return;
                },
                error: function(){
                    alerta('ERROR¡ No se pudo eliminar el registro');
                    return;
                }
            });
		}
	});
}

function cargarNovedadPD(id_movimiento_nomina){
    
    $('#fmrnovedadPD')[0].reset();
    NProgress.start();
    var formData = new FormData();
    formData.append('id_movimiento_nomina',id_movimiento_nomina);

    $.ajax({    
        type: 'post',                                                                               
        url:  get_base_url()+'Nomina/cargarNovedadPD',												
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
            
            $(".btn-anadir-novedad").addClass('hide');
            $(".btn-editar-novedad").removeClass('hide');
            $(".btn-no-editar").removeClass('hide');

            $("#add_id_movimeinto").val(id_movimiento_nomina);
            $('#add_concepto_pd_id option:selected').removeAttr('selected');
			$("#add_concepto_pd_id option[value='"+ dataResponse.data.id_concepto_pago +"']").attr("selected",true);
            //$("#add_se_expresa_en").val(dataResponse.data.se_expresa_en);
            $("#add_observacion").val(dataResponse.data.observacion);
            $("#add_cantidad").val(dataResponse.data.cantidad);
            $("#add_valor_unitario").val(dataResponse.data.valor_unitario);            
            $("#add_valor_total").val(dataResponse.data.valor_total);
            M.updateTextFields();
            $("#add_concepto_pd_id").attr('disabled',true);
            $('select').formSelect();
            NProgress.done();
        },
        error: function(){
            alerta('ERROR¡ No se pudo cargar el registro');
            NProgress.done();
            return;
        }
    });
}

function cargarNovedadEMP(id_registro_novedad_empleado){

    $('#fmrnovedadEMP')[0].reset();
    NProgress.start();
    var formData = new FormData();
    formData.append('id_registro_novedad_empleado',id_registro_novedad_empleado);

    $.ajax({    
        type: 'post',                                                                               
        url:  get_base_url()+'Nomina/cargarNovedadEMP',												
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
            
            $(".btn-anadir-novedad-emp").addClass('hide');
            $(".btn-editar-novedad-emp").removeClass('hide');
            $(".btn-no-editar-emp").removeClass('hide');

            mostrarCamposAuxiliares(dataResponse.data.novedad_empleado);
            $("#id_registro_novedad_empleado").val(id_registro_novedad_empleado);
            $('#novedad_empleado_id option:selected').removeAttr('selected');
			$("#novedad_empleado_id option[value='"+ dataResponse.data.novedad_empleado +"']").attr("selected",true);
            $("#fecha_ini_novedad_emp").val(dataResponse.data.fecha_ini);
            $("#fecha_fin_novedad_emp").val(dataResponse.data.fecha_fin);
            $("#num_incapacidad_licencia_emp").val(dataResponse.data.num_incapacidad_licencia);            
            $("#codigo_novedad_emp").val(dataResponse.data.codigo_novedad);
            $("#cantidad_dias_novedad_emp").val(dataResponse.data.cantidad_dias);            
            $("#dias_cobrar_entidad_emp").val(dataResponse.data.dias_cobrar_entidad);
            $("#observacion_novedad_emp").val(dataResponse.data.observacion);
            M.updateTextFields();
            $("#novedad_empleado_id").attr('disabled',true);
            $('select').formSelect();
            NProgress.done();
        },
        error: function(){
            alerta('ERROR¡ No se pudo cargar el registro');
            NProgress.done();
            return;
        }
    });

}

function noEditarPD(){
    $("#add_concepto_pd_id").removeAttr('disabled',false);
    $('#add_concepto_pd_id option:selected').removeAttr('selected');
    $('#fmrnovedadPD')[0].reset();
    M.updateTextFields();
    $('select').formSelect();
    $(".btn-anadir-novedad").removeClass('hide');
    $(".btn-editar-novedad").addClass('hide');
    $(".btn-no-editar").addClass('hide');
}

function noEditarEMP(){
    $("#novedad_empleado_id").removeAttr('disabled',false);
    $('#novedad_empleado_id option:selected').removeAttr('selected');
    $('#fmrnovedadEMP')[0].reset();
    M.updateTextFields();
    $('select').formSelect();
    $(".btn-anadir-novedad-emp").removeClass('hide');
    $(".btn-editar-novedad-emp").addClass('hide');
    $(".btn-no-editar-emp").addClass('hide');
}

function editarNovedadPD(){     

    if(!camnposRequeirdosNovedadPD()){
        return;
    }

    NProgress.start();

    $.ajax({    
        type: 'post',                                                                               
        url:  get_base_url()+'Nomina/editarNovedadPD',												
        data: $("#fmrnovedadPD").serialize(),          
        success: function(response)                                                            
        {   
            try{
                var dataResponse = jQuery.parseJSON(response);
            }catch(e){
                var dataResponse = new Object();
                dataResponse.status = false;
                dataResponse.message = 'No se pudo editar el registro';
            }

            if(!dataResponse.status){   			
                alerta(dataResponse.message);
                NProgress.done();
                return;
            }
            
            /*M.updateTextFields();
            $('select').formSelect();*/
            alerta(dataResponse.message,'success');
            getTablaNovedadDP(dataResponse.registro_empleado_nomina_id);
            NProgress.done();
        },
        error: function(){
            alerta('ERROR¡ No se pudo editar el registro');
            NProgress.done();
            return;
        }
    });
}

function editarNovedadEMP(){

    if(!camnposRequeirdosNovedadEMP()){
        return;
    }

    NProgress.start();

    $.ajax({    
        type: 'post',                                                                               
        url:  get_base_url()+'Nomina/editarNovedadEMP',												
        data: $("#fmrnovedadEMP").serialize(),          
        success: function(response)                                                            
        {   
            try{
                var dataResponse = jQuery.parseJSON(response);
            }catch(e){
                var dataResponse = new Object();
                dataResponse.status = false;
                dataResponse.message = 'No se pudo editar el registro';
            }

            if(!dataResponse.status){   			
                alerta(dataResponse.message);
                NProgress.done();
                return;
            }
            
            /*M.updateTextFields();
            $('select').formSelect();*/
            alerta(dataResponse.message,'success');
            getTablaNovedadEMP(dataResponse.registro_empleado_nomina_id);
            NProgress.done();
        },
        error: function(){
            alerta('ERROR¡ No se pudo editar el registro');
            NProgress.done();
            return;
        }
    });
}

function crearNovedadEMP(){
    
    if(!camnposRequeirdosNovedadEMP()){
        return;
    }

    NProgress.start();

    $.ajax({    
        type: 'post',                                                                               
        url:  get_base_url()+'Nomina/crearNovedadEMP',												
        data: $("#fmrnovedadEMP").serialize(),          
        success: function(response)                                                            
        {   
            try{
                var dataResponse = jQuery.parseJSON(response);
            }catch(e){
                var dataResponse = new Object();
                dataResponse.status = false;
                dataResponse.message = 'No se pudo crear el registro';
            }

            if(!dataResponse.status){   			
                alerta(dataResponse.message);
                NProgress.done();
                return;
            }

            getTablaNovedadEMP(dataResponse.id_registro_empleado_nomina);
            alerta(dataResponse.message,'success');
            $('#fmrnovedadEMP')[0].reset();
            M.updateTextFields();
            $('select').formSelect();
            NProgress.done();
        },
        error: function(){
            alerta('ERROR¡ No se pudo crear el registro');
            NProgress.done();
            return;
        }
    });
}

function calcularDias(){
    var fecha1 = new Date($("#fecha_ini_novedad_emp").val());
    var fecha2 = new Date($("#fecha_fin_novedad_emp").val());
    var diff = fecha2 - fecha1;
    var diferenciaDias = Math.floor(diff / (1000 * 60 * 60 * 24));
    $("#cantidad_dias_novedad_emp").val(diferenciaDias);
}

function mostrarCamposAuxiliares(novedad_empleado_id){

    var dataNovedad = novedad_empleado_id.split("|");
    var id_novedad_empleado = dataNovedad[0];
    var id_tipo_novedad_empleado = dataNovedad[1];     
    var tipos_aplica = ["1","2","3","4","5","7","8"];

    if(tipos_aplica.includes(id_tipo_novedad_empleado)){
        $(".campos-aux-emp").removeClass('hide');
    }else{
        $(".campos-aux-emp").addClass('hide');
    }
}

function generarReporteNomina(reporte){
    document.getElementById('fmrnomina').setAttribute('action','nomina/'+reporte);
    document.getElementById('fmrnomina').submit();
}

function seleccionarPeriodoNomina(id_empresa_periodo_nomina){
    window.location.href = get_base_url()+"nomina?id_empresa_periodo_nomina="+id_empresa_periodo_nomina;
}

function cerrarPeriodoNomina(id_empresa_periodo_nomina){
    
    Swal.fire({
		//icon: 'question',
		imageUrl: get_base_url()+'public/imagenes/alertas/pregunta.gif',
		imageWidth: 150,
		imageHeight: 150,
		imageAlt: 'loading icon',
		title: 'Esta a punto de cerrar el periodo de nomina',
		html: '¿Desea continuar?',
		backdrop: 'swal2-backdrop-show',
		allowOutsideClick: false,
		allowEscapeKey: false,
		position: 'center',
		showConfirmButton: true,
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		confirmButtonText: '<span style="font-size:16px"><strong>Continuar</strong></span>',
		cancelButtonText: '<span style="font-size:16px"><strong>Cancelar</strong></span>',
		width: 500
	}).then((result) => {
		if (result.isConfirmed) {
			
            var formData = new FormData();
            formData.append('id_empresa_periodo_nomina',id_empresa_periodo_nomina);

            $.ajax({    
                type: 'post',                                                                               
                url:  get_base_url()+'Nomina/cerrarPeriodoNomina',												
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
                        dataResponse.message = 'No se pudo cerrar la nomina';
                    }

                    if(!dataResponse.status){   			
                        alerta(dataResponse.message);
                        return;
                    }
                    
                    Swal.fire({
                        imageUrl: get_base_url()+'public/imagenes/alertas/check.gif',
                        imageWidth: 150,
                        imageHeight: 150,
                        imageAlt: 'loading icon',
                        title: dataResponse.message,
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
                            cargarModulo('nomina');
                        }else{
                            cargarModulo('nomina');
                        }
                    });
                    
                    
                    return;
                },
                error: function(){
                    alerta('ERROR¡ No se pudo cerrar la nomina');
                    return;
                }
            });
		}
	});
}

