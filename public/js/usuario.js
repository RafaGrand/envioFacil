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
            let userData = dataResponse.message
            let campoNombre = document.querySelector('#edit_nombre')
            let campoApellido = document.querySelector('#edit_apellido')
            let campoMail = document.querySelector('#edit_correo')
            let campoCel = document.querySelector('#edit_celular')
            let campoDir = document.querySelector('#edit_direccion')
            let campoId = document.querySelector('#user_id')

            campoNombre.value = userData[0].nombre
            campoApellido.value = userData[0].apellido
            campoMail.value = userData[0].email
            campoCel.value = userData[0].celular
            campoDir.value = userData[0].direccion
            campoId.value = id

        } ,
        error: function(){
            NProgress.done();
            alerta('No se pudo actualizar el modal. Recargue la pagina e intente nuevamente');
            return;
        }
    }); 
}

function actualizarUsuario(form) {
    NProgress.start();

    $.ajax({                                                                             
		type: 'POST',                                                                              
		url:  get_base_url()+'/Usuario/UpdateUsuario',										
		data: $("#fmedicionuser").serialize(),      
		success: function(response)                                                            
		{ 
			NProgress.done();
            let dataResponse = JSON.parse(response)
			alerta(JSON.stringify(dataResponse.message),'success');
		},
		error: function(){
            NProgress.done();
            alerta('Se presento un error al intentar editar el usuario');
			return;
        }                                                                                           
	});
}