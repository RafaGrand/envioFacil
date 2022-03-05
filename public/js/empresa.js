function crearPrimeraEmpresa(){
    
    NProgress.start();

    $.ajax({                                                                             
		type: 'POST',                                                                              
		url:  get_base_url()+'/empresa/crearPrimeraEmpresa',										
		data: $("#fmrcrearprimeraempresa").serialize(),      
		success: function(response)                                                            
		{   
            NProgress.done();

			try{
				var dataResponse = jQuery.parseJSON(response);
			}catch(e){
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar crear el elemento';
			}

			if(!dataResponse.status){
				alerta(dataResponse.message);
				return;
			}

			toast(dataResponse.message,'success');

			$('#fmrcrearprimeraempresa')[0].reset();
			$('#modalCrearEmpresa').modal().hide();

		} ,
		error: function(){
            NProgress.done();
            alerta('Se presento un error al intentar crear el elemento');
			return;
        }                                                                                           
	});
}

function crearEmpresa(){
	
	NProgress.start();

    $.ajax({                                                                             
		type: 'POST',                                                                              
		url:  get_base_url()+'/empresa/crearEmpresa',										
		data: $("#fmrcrearempresa").serialize(),      
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
				imageUrl: 'http://softwaregenera.com/genera/public/imagenes/alertas/check.gif',
				imageWidth: 100,
				imageHeight: 100,
				imageAlt: 'loading icon',
				//icon: 'success',
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
					window.location.href = get_base_url()+'empresa';
				}
			});
			/*toast(dataResponse.message,'success');
			$('#fmrcrearempresa')[0].reset();
			$('#modal_crear_empresa').modal().hide();*/

		} ,
		error: function(){
            NProgress.done();
            alerta('Se presento un error al intentar crear el elemento');
			return;
        }                                                                                           
	});
}

// SI LA CUENTA NO TIENE NINGUNA EMPRESA ASIGNADA SE MUESTRA EL MODAL DE CREAR PRIMER EMPRESA 
function mostrarCrearEmpresaInicial(cant_empresas){
    if(cant_empresas == 0){
        $('#modalCrearEmpresa').modal('open');
    }
}

// SI ACABO DE INGRESAR Y YA TENGO EMPRESAS CREADAS MUESTRO EL MODAL PARA SELECCIONAR LA EMPRESA
function mostrarCambioEmpresa(id_empresa,cant_empresas){
    if(id_empresa == 0 && cant_empresas > 0){
        $('#modalCambioEmpresa').modal('open');
    }
}

function cambiarEmpresa(id_empresa){
	
	$.ajax({    
        type: 'GET',                                                                               
        url:  get_base_url()+'Empresa/cambiarEmpresa',												
        data: 'id_empresa='+id_empresa,                
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

			window.location.href = get_base_url()+"inicio";
        },
		error: function(){
            alerta('Se presento un error al intentar cambiar la empresa, por favor recargue la pagina he intente nuevamente.');
			return;
        }
    });
}

function cargarDataEmpresa(id_empresa){

	$("#modal_modificar_empresa").modal('open',true);

	$('.tabs').tabs();
	$('.tabs').tabs('select','infoempresa');

	$.ajax({    
        type: 'GET',                                                                               
        url:  get_base_url()+'Empresa/cargarDataEmpresa',												
        data: 'id_empresa='+id_empresa,                
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
				$("#modal_modificar_empresa").modal('close',true);      
				alerta(dataResponse.message);
				return;
            }

			var data = dataResponse.data;
			$("#id_empresa_edit").val(data[0].id_empresa);
			$("#nombre_edit").val(data[0].nombre);
			$("#representante_legal_edit").val(data[0].representante_legal);
			$("#documento_empresa_edit").val(data[0].documento_empresa);
			$("#digito_verificacion_edit").val(data[0].digito_verificacion);
			$("#naturaleza_edit").val(data[0].naturaleza);
			$("#telefono_edit").val(data[0].telefono);
			$("#email_edit").val(data[0].email);
			$("#direccion_edit").val(data[0].direccion);
			$("#estado_edit option[value='"+ data[0].estado_id +"']").attr("selected",true);
			$("#periodo_pago_edit option[value='"+ data[0].periodo_pago +"']").attr("selected",true);
			$("#centros_costo_edit option[value='"+ data[0].centros_costo +"']").attr("selected",true);
			$("#sector_comercial_id_edit option[value='"+ data[0].sector_comercial_id +"']").attr("selected",true);
			$("#deptartamento_edit option[value='"+ data[0].departamento_id +"']").attr("selected",true);
			cargarSelect(data[0].departamento_id,'municipio','id_municipio','nombre','cargar-municipio',data[0].municipio_id);
			M.updateTextFields();
			$('select').formSelect();
			$("#img_logo_edit").attr("src",get_base_url()+"public/imagenes/empresa/logo/"+data[0].logo);
			$(".loader-modulo-modal").addClass('hide');
			$(".modal-content").removeClass('hide');
			
        },
		error: function(){
			$("#modal_modificar_empresa").modal('close',true); 
            alerta('Se presento un error al intentar cargar la información de la empresa, por favor recargue la pagina he intente nuevamente.');
			return;
        }
    });
}

function editarEmpresa(message = false){

	//SE OBTIENEN LOS VALORES DEL LOS INPUT DEL FORMULARIO PARA VALIDAR QUE NINGUNO ESTE VACIO
	var documento_empresa_edit		= $("#documento_empresa_edit").val();
	var nombre_edit		 			= $("#nombre_edit").val();
	var naturaleza_edit		 		= $("#naturaleza_edit").val();
	var sector_comercial_id_edit	= $("#sector_comercial_id_edit").val();
	var representante_legal_edit	= $("#representante_legal_edit").val();
	var estado_edit		 			= $("#estado_edit").val();
	var periodo_pago_edit			= $("#periodo_pago_edit").val();
	var centros_costo_edit			= $("#centros_costo_edit").val();
	var telefono_edit		 		= $("#telefono_edit").val();
	var email_edit		 			= $("#email_edit").val();
	var deptartamento_edit			= $("#deptartamento_edit").val();
	var municipio_edit		 		= $("#municipio_edit").val();
	var direccion_edit		 		= $("#direccion_edit").val();
	var id_empresa_edit		 		= $("#id_empresa_edit").val();
	var periodo_nomina_inicial		= $("#periodo_nomina_inicial").val();

	// VALIDACION DE CAMPOS, OJO TAMBIEN SE VALIDAN DEL LADO DEL SERVIDOR
	{
		if(documento_empresa_edit.length <=1){
		alerta('El campo <b>Nit o Cedula</b> es requerido','warning');
		return;
		}else if(nombre_edit.length <=1){
			alerta('El campo <b>Nombre</b> es requerido','warning');
			return;
		}else if(naturaleza_edit == null){
			alerta('El campo Naturaleza es requerido','warning');
			return;
		}else if(sector_comercial_id_edit == null){
			alerta('El campo Sector Comercial es requerido','warning');
			return;
		}else if(representante_legal_edit.length <=1){
			alerta('El campo <b>Representante Legal</b> es requerido','warning');
			return;
		}else if(estado_edit.length ==''){
			alerta('El campo <b>Estado</b> es requerido','warning');
			return;
		}else if(periodo_nomina_inicial.length ==''){
			alerta('Debe de seleccionar un periodo inicial','warning');
			return;
		}else if(periodo_pago_edit.length <=1){
			alerta('El campo <b>Periodo de Pago</b> es requerido','warning');
			return;
		}else if(centros_costo_edit.length <=1){
			alerta('El campo <b>¿Maneja Centro de Costos?</b> es requerido','warning');
			return;
		}else if(telefono_edit.length <=1){
			alerta('El campo <b>Telefono_edit</b> es requerido','warning');
			return;
		}else if(email_edit.length <=1){
			alerta('El campo <b>Email</b> es requerido','warning');
			return;
		}else if(deptartamento_edit == null){
			alerta('El campo <b>Departamento</b> es requerido','warning');
			return;
		}else if(municipio_edit == null){
			alerta('El campo <b>Municipio</b> es requerido','warning');
			return;
		}else if(direccion_edit.length == 0){
			alerta('El campo <b>Direccion</b> es requerido','warning');
			return;
		}else if(id_empresa_edit == null || id_empresa_edit == 0 || id_empresa_edit.length == 0 ){
			alerta('No fue posible identificar la empresa a editar','error');
			return;
		}
	}

	NProgress.start();	

	$.ajax({                                                                             
		type: 'POST',                                                                              
		url:  get_base_url()+'/empresa/editarEmpresa',										
		data: $("#fmrEditarEmpresa").serialize(),      
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
					window.location.href = get_base_url() + 'empresa';
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

function cargarLogoEmpresa(input){
	
	NProgress.start();
	
    var formData = new FormData();
    var files = $('#file')[0].files[0];

    formData.append('file',files);
	formData.append('id_empresa',$('#id_empresa_edit').val());

	if(validar_file(input,2097152,'Archivo demasiado grande. El peso del archivo debe ser menor a 2MB.','file')){
		NProgress.done();
		return ;
	}

	$.ajax({    
        type: 'post',                                                                               
        url:  get_base_url()+'Empresa/cargarLogoEmpresa',												
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
				dataResponse.message = 'Se presento un error no controlado, intenete nuevamente y si el problema persiste contacte a soporte';
            }

            if(!dataResponse.status){     
				limpiar_file('file');
				alerta(dataResponse.message);
				return;
            }

			editarEmpresa(dataResponse.message);

        },
		error: function(){
			NProgress.done();
			limpiar_file('file');
            alerta('Se presento un error al intentar cargar el logo, por favor recargue la pagina he intente nuevamente.');
			return;
        }
    });
   

}

