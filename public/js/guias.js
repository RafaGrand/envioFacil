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