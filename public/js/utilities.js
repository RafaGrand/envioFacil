function get_base_url(){

    var prot = window.location.protocol; 
	var host = window.location.host;
	var url_base = prot+'//'+host+'/plataforma/';
    return url_base;
}

function toast(message,icono,showCancelButton = false ,showConfirmButton = false, position = 'bottom-right'){

    Swal.fire({
        toast: true,
        position: position,
        html: '<p style="font-size:18px">'+message+'</p>',
        icon: icono,
        showCancelButton: showCancelButton,// true o false
        showConfirmButton: showConfirmButton,// true o false
        timer: 5000,
        timerProgressBar: true,
        width: 400
      });
}

function alerta(message,icon ='error'){

    if(icon == 'error'){
        Swal.fire({
            icon: 'error',
            html: '<p style="font-size:18px">'+message+'</p>',
            confirmButtonColor: '#3085d6',
            confirmButtonText: '<span style="font-size:16px">Aceptar</span>',
        });
    }else if(icon == 'warning'){
        Swal.fire({
            icon: 'warning',
            html: '<p style="font-size:18px">'+message+'</p>',
            confirmButtonColor: '#3085d6',
            confirmButtonText: '<span style="font-size:16px">Aceptar</span>',
        });
    }else if(icon == 'success'){
        Swal.fire({
            icon: 'success',
            html: '<p style="font-size:18px">'+message+'</p>',
            confirmButtonColor: '#3085d6',
            confirmButtonText: '<span style="font-size:16px">Aceptar</span>',
        });
    }else if(icon == 'info'){
        Swal.fire({
            icon: 'info',
            html: '<p style="font-size:18px">'+message+'</p>',
            confirmButtonColor: '#3085d6',
            confirmButtonText: '<span style="font-size:16px">Aceptar</span>',
        });
    }
}

function cargarModulo(modulo= 'inicio'){
    // siempre apunta al controlador, la idea es que cada controlador sea un modulo y que la funcion index llame la vista que se quiere cargar y que representa ese modulo 
    $(".container-modulo").addClass('hide');
    $(".loader-cambio-pestaña").removeClass('hide');
    window.location.href = get_base_url()+modulo;
}

function cargarSelect(valor_filtro,tabla,value,display,elemento_select,selected = false){

    $.ajax({    
        type: 'GET',                                                                               
        url:  get_base_url()+'Generales/cargarSelect',												
        data: 'valor_filtro='+valor_filtro+'&tabla='+tabla+'&value='+value+'&display='+display,                 
        success: function(response)                                                            
        { 
            try{
                var dataResponse = jQuery.parseJSON(response);
            }catch(e){
                dataResponse.status = false;
            }

            if(dataResponse.status){
                
                $('.'+elemento_select).empty();

                html = '<option value="" selected disabled>- Seleccione -</option>';
                dataResponse.data.forEach(function(data){
                    if(data.value == selected){
                        html +="<option value='"+data.value+"' selected>"+data.display+"</option>";
                    }else{
                        html +="<option value='"+data.value+"'>"+data.display+"</option>";
                    }
                });

                $('.'+elemento_select).append(html);
                $('.'+elemento_select).formSelect();
            
            }
            else{
                $('.'+elemento_select).empty();
                html='<option value="0">-No hay elementos-</option>';
                $('.'+elemento_select).append(html);
                $('.'+elemento_select).formSelect();
            }
        },
		error: function(){
            $('.'+elemento_select).empty();
            html='<option value="0">- No hay elementos (-403) -</option>';
            $('.'+elemento_select).append(html);
            $('.'+elemento_select).formSelect();
        }
    });
}

function validar_file (argument,peso,mensaje = '',input = 'archivo') {//se agreaga un nuevo parametro para saber el ID del input 

    var file       = argument.files[0];

    var kilobyte   = 1024;
    var peso_maxio = parseInt(peso)/kilobyte;

    if (file && parseInt(file.size) > peso) {
        alerta(mensaje === '' ?'El peso del archivo debe ser inferior a '+ peso_maxio+' KB':mensaje);
        limpiar_file(input);
        return true;
    }

    return false;
} 

function limpiar_file(input) {
    var input = $("#"+input);
    input.replaceWith(input.val('').clone(true));
}


function cambiarEstadoElemento(id_tabla,tabla,estado,campo,item_hide = '', reload=true, modulo = 'inicio') {

    Swal.fire({
		//icon: 'question',
		imageUrl: get_base_url()+'public/imagenes/alertas/pregunta.gif',
		imageWidth: 150,
		imageHeight: 150,
		imageAlt: 'loading icon',
		title: 'Esta apunto de cambiar el estado de un elemento',
		html: '¿Desea continuar?',
		backdrop: 'swal2-backdrop-show',
		allowOutsideClick: false,
		allowEscapeKey: false,
		position: 'center',
		showConfirmButton: true,
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		confirmButtonText: '<span style="font-size:16px"><strong>Si</strong></span>',
		cancelButtonText: '<span style="font-size:16px"><strong>Cancelar</strong></span>',
		width: 500
	}).then((result) => {
		if (result.isConfirmed) {

            NProgress.start();
            var formData = new FormData();
            formData.append('tabla',tabla);
            formData.append('valor',estado);
            formData.append('campo',campo);
            formData.append('id_tabla',id_tabla);

            $.ajax({    
                type: 'POST',                                                                               
                url:  get_base_url()+'generales/cambiarEstadoElemento',												
                data: formData,
                contentType: false,
                processData: false,  
                success: function(response)                                                            
                { 	

                    try {
                        var dataResponse = jQuery.parseJSON(response);
                    } catch (e) {
                        NProgress.done();
                        var dataResponse = new Object();
                        dataResponse.status = false;
                        dataResponse.message = 'Se presento un error al intentar actualizar el elemento';
                    }

                    if (!dataResponse.status) {
                        NProgress.done();
                        alerta(dataResponse.message);
                        return;
                    }

                    NProgress.done();

                    if(reload){
                        Swal.fire({
                            //icon: 'question',
                            imageUrl: get_base_url()+'public/imagenes/alertas/check.gif',
                            imageWidth: 150,
                            imageHeight: 150,
                            html: '<p style="font-size:18px">'+dataResponse.message+'</p>',
                            backdrop: 'swal2-backdrop-show',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            position: 'center',
                            showConfirmButton: true,
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: '<span style="font-size:16px"><strong>Aceptar</strong></span>'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = get_base_url()+modulo;
                            }
                        });
                    }else{
                        alerta(dataResponse.message,'success');
                        $("."+item_hide).addClass('hide');
                    }
                },
                error: function(){
                    NProgress.done();
                    alerta('Se presento un error al intentar editar el elemento');
                    return;
                }
            });
			
		}
	});
}

function formatoNumero(id,decimales){
    var decimal = 2;
    
    if (decimales!=null) {
        decimal=decimales;
    }

    //$('#'+id).number( true, decimal,',','.' );
}
