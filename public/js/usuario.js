function CambiarEstadoUsuario(id_usuario,id_estado){
    
    NProgress.start();
    var formData = new FormData();
	formData.append('id_usuario',id_usuario);
    formData.append('id_estado',id_estado);

	$.ajax({    
        type: 'post',                                                                               
        url:  get_base_url()+'Usuario/CambiarEstadoUsuario',												
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
				dataResponse.message = 'No se pudo actulizar el estado. Recargue la pagina he intene nuevamente';
            }

            if(!dataResponse.status){   			
				alerta(dataResponse.message);
                NProgress.done();
                return;
            }

            if(id_estado == "1"){
                $(".text-estado-"+id_usuario).removeClass('red-text');
                $(".text-estado-"+id_usuario).removeClass('blue-text');
                $(".text-estado-"+id_usuario).addClass('green-text');
                $(".text-estado-"+id_usuario).empty();
                $(".text-estado-"+id_usuario).append('<b>Activo</b>');
            }else if(id_estado == "6"){
                $(".text-estado-"+id_usuario).removeClass('red-text');
                $(".text-estado-"+id_usuario).removeClass('green-text');
                $(".text-estado-"+id_usuario).addClass('blue-text');
                $(".text-estado-"+id_usuario).empty();
                $(".text-estado-"+id_usuario).append('<b>En Proceso</b>');
            }else{
                $(".text-estado-"+id_usuario).removeClass('blue-text');
                $(".text-estado-"+id_usuario).removeClass('green-text');
                $(".text-estado-"+id_usuario).addClass('red-text');
                $(".text-estado-"+id_usuario).empty();
                $(".text-estado-"+id_usuario).append('<b>Bloqueados</b>');
            }

            alerta(dataResponse.message,'success');
            NProgress.done();
            return;

        },
		error: function(){
            NProgress.done();
            alerta('No se pudo actulizar el estado. Recargue la pagina he intene nuevamente');
			return;
        }
    });

}

function abrirEditarUsuario(id) {
    let modal = document.querySelector('#md-edit-user')
    let labels = [...document.querySelectorAll('label')]
    labels.map(label => label.classList.add('active'))
    let instance = M.Modal.getInstance(modal)
    instance.open()
    poblarModalEdicionUsuario(id)
}

function poblarModalEdicionUsuario(id) {

    NProgress.start();
    $.ajax({
        url:  get_base_url()+'/Usuario/GetUserData',
        type: 'POST',
        data: {id_usuario: id},
        success: function(response) {

            NProgress.done();

            let dataResponse = JSON.parse(response)

            var data = dataResponse.message;

            console.log(data[0]);

            $('#edit_nombre').val(data[0].nombre);
            $('#edit_apellido').val(data[0].apellido);
            $('#edit_correo').val(data[0].email);
            $('#edit_celular').val(data[0].telefono_fijo);

            if(data[0].departamento_id != null){
                $('#edit_departamento_destinatario').val(data[0].departamento_id);  
                municipiosDepartamento(data[0].departamento_id,'municipio_user_edit',data[0].municipio_id,'id_municipio');     
            }

            $('#edit_direccion').val(data[0].direccion);
            $('#edit_tipo_cuenta').val(data[0].tipo_cuenta);
            $('#edit_numero_cuenta').val(data[0].numero_cuenta_banco);
            $('#edit_banco').val(data[0].banco);
            $('#edit_numero_documento').val(data[0].numero_documento);
            $('#id_usuario').val(data[0].id_usuario);     
            $('select').formSelect();
            
        } ,
        error: function(){
            NProgress.done();
            alerta('No se pudo actualizar el modal. Recargue la pagina e intente nuevamente');
            return;
        }
    }); 
}

function actualizarUsuario() {

    var municipio = $("#municipio_user_edit").val();
    var edit_banco = $("#edit_banco").val();

    if(municipio === null){
        alerta('Debe seleccionar una municipio');
        return;
    }

    if(edit_banco === null){
        alerta('Debe seleccionar un banco');
        return;
    }

    NProgress.start();

    $.ajax({                                                                      
		type: 'POST',                                                                              
		url:  get_base_url()+'/Usuario/UpdateUsuario',										
		data: $("#fmedicionuser").serialize(),      
		success: function(response){ 

            try{
				var dataResponse = jQuery.parseJSON(response);
			}catch(e){
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Error al intentar actulizar el usuario';
			}

            if(!dataResponse.status){
				alerta(dataResponse.message);
				NProgress.done();
				return;
			}

            NProgress.done();
			alerta(dataResponse.message,'success');
		},
		error: function(){
            NProgress.done();
            alerta('Se presento un error al intentar editar el usuario');
			return;
        }                                                                                           
	});
}

function actualizarClave(){

    var id_usuario  = $("#user_id").val();
    var clave_1     = $("#clave_1").val();
    var clave_2     = $("#clave_2").val();

    if(clave_1.length < 8){
        alerta('La contraseña debe tener minimo 8 caracteres');
        $("#clave_1").val('');
        $("#clave_2").val('');
        return;
    }

    if(clave_1 != clave_2){
        alerta('Las contraseñas no coinciden');
        $("#clave_1").val('');
        $("#clave_2").val('');
        return;
    }

    $.ajax({                                                                             
		type: 'POST',                                                                              
		url:  get_base_url()+'/Usuario/actualizarClave',										
		data: {id_usuario:id_usuario,clave_1:clave_1,clave_2:clave_2},      
		success: function(response){
			
            try{
				var dataResponse = jQuery.parseJSON(response);
			}catch(e){
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Error al intentar actulizar la contraseña';
			}

            if(!dataResponse.status){
				alerta(dataResponse.message);
				NProgress.done();
				return;
			}

            NProgress.done();
			alerta(dataResponse.message,'success');
            $("#clave_1").val('');
            $("#clave_2").val('');

		},
		error: function(){
            NProgress.done();
            alerta('Se presento un error al intentar editar la contraseña');
			return;
        }                                                                                           
	});

}