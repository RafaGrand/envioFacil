function inicializarModalCrearEmpleado(){

	$('.lista_grupo_familiar').empty();
}

function  mostrarCampoLibreta(value){

    if(value == "Si"){
        $(".clase_libreta").removeAttr("hidden");
    }else{
        $(".clase_libreta").attr("hidden",true);
    }
}

function  mostrarCampoTipoLicencia(value){

    if(value == "Si"){
        $(".tipo_licencia").removeAttr("hidden");
    }else{
        $(".tipo_licencia").attr("hidden",true);
    }
}

function agregarItemGrupoFamiliar(id_grupo_familiar = 0, prefijo= 'ceg', nombre = '', parentezco = '', fecha_nacimiento = '', telefono = ''){

	var contador_item = Number($("#contador_item").val()) + 1;
	$("#contador_item").val(contador_item);

    html = 
    '<tr class="item-'+contador_item+'">'+
		'<td>'+
			'<a class="btn-floating waves-effect waves-light btn-small red" onclick="eliminarItemGrupoFamiliar('+contador_item+','+id_grupo_familiar+')"><i class="material-icons left">remove</i></a>'+
		'</td>'+
        '<td>'+
            '<div class="input-field">'+
				'<input id="'+prefijo+'_id_grupo_familiar" name="'+prefijo+'_id_grupo_familiar" type="hidden" value="'+id_grupo_familiar+'" />'+
                '<input value="'+nombre+'" id="'+prefijo+'_nombre_completo[]" name="'+prefijo+'_nombre_completo[]" type="text" class="validate" required>'+
            '</div>'+
        '</td>'+
        '<td>'+
            '<div class="input-field">'+
                '<select name="'+prefijo+'_parentezco[]" id="'+prefijo+'_parentezco[]" style="display: block;" class="validate" required>'+
                    '<option value="">- Parentezco -</option>'+
                    '<option value="Madre"'+ (selelcted = parentezco == 'Madre' ? 'selected' : '') +'>Madre</option>'+
                    '<option value="Padre"'+ (selelcted = parentezco == 'Padre' ? 'selected' : '') +'>Padre</option>'+
                    '<option value="Hermano(a)"'+ (selelcted = parentezco == 'Hermano(a)' ? 'selected' : '') +'>Hermano(a)</option>'+
                    '<option value="Hijo(a)"'+ (selelcted = parentezco == 'Hijo(a)' ? 'selected' : '') +'>Hijo(a)</option>'+
                    '<option value="Abuelo(a)"'+ (selelcted = parentezco == 'Abuelo(a)' ? 'selected' : '') +'>Abuelo(a)</option>'+
                    '<option value="Primo(a)"'+ (selelcted = parentezco == 'Primo(a)' ? 'selected' : '') +'>Primo(a)</option>'+
                    '<option value="Tio(a)"'+ (selelcted = parentezco == 'Tio(a)' ? 'selected' : '') +'>Tio(a)</option>'+
                   	'<option value="Sobrino(a)"'+ (selelcted = parentezco == 'Sobrino(a)' ? 'selected' : '') +'>Sobrino(a)</option>'+
                '</select>'+
            '</div>'+
        '</td>'+
        '<td>'+
            '<div class="input-field">'+
                '<input value="'+fecha_nacimiento+'" id="'+prefijo+'_fecha_nacimiento[]" name="'+prefijo+'_fecha_nacimiento[]" type="date" class="validate" required>'+
            '</div>'+
        '</td>'+
        '<td>'+
           ' <div class="input-field">'+
                '<input value="'+telefono+'" id="'+prefijo+'_telefono[]" name="'+prefijo+'_telefono[]" type="number" class="validate" required>'+
            '</div>'+
        '</td>'+
    '</tr>';
    $('.lista_grupo_familiar').append(html);
	$("#"+prefijo+"_parentezco option[value='"+ parentezco +"']").attr("selected",true);

}

function crearEmpleado(){

	var ce_numero_documento		= $('#ce_numero_documento').val();
    var ce_primer_nombre        = $('#ce_primer_nombre').val();
    var ce_primer_apellido      = $('#ce_primer_apellido').val();
    var ce_fecha_nacimiento     = $('#ce_fecha_nacimiento').val();
    var ce_deptartamento        = $('#ce_deptartamento').val();
    var ce_municipio_id         = $('#ce_municipio_id').val();
    var ce_direccion            = $('#ce_direccion').val();
    var ce_telefono             = $('#ce_telefono').val();
    var ce_profesion            = $('#ce_profesion').val();
	var ce_email 				= $('#ce_email').val();

    // VALIDACION DE CAMPOS, OJO TAMBIEN SE VALIDAN DEL LADO DEL SERVIDOR
	{
		if(ce_numero_documento.length === 0){
			alerta('El campo <b>#Documento</b> es requerido','warning');
			return;
		}else if(ce_numero_documento.length < 6){ 
			alerta('El <b>#Documento</b> no tiene la cantidad de digitos requeridos','warning');
			return;
		}else if(ce_primer_nombre.length <=1){ 
			alerta('El campo <b>Primer Nombre</b> es requerido','warning');
			return;
		}else if(ce_primer_apellido.length <=1){
			alerta('El campo <b>Primer Apellido</b> es requerido','warning');
			return;
		}else if(ce_fecha_nacimiento.length  <=1){
			alerta('El campo <b>Fecha Nacimiento</b> es requerido','warning');
			return;
		}else if(ce_deptartamento == null){
			alerta('El campo <b>Departamento</b> es requerido','warning');
			return;
		}else if(ce_municipio_id == null){
			alerta('El campo <b>Municipio</b> es requerido','warning');
			return;
		}else if(ce_direccion.length == 0){
			alerta('El campo <b>Direccion</b> es requerido','warning');
			return;
		}else if(ce_telefono.length <= 9){
			alerta('<b>Telefono</b> no valido','warning');
			return;
		}else if(ce_email === ''){
			alerta('El campo <b>Email</b> es requerido','warning');
			return;
		}else if(ce_profesion == null){
			alerta('El campo <b>Profesión</b> es requerido','warning');
			return;
		}
	}

    NProgress.start();

    $.ajax({                                                                             
		type: 'POST',                                                                              
		url:  get_base_url()+'/empleado/crearEmpleado',										
		data: $("#fmrcrearempleado").serialize(),     
		success: function(response)                                                            
		{   

			try{
				var dataResponse = jQuery.parseJSON(response);
			}catch(e){
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar crear el elemento';
				NProgress.done();
			}

			if(!dataResponse.status){
				NProgress.done();
				alerta(dataResponse.message);
				return;
			}

			if($('#ce_foto_empleado').val().length > 0){
				cargarFotoEmpleado(dataResponse.id_empleado),'ce';
			}

			$('#modal_crear_empleado').modal('close', true);

			NProgress.done();
			Swal.fire({
				imageUrl: get_base_url()+'public/imagenes/alertas/check.gif',
				imageWidth: 150,
				imageHeight: 150,
				imageAlt: 'loading icon',
				title: '<h5>'+dataResponse.message+'</h5>',
				html: 	'<div class="row">'+
							'<div class="col m2">'+
                    			'<i class="medium material-icons">description</i>'+
                			'</div>'+
                			'<div class="col m10">'+
                    			'<h6>Creaste un nuevo empleado, ahora el siguiente paso es crear un contrato.</h6>'+
                			'</div>'+
            			'</div>',
				backdrop: 'swal2-backdrop-show',
				allowOutsideClick: false,
				allowEscapeKey: false,
				position: 'center',
				showConfirmButton: true,
				showCancelButton: true,
				confirmButtonColor: '#005EB8',
				cancelButtonColor: 'gray',
				confirmButtonText: '<span style="font-size:16px"><strong>Crear contrato</strong></span>',
				cancelButtonText: '<span style="font-size:16px"><strong>más tarde</strong></span>',
				width: 400
			}).then((result) => {
				if (result.isConfirmed) {
					formularioCrearContrato(dataResponse.id_empleado);
				}else{
					window.location.href = get_base_url()+'empleado';
				}
			});

		} ,
		error: function(){
            NProgress.done();
            alerta('Se presento un error al intentar crear el elemento');
			return;
        }                                                                                           
	});
}

function cargarFotoEmpleado(id_empleado, prefijo = 'ce'){
	
    var formData = new FormData();
    var files = $('#'+prefijo+'_foto_empleado')[0].files[0];

    formData.append('file',files);
	formData.append('id_empleado',id_empleado);

	$.ajax({    
        type: 'post',                                                                               
        url:  get_base_url()+'Empleado/cargarFotoEmpleado',												
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
				dataResponse.message = 'Se presento un error no controlado, intenete nuevamente y si el problema persiste contacte a soporte';
            }

            if(!dataResponse.status){   			
				//alerta(dataResponse.message);
				return;
            }
        },
		error: function(){
            //alerta('Se presento un error al intentar cargar el logo, por favor recargue la pagina he intente nuevamente.');
			return;
        }
    });

}

function validarEmpleadoExiste(){

	var tipo 	   = $("#ce_tipo_documento").val();
	var documento  = $("#ce_numero_documento").val();

	if(documento.length > 2){

		var formData = new FormData();
		formData.append('tipo_documento',tipo);
		formData.append('numero_documento',documento);

		$.ajax({    
			type: 'post',                                                                               
			url:  get_base_url()+'Empleado/validarEmpleadoExiste',												
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
					alerta('El tipo y numero de documento ya esta registrado para otro empleado');
					$("#ce_numero_documento").val('');
					return;
				}
			},
			error: function(){
				return;
			}
		});

	}

}

function eliminarItemGrupoFamiliar(item,id_grupo_familiar){	

	if(id_grupo_familiar==0){
		$(".item-"+item).remove();
	}else{
		
		Swal.fire({
			//icon: 'question',
			imageUrl: get_base_url()+'public/imagenes/alertas/pregunta.gif',
			imageWidth: 150,
			imageHeight: 150,
			imageAlt: 'loading icon',
			title: 'Esta a punto de eliminar un integrante del grupo familiar',
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
		}).then((result) => {
			if (result.isConfirmed) {

				var formData = new FormData();			
				formData.append('id_grupo_familiar',id_grupo_familiar);
				$.ajax({    
					type: 'post',                                                                               
					url:  get_base_url()+'Empleado/eliminarItemGrupoFamiliar',												
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
							dataResponse.message = 'Se presento un error no controlado, intenete nuevamente y si el problema persiste contacte a soporte';
						}

						if(!dataResponse.status){   			
							alerta(dataResponse.message);
							return;
						}

						$(".item-"+item).remove();

					},
					error: function(){
						alerta('Se presento un error al intentar eliminar el registro, por favor recargue la pagina he intente nuevamente.');
						return;
					}
				});
			}
		});
	

	}
}

function filtrarEmpleado(){
	
	var message   = 'Se presento un error no controlado, recargue la pagina e intenete nuevamente y si el problema persiste contacte a soporte'
	var palabra   = $("#input_filtro_empleado").val();
	var id_estado = $("#select_filtro_empleado option:selected").val();

	$(".list-empleado").empty();
	$(".loader-filter").removeClass("hide");
	$(".msg-resultado").addClass("hide");

	var formData = new FormData();
	formData.append('palabra',palabra);
	formData.append('id_estado',id_estado);

	$.ajax({    
		type: 'post',                                                                               
		url:  get_base_url()+'Empleado/filtrarEmpleado',												
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
				dataResponse.message = message;
			}

			if(!dataResponse.status){     
				$(".loader-filter").addClass("hide");
				$(".msg-resultado").removeClass("hide");
				return;
			}

			var data  = dataResponse.data;
			
			for(i=0;i<data.length;i++){

				html =''+
				'<div class="col s12 m4">'+
					'<ul class="collection hoverable" id="ul-card-empleado">'+
						'<li class="collection-item avatar grey-text" onclick="abrirGestionEmpleado('+data[i].id_empleado+')">'+
							'<img src="'+get_base_url()+'public/imagenes/empleado/foto/'+data[i].foto+'" alt="" class="circle">'+
							'<span style="padding-left: 30px;" class="title" style>'+
								'Codigo'+
								data[i].id_empleado+
							'</span><br><br>'+
							'<p style="padding-left: 30px;">'+
								'<i class="tiny material-icons">person</i>'+
								data[i].nombre_empleado+'<br>'+
								'<i class="tiny material-icons">confirmation_number</i>'+
								data[i].numero_documento+'<br>'+
								'<i class="tiny material-icons">event_seat</i>'+
								data[i].cargo+
							'</p>';
							
							if(data[i].id_estado_contrato == 1){                             
									html +='<div class="secondary-content green-text">'+
										'<i class="material-icons small tooltipped" data-tooltip="Activo">done</i>'+
									'</div>';
							}else if(data[i].id_estado_contrato == 3){ 
									html +='<div class="secondary-content blue-text">'+
										'<i class="material-icons small tooltipped" data-tooltip="Contrato Suspendido">pause</i>'+
									'</div>';
							}else if(data[i].id_estado_contrato == 4){ 
									html +='<div class="secondary-content red-text">'+
										'<i class="material-icons small tooltipped" data-tooltip="Contrato Liquidado">not_interested</i>'+
									'</div>';
							}else if(data[i].id_estado_contrato == 0){
									html +='<div class="secondary-content orange-text">'+
										'<i class="material-icons small tooltipped" data-tooltip="Sin contrato">warning</i>'+
									'</div>';
							}
						html +='</li>'+
					'</ul>'+
				'</div>';

				$(".list-empleado").append(html);
			}

			$(".loader-filter").addClass("hide");

		},
		error: function(){				
			$(".loader-filter").addClass("hide");
			alerta(message);
			return;
		}
	});	
}


function abrirGestionEmpleado(id_empleado){

	if(id_empleado.length < 10001 || id_empleado === undefined){
		alerta('Id de empleado no valido');
		return;
	}


	$('#modal_gestion_empleado').modal('open', true);
	$('.tabs').tabs();
	$('.tabs').tabs('select','infoempledados');

	cargaListaContratoEmpleado(id_empleado);
	getDataEmpleadoEdit(id_empleado);

}

function getDataEmpleadoEdit(id_empleado){
	
	var formData = new FormData();
	formData.append('id_empleado',id_empleado);

	$.ajax({    
		type: 'post',                                                                               
		url:  get_base_url()+'Empleado/getDataEmpleadoEdit',												
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
				dataResponse.message = 'Se presento un error no controlado, intenete nuevamente y si el problema persiste contacte a soporte';
            }

            if(!dataResponse.status){     
				$("#modal_gestion_empleado").modal('close',true);      
				alerta(dataResponse.message);
				return;
            }

			var data = dataResponse.data;

			$("#ee_id_empleado").val(id_empleado);
			$('#ee_tipo_documento option:selected').removeAttr('selected');
			$("#ee_tipo_documento option[value='"+ data[0].tipo_documento_identidad_id +"']").attr("selected",true);
			$("#ee_numero_documento").val(data[0].numero_documento);
			$("#ee_expedicion_documento").val(data[0].expedicion_documento);
			$("#ee_lugar_nacimiento").val(data[0].lugar_nacimiento);
			$("#ee_primer_nombre").val(data[0].primer_nombre);
			$("#ee_segundo_nombre").val(data[0].segundo_nombre);
			$("#ee_primer_apellido").val(data[0].primer_apellido);
			$("#ee_segundo_apellido").val(data[0].segundo_apellido);
			$("#ee_fecha_nacimiento").val(data[0].fecha_nacimiento);
			$('#ee_estado_civil option:selected').removeAttr('selected');
			$("#ee_estado_civil option[value='"+ data[0].estado_civil +"']").attr("selected",true);
			$('#ee_sexo option:selected').removeAttr('selected');
			$("#ee_sexo option[value='"+ data[0].sexo +"']").attr("selected",true);
			//CARGUE DE DEPARTAMENTO Y MUNICIPIO

			if(data[0].departamento_id != document.getElementById('ee_deptartamento').value){
				$('#ee_deptartamento option:selected').removeAttr('selected',true);
			}

			$("#ee_deptartamento option[value='"+ data[0].departamento_id +"']").attr("selected",true);	
			cargarSelect(data[0].departamento_id,'municipio','id_municipio','nombre','cargar-municipio-edit',data[0].municipio_id);

			$("#ee_direccion").val(data[0].direccion);
			$("#ee_telefono").val(data[0].telefono);
			$('#ee_libreta_militar option:selected').removeAttr('selected');
			$("#ee_libreta_militar option[value='"+ data[0].libreta_militar +"']").attr("selected",true);
			mostrarCampoLibreta(data[0].libreta_militar);	
			$('#ee_licencia_conduccion option:selected').removeAttr('selected');
			$("#ee_licencia_conduccion option[value='"+ data[0].licencia_conduccion +"']").attr("selected",true);
			mostrarCampoTipoLicencia(data[0].licencia_conduccion);
			$('#ee_profesion option:selected').removeAttr('selected');
			$("#ee_profesion option[value='"+ data[0].profesion_id +"']").attr("selected",true);
			$("#ee_tarjeta_profesional").val(data[0].tarjeta_profesional);
			$("#ee_email").val(data[0].email);
			M.updateTextFields();
			$('select').formSelect();
			//*$("#img_logo_edit").attr("src",get_base_url()+"public/imagenes/empresa/logo/"+data[0].logo);
			$(".loader-modulo-modal").addClass('hide');
			$(".modal-content").removeClass('hide');

			$('.lista_grupo_familiar').empty();
			if(data[0].id_grupo_familiar_empleado != null){
				
				for(i=0; i < data.length;i++){
					agregarItemGrupoFamiliar( data[i].id_grupo_familiar_empleado,'eeg', data[i].nombre_completo_familiar,data[0].parentezco, data[i].fecha_nacimiento_familiar,data[i].telefono_familiar);
				}
			}
        },
		error: function(){
			$("#modal_modificar_empresa").modal('close',true); 
            alerta('Se presento un error al intentar cargar la información de la empresa, por favor recargue la pagina he intente nuevamente.');
			return;
        }
    });

}


function editarEmpleado(){

	var ee_primer_nombre        = $('#ee_primer_nombre').val();
    var ee_primer_apellido      = $('#ee_primer_apellido').val();
    var ee_numero_documento     = $('#ee_numero_documento').val();
    var ee_fecha_nacimiento     = $('#ee_fecha_nacimiento').val();
    var ee_deptartamento        = $('#ee_deptartamento').val();
    var ee_municipio_id         = $('#ee_municipio_id').val();
    var ee_direccion            = $('#ee_direccion').val();
    var ee_telefono             = $('#ee_telefono').val();
    var ee_profesion            = $('#ee_profesion').val();

    // VALIDACION DE CAMPOS, OJO TAMBIEN SE VALIDAN DEL LADO DEL SERVIDOR
	{
		if(ee_primer_nombre.length <=1){
		alerta('El campo <b>Primer Nombre</b> es requerido','warning');
		return;
		}else if(ee_primer_apellido.length <=1){
			alerta('El campo <b>Primer Apellido</b> es requerido','warning');
			return;
		}else if(ee_numero_documento.length <=7){
			alerta('<b># Documento</b> no es valido','warning');
			return;
		}else if(ee_fecha_nacimiento.length  <=1){
			alerta('El campo <b>Fecha Nacimiento</b> es requerido','warning');
			return;
		}else if(ee_deptartamento == null){
			alerta('El campo <b>Departamento</b> es requerido','warning');
			return;
		}else if(ee_municipio_id == null){
			alerta('El campo <b>Municipio</b> es requerido','warning');
			return;
		}else if(ee_direccion.length == 0){
			alerta('El campo <b>Direccion</b> es requerido','warning');
			return;
		}else if(ee_telefono.length <= 9){
			alerta('<b>Telefono</b> no valido','warning');
			return;
		}else if(ee_profesion == null){
			alerta('El campo <b>Profesión</b> es requerido','warning');
			return;
		}
	}

	NProgress.start();

    $.ajax({                                                                             
		type: 'POST',                                                                              
		url:  get_base_url()+'/empleado/editarEmpleado',										
		data: $("#fmreditarempleado").serialize(),     
		success: function(response)                                                            
		{   

			try{
				var dataResponse = jQuery.parseJSON(response);
			}catch(e){
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar editar el elemento';
				NProgress.done();
			}

			if(!dataResponse.status){
				NProgress.done();
				alerta(dataResponse.message);
				return;
			}

			if($('#ee_foto_empleado').val().length > 0){
				cargarFotoEmpleado(dataResponse.id_empleado,'ee');
			}

			//$('#modal_crear_empleado').modal('close', true);

			NProgress.done();
			Swal.fire({
				imageUrl: get_base_url()+'public/imagenes/alertas/check.gif',
				imageWidth: 150,
				imageHeight: 150,
				title: '<h5>'+dataResponse.message+'</h5>',
				html:  '<h6>Operacion realizada con exito</h6>',      	
				backdrop: 'swal2-backdrop-show',
				allowOutsideClick: false,
				allowEscapeKey: false,
				position: 'center',
				showConfirmButton: true,
				showCancelButton: false,
				confirmButtonColor: '#005EB8',
				cancelButtonColor: 'gray',
				confirmButtonText: '<span style="font-size:16px"><strong>Aceptar</strong></span>',
				cancelButtonText: '<span style="font-size:16px"><strong>más tarde</strong></span>',
				width: 400
			}).then((result) => {
				if (result.isConfirmed) {
					//formularioCrearContrato(dataResponse.id_empleado);
				}else{
					//window.location.href = get_base_url()+'empleado';
				}
			});

		} ,
		error: function(){
            NProgress.done();
            alerta('Se presento un error al intentar editar el elemento');
			return;
        }                                                                                           
	});
	
	
}

