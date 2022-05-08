function  seleccionarDeseleccionarCheck(){
    if( $('.check_todos').is(':checked') ) {
        $(".checkDP").prop("checked",true);
    }else{
        $(".checkDP").prop("checked",false);
    }
}

function detectarCheckSeleccionado(){
    if($(".checkDP").length == $(".checkDP:checked").length){
        $(".check_todos").prop("checked", true);
    }else{
        $(".check_todos").prop("checked", false);
    }
}

function generarDespachoGuias(){
    
    NProgress.start();

    $.ajax({                                                                             
		type: 'POST',                                                                              
		url:  get_base_url()+'/pedidos/generarDespachoGuias',										
		data: $("#fmrGuiasDespacho").serialize(),      
		success: function(response)                                                            
		{   
            NProgress.done();

			try{
				var dataResponse = jQuery.parseJSON(response);
			}catch(e){
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar generar el despacho';
			}

			if(!dataResponse.status){
				alerta(dataResponse.message);
				return;
			}

			Swal.fire({
				icon: 'success',
				title: 'Pedido Registrado de forma correcta',
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
            alerta('Se presento un error al intentar generar el despacho');
			return;
        }                                                                                           
	});

}