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