function crearEntidad() {

	NProgress.start();

	$.ajax({
		type: 'POST',//define el protocolo por el que van a viajar los datos                                                                           
		url: get_base_url() + 'ajuste/crearEntidad',//el destino donde van a ir los datos 										
		data: $("#fmrcrearentidad").serialize(), //la informacion que estoy llevando     
		success: function (response) {

			NProgress.done();

			try {
				var dataResponse = jQuery.parseJSON(response);

			} catch (e) {
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar crear el elemento';
			}

			console.log('data respon', dataResponse);

			if (!dataResponse.status) {
				alerta(dataResponse.message);
				return;
			}
			$('#modal_crear_entidad').modal('close', true);
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
					window.location.href = get_base_url() + 'ajuste';
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

function crearCargo() {

	NProgress.start();

	$.ajax({
		type: 'POST',//define el protocolo por el que van a viajar los datos                                                                           
		url: get_base_url() + 'ajuste/crearCargo',//el destino donde van a ir los datos 										
		data: $("#fmrcrearcargo").serialize(), //la informacion que estoy llevando     
		success: function (response) {

			NProgress.done();

			try {
				var dataResponse = jQuery.parseJSON(response);

			} catch (e) {
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar crear el elemento';
			}

			if (!dataResponse.status) {
				alerta(dataResponse.message);
				return;
			}
			$('#modal_crear_cargo').modal('close', true);
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
					window.location.href = get_base_url() + 'ajuste';
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

function crearArea() {

	NProgress.start();

	$.ajax({
		type: 'POST',//define el protocolo por el que van a viajar los datos                                                                           
		url: get_base_url() + 'ajuste/crearArea',//el destino donde van a ir los datos 										
		data: $("#fmrcreararea").serialize(), //la informacion que estoy llevando     
		success: function (response) {
			NProgress.done();

			console.log(response);


			try {
				var dataResponse = jQuery.parseJSON(response);
			} catch (e) {
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar crear el elemento';
			}

			if (!dataResponse.status) {
				alerta(dataResponse.message);
				return;
			}
			$('#modal_crear_area').modal('close', true);
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
					window.location.href = get_base_url() + 'ajuste';
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

function crearCosto() {

	NProgress.start();

	$.ajax({
		type: 'POST',
		url: get_base_url() + 'ajuste/crearCosto',
		data: $("#fmrcrearcosto").serialize(),
		success: function (response) {
			NProgress.done();

			try {
				var dataResponse = jQuery.parseJSON(response);
			} catch (e) {
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar crear el elemento';
			}

			if (!dataResponse.status) {
				alerta(dataResponse.message);
				return;
			}
			$('#modal_crear_costo').modal('close', true);
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
					window.location.href = get_base_url() + 'ajuste';
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

function crearContable() {

	NProgress.start();

	$.ajax({
		type: 'POST',
		url: get_base_url() + 'ajuste/crearContable',
		data: $("#fmrcrearcontable").serialize(),
		success: function (response) {
			NProgress.done();

			try {
				var dataResponse = jQuery.parseJSON(response);
			} catch (e) {
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar crear el elemento';
			}

			if (!dataResponse.status) {
				alerta(dataResponse.message);
				return;
			}
			$('#modal_crear_contable').modal('close', true);
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
					window.location.href = get_base_url() + 'ajuste';
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

function crearNovedad(){

	NProgress.start();

	$.ajax({
		type: 'POST',                                                                        
		url: get_base_url() + 'ajuste/crearNovedad',			
		data: $("#fmrcrearnovedad").serialize(),   
		success: function (response) {

			NProgress.done();

			try {
				var dataResponse = jQuery.parseJSON(response);

			} catch (e) {
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar crear el elemento';
			}

			console.log('data respon', dataResponse);

			if (!dataResponse.status) {
				alerta(dataResponse.message);
				return;
			}
			$('#modal_crear_novedad').modal('close', true);
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
					window.location.href = get_base_url() + 'ajuste';
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

function crearConceptoPago() {

	NProgress.start();
	$.ajax({
		type: 'POST',//define el protocolo por el que van a viajar los datos                                                                           
		url: get_base_url() + 'ajuste/crearConceptoPago',//el destino donde van a ir los datos 										
		data: $("#fmrconceptopago").serialize(), //la informacion que estoy llevando     
		success: function (response) {

			NProgress.done();

			try {
				var dataResponse = jQuery.parseJSON(response);

			} catch (e) {
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar crear el elemento';
			}

			if (!dataResponse.status) {
				alerta(dataResponse.message);
				return;
			}
			$('#modal_concepto_pago').modal('close', true);
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
					window.location.href = get_base_url() + 'ajuste';
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

function editarCargo(id_cargo) {

	NProgress.start();

	var formData = new FormData();
	formData.append('cargo', $("#ed_nombre_cargo_" + id_cargo).val());
	formData.append('id_cargo', id_cargo);

	$.ajax({
		type: 'POST',
		url: get_base_url() + 'ajuste/editarCargo',
		data: formData,
		contentType: false,
		processData: false,
		success: function (response) {

			try {
				var dataResponse = jQuery.parseJSON(response);
			} catch (e) {
				NProgress.done();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar actualizar el elemento';
			}

			if (!dataResponse.status) {
				NProgress.done();
				alerta(dataResponse.message);
				return;
			}

			NProgress.done();
			alerta(dataResponse.message, 'success');
		},

		error: function () {
			NProgress.done();
			alerta('Se presento un error al intentar editar el elemento');
			return;
		}
	});

}

function editarArea(id_area) {

	NProgress.start();
	var formData = new FormData();
	formData.append('area', $("#ed_nombre_area_" + id_area).val());
	formData.append('id_area', id_area);

	$.ajax({
		type: 'POST',
		url: get_base_url() + 'ajuste/editarArea',
		data: formData,
		contentType: false,
		processData: false,
		success: function (response) {

			try {
				var dataResponse = jQuery.parseJSON(response);
			} catch (e) {
				NProgress.done();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar actualizar el elemento';
			}

			if (!dataResponse.status) {
				NProgress.done();
				alerta(dataResponse.message);
				return;
			}

			NProgress.done();
			alerta(dataResponse.message, 'success');

		},
		error: function () {
			NProgress.done();
			alerta('Se presento un error al intentar editar el elemento');
			return;
		}
	});

}

function editarCosto(id_centro_costo) {

	NProgress.start();
	var formData = new FormData();
	formData.append('codigo', $("#ed_codigo_costo_" + id_centro_costo).val());
	formData.append('nombre', $("#ed_nombre_costo_" + id_centro_costo).val());
	formData.append('ubicacion', $("#ed_ubicacion_costo_" + id_centro_costo).val());
	formData.append('id_centro_costo', id_centro_costo);

	$.ajax({
		type: 'POST',
		url: get_base_url() + 'ajuste/editarCosto',
		data: formData,
		contentType: false,
		processData: false,
		success: function (response) {

			try {
				var dataResponse = jQuery.parseJSON(response);
			} catch (e) {
				NProgress.done();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar actualizar el elemento';
			}

			if (!dataResponse.status) {
				NProgress.done();
				alerta(dataResponse.message);
				return;
			}

			NProgress.done();
			alerta(dataResponse.message, 'success');

		},
		error: function () {
			NProgress.done();
			alerta('Se presento un error al intentar editar el elemento');
			return;
		}
	});

}

function editarContable(id_grupo_contable) {

	NProgress.start();
	var formData = new FormData();
	formData.append('codigo', $("#ed_codigo_contable_" + id_grupo_contable).val());
	formData.append('nombre', $("#ed_nombre_contable_" + id_grupo_contable).val());
	formData.append('id_grupo_contable', id_grupo_contable);

	$.ajax({
		type: 'POST',
		url: get_base_url() + 'ajuste/editarContable',
		data: formData,
		contentType: false,
		processData: false,
		success: function (response) {

			try {
				var dataResponse = jQuery.parseJSON(response);
			} catch (e) {
				NProgress.done();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar actualizar el elemento';
			}

			if (!dataResponse.status) {
				NProgress.done();
				alerta(dataResponse.message);
				return;
			}

			NProgress.done();
			alerta(dataResponse.message, 'success');

		},
		error: function () {
			NProgress.done();
			alerta('Se presento un error al intentar editar el elemento');
			return;
		}
	});

}

function editarEntidad() {

	NProgress.start();

	$.ajax({
		type: 'POST',
		url: get_base_url() + 'ajuste/editarEntidad',
		data:$("#fmreditarentidad").serialize(), 
		success: function (response) {


			try {
				var dataResponse = jQuery.parseJSON(response);
			} catch (e) {
				NProgress.done();				
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar actualizar el elemento';
			}

			if (!dataResponse.status) {
				NProgress.done();
				alerta(dataResponse.message);
				return;
			}

			NProgress.done();		
			Swal.fire({
				imageUrl: get_base_url()+'public/imagenes/alertas/check.gif',
				imageWidth: 150,
				imageHeight: 150,
				title:  '<h5>Operacion realizada con exito</h5>',      	
				html: '<h6>'+dataResponse.message+'</h6>',
				backdrop: 'swal2-backdrop-show',
				allowOutsideClick: false,
				allowEscapeKey: false,
				position: 'center',
				showConfirmButton: true,
				showCancelButton: false,
				confirmButtonColor: '#005EB8',
				confirmButtonText: '<span style="font-size:16px"><strong>Aceptar</strong></span>',
				width: 400
			}).then((result) => {
				if (result.isConfirmed) {
					$('#modal_editar_entidad').modal('close', true);
				}
			});
		},
		error: function () {
			NProgress.done();
			alerta('Se presento un error al intentar editar el elemento');
			return;
		}
	});
}

function editarConceptoPago(){

	NProgress.start();

	$.ajax({
		type: 'POST',
		url: get_base_url() + 'ajuste/editarConceptoPago',
		data:$("#fmreditarconcepto").serialize(), 
		success: function (response) {


			try {
				var dataResponse = jQuery.parseJSON(response);
			} catch (e) {
				NProgress.done();				
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar actualizar el elemento';
			}

			if (!dataResponse.status) {
				NProgress.done();
				alerta(dataResponse.message);
				return;
			}

			NProgress.done();		
			Swal.fire({
				imageUrl: get_base_url()+'public/imagenes/alertas/check.gif',
				imageWidth: 150,
				imageHeight: 150,
				title:  '<h5>Operacion realizada con exito</h5>',      	
				html: '<h6>'+dataResponse.message+'</h6>',
				backdrop: 'swal2-backdrop-show',
				allowOutsideClick: false,
				allowEscapeKey: false,
				position: 'center',
				showConfirmButton: true,
				showCancelButton: false,
				confirmButtonColor: '#005EB8',
				confirmButtonText: '<span style="font-size:16px"><strong>Aceptar</strong></span>',
				width: 400
			}).then((result) => {
				if (result.isConfirmed) {
					$('#modal_editar_concepto_pago').modal('close', true);
				}
			});
		},
		error: function () {
			NProgress.done();
			alerta('Se presento un error al intentar editar el elemento');
			return;
		}
	});
}

function editarNovedad(){

	NProgress.start();

	$.ajax({
		type: 'POST',
		url: get_base_url() + 'ajuste/editarNovedad',
		data:$("#fmreditarnovedad").serialize(), 
		success: function (response) {


			try {
				var dataResponse = jQuery.parseJSON(response);
			} catch (e) {
				NProgress.done();				
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar actualizar el elemento';
			}

			if (!dataResponse.status) {
				NProgress.done();
				alerta(dataResponse.message);
				return;
			}

			NProgress.done();		
			Swal.fire({
				imageUrl: get_base_url()+'public/imagenes/alertas/check.gif',
				imageWidth: 150,
				imageHeight: 150,
				title:  '<h5>Operacion realizada con exito</h5>',      	
				html: '<h6>'+dataResponse.message+'</h6>',
				backdrop: 'swal2-backdrop-show',
				allowOutsideClick: false,
				allowEscapeKey: false,
				position: 'center',
				showConfirmButton: true,
				showCancelButton: false,
				confirmButtonColor: '#005EB8',
				confirmButtonText: '<span style="font-size:16px"><strong>Aceptar</strong></span>',
				width: 400
			}).then((result) => {
				if (result.isConfirmed) {
					$('#modal_editar_novedad').modal('close', true);
				}
			});
		},
		error: function () {
			NProgress.done();
			alerta('Se presento un error al intentar editar el elemento');
			return;
		}
	});

}

function getDataContable() {

	$.ajax({
		type: 'POST',
		url: get_base_url() + 'ajuste/getDataContable',
		data: null,
		success: function (response) {

			try {
				var dataResponse = jQuery.parseJSON(response);
			} catch (e) {
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error no controlado, intenete nuevamente y si el problema persiste contacte a soporte';
				$("#modal_editar_contable").modal('close', true);
			}

			if (!dataResponse.status) {
				alerta(dataResponse.message);
				$("#modal_editar_contable").modal('close', true);
				return;
			}

			console.log(response);

			$(".tabla-edit-contable").empty();
			var data = dataResponse.data;
			var html = '';
			if (data.length > 0) {
				for (i = 0; i < data.length; i++) {

					html += '<tr class="fila-contable-edit-' + data[i].id_grupo_contable + '">' +
						'<td>' +
						'<P>' +data[i].codigo + '</P>' +
						'</td>' +
						'<td>' +
						'<input style="text-align:center;border:0;"  id="ed_nombre_contable_' + data[i].id_grupo_contable + '" name="ed_nombre_contable_' + data[i].id_grupo_contable + '" value="' + data[i].nombre + '" type="text" class="validate" placeholder="Nombre grupo contable">' +
						'</td>' +
						'<td>' +
						'<P>' + data[i].fecha_creacion + '</P>' +
						'</td>' +
						'<td><a class="btn-floating waves-effect waves-light btn-small orange" onclick="editarContable(' + data[i].id_grupo_contable + ')"><i class="material-icons left">create</i></a></td>' +
						'<td><a class="btn-floating waves-effect waves-light btn-small red" onclick="cambiarEstadoElemento(' + data[i].id_grupo_contable + ',' +
						"'grupo_contable',5,'id_grupo_contable','fila-contable-edit-" + data[i].id_grupo_contable + "',false,'ajuste')" +
						'"><i class="material-icons left">remove</i></a></td>' +
						'</tr>';
				}
			} else {
				html = '' +
					'<tr class="grey-text">' +
					'<td class="center-align" Colspan="4"><h5>La empresa actual no tiene grupos contables creados</h5><br>Para continuar presione el boton crear area</td>' +
					'</tr>';
			}

			$(".tabla-edit-contable").append(html);
		},
		error: function () {
			alerta('Se presento un error al intentar cargar la información, por favor recargue la pagina he intente nuevamente.');
			return;
		}
	});
}

function getDataCosto() {

	$.ajax({
		type: 'POST',
		url: get_base_url() + 'ajuste/getDataCosto',
		data: null,
		success: function (response) {

			try {
				var dataResponse = jQuery.parseJSON(response);
			} catch (e) {
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error no controlado, intenete nuevamente y si el problema persiste contacte a soporte';
				$("#modal_editar_costo").modal('close', true);
			}

			if (!dataResponse.status) {
				alerta(dataResponse.message);
				$("#modal_editar_costo").modal('close', true);
				return;
			}

			$(".tabla-edit-costo").empty();
			var data = dataResponse.data;
			var html = '';
			if (data.length > 0) {
				for (i = 0; i < data.length; i++) {

					html += '<tr class="fila-costo-edit-' + data[i].id_centro_costo + '">' +
						'<td>' +
						'<P>' +data[i].codigo + '</P>' +
						'</td>' +
						'<td>' +
						'<input style="text-align:center; border:0;"  id="ed_nombre_costo_' + data[i].id_centro_costo + '" name="ed_nombre_costo_' + data[i].id_centro_costo + '" value="' + data[i].nombre + '" type="text" class="validate" placeholder="Nombre centro costo" >' +
						'</td>' +
						'<td>' +
						'<input style="text-align:center; border:0;"  id="ed_ubicacion_costo_' + data[i].id_centro_costo + '" name="ed_ubicacion_costo_' + data[i].id_centro_costo + '" value="' + data[i].ubicacion + '" type="text" class="validate" placeholder="Ubicacion costo" >' +
						'</td>' +
						'<td>' +
						'<P>' + data[i].fecha_creacion + '</P>' +
						'</td>' +
						'<td><a class="btn-floating waves-effect waves-light btn-small orange" onclick="editarCosto(' + data[i].id_centro_costo + ')"><i class="material-icons left">create</i></a></td>' +
						'<td><a class="btn-floating waves-effect waves-light btn-small red" onclick="cambiarEstadoElemento(' + data[i].id_centro_costo + ',' +
						"'centro_costo',5,'id_centro_costo','fila-costo-edit-" + data[i].id_centro_costo + "',false,'ajuste')" +
						'"><i class="material-icons left">remove</i></a></td>' +
						'</tr>';
				}
			} else {
				html = '' +
					'<tr class="grey-text">' +
					'<td class="center-align" Colspan="4"><h5>La empresa actual no tiene centro de costos creados</h5><br>Para continuar presione el boton crear costo</td>' +
					'</tr>';
			}

			$(".tabla-edit-costo").append(html);
		},
		error: function () {
			alerta('Se presento un error al intentar cargar la información, por favor recargue la pagina he intente nuevamente.');
			return;
		}
	});


}

function getDataArea() {

	$.ajax({
		type: 'POST',
		url: get_base_url() + 'ajuste/getDataArea',
		data: null,
		success: function (response) {

			try {
				var dataResponse = jQuery.parseJSON(response);
			} catch (e) {
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error no controlado, intenete nuevamente y si el problema persiste contacte a soporte';
				$("#modal_editar_area").modal('close', true);
			}

			if (!dataResponse.status) {
				alerta(dataResponse.message);
				$("#modal_editar_area").modal('close', true);
				return;
			}

			$(".tabla-edit-area").empty();
			var data = dataResponse.data;
			var html = '';
			if (data.length > 0) {
				for (i = 0; i < data.length; i++) {

					html += '<tr class="fila-area-edit-' + data[i].id_area + '">' +
						'<td>' +
						'<input style=" text-align:center; border:0;" id="ed_nombre_area_' + data[i].id_area + '" name="ed_nombre_area_' + data[i].id_area + '" value="' + data[i].area + '" type="text" class="validate" placeholder="Nombre del Area">' +
						'</td>' +
						'<td>' +
						'<P>' + data[i].fecha_creacion + '</P>' +
						'</td>' +
						'<td><a class="btn-floating waves-effect waves-light btn-small orange" onclick="editarArea(' + data[i].id_area + ')"><i class="material-icons left">create</i></a></td>' +
						'<td><a class="btn-floating waves-effect waves-light btn-small red" onclick="cambiarEstadoElemento(' + data[i].id_area + ',' +
						"'area',5,'id_area','fila-area-edit-" + data[i].id_area + "',false,'ajuste')" +
						'"><i class="material-icons left">remove</i></a></td>' +
						'</tr>';
				}
			} else {
				html = '' +
					'<tr class="grey-text">' +
					'<td class="center-align" Colspan="4"><h5>La empresa actual no tiene areas creadas</h5><br>Para continuar presione el boton crear area</td>' +
					'</tr>';
			}

			$(".tabla-edit-area").append(html);
		},
		error: function () {
			alerta('Se presento un error al intentar cargar la información, por favor recargue la pagina he intente nuevamente.');
			return;
		}
	});
}

function getDataCargo() {

	$.ajax({
		type: 'POST',
		url: get_base_url() + 'ajuste/getDataCargo',
		data: null,
		success: function (response) {

			try {
				var dataResponse = jQuery.parseJSON(response);
			} catch (e) {
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error no controlado, intenete nuevamente y si el problema persiste contacte a soporte';
				$("#modal_editar_cargo").modal('close', true);
			}

			if (!dataResponse.status) {
				alerta(dataResponse.message);
				$("#modal_editar_cargo").modal('close', true);
				return;
			}

			$(".tabla-edit-cargo").empty();
			var data = dataResponse.data;
			var html = '';

			if (data.length > 0) {
				for (i = 0; i < data.length; i++) {

					html += '<tr class="fila-cargo-edit-' + data[i].id_cargo + '">' +
						'<td>' +
						'<input style="text-align:center;border:0;"  id="ed_nombre_cargo_' + data[i].id_cargo + '" name="ed_nombre_cargo_' + data[i].id_cargo + '" value="' + data[i].nombre_cargo + '" type="text" class="validate" placeholder="Nombre del cargo">' +
						'</td>' +
						'<td>' +
						'<P>' + data[i].fecha_creacion + '</P>' +
						'</td>' +
						'<td><a class="btn-floating waves-effect waves-light btn-small orange" onclick="editarCargo(' + data[i].id_cargo + ')"><i class="material-icons left">create</i></a></td>' +
						'<td><a class="btn-floating waves-effect waves-light btn-small red" onclick="cambiarEstadoElemento(' + data[i].id_cargo + ',' +
						"'cargo',5,'id_cargo','fila-cargo-edit-" + data[i].id_cargo + "',false,'ajuste')" +
						'"><i class="material-icons left">remove</i></a></td>' +
						'</tr>';
				}
			} else {
				html = '' +
					'<tr class="grey-text">' +
					'<td class="center-align" Colspan="4"><h5>La empresa actual no tiene cargos creados</h5><br>Para continuar presione el boton crear cargo</td>' +
					'</tr>';
			}

			$(".tabla-edit-cargo").append(html);
		},
		error: function () {
			alerta('Se presento un error al intentar cargar la información, por favor recargue la pagina he intente nuevamente.');
			return;
		}
	});
}

function getDataEntidad() {

	$.ajax({
		type: 'POST',
		url: get_base_url() + 'ajuste/getDataEntidad',
		data: null,
		success: function (response) {


			try {
				var dataResponse = jQuery.parseJSON(response);
			} catch (e) {
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error no controlado, intenete nuevamente y si el problema persiste contacte a soporte';
				$("#tabla_ver_entidad").modal('close', true);
			}

			if (!dataResponse.status) {
				alerta(dataResponse.message);
				$("#tabla_ver_entidad").modal('close', true);
				return;
			}

			$(".tabla-edit-entidad").empty();
			var data = dataResponse.data;
			var html = '';

			if (data.length > 0) {

				for (i = 0; i < data.length; i++) {

					html += '<tr class="fila-entidad-edit-' + data[i].id_entidad + '">' +
						'<td>'+
							'<p>'+data[i].nombre_entidad +'</p>'+
						'</td>'+
						'<td>' +
							'<p>'+data[i].tipo_entidad +'</*p>'+
						'</td>' +
						'<td><a class="btn-floating waves-effect waves-light btn-small orange" onclick="abrirEditarEntidad(' + data[i].id_entidad + ')"><i class="material-icons left">create</i></a></td>' +
						'<td><a class="btn-floating waves-effect waves-light btn-small red" onclick="cambiarEstadoElemento(' + data[i].id_entidad + ',' +
						"'entidad',5,'id_entidad','fila-entidad-edit-" + data[i].id_entidad + "',false,'ajuste')" +
						'"><i class="material-icons left">remove</i></a></td>' +
						'</tr>';
				}

			} else {
				html = '' +
					'<tr class="grey-text">' +
					'<td class="center-align" Colspan="6"><h5>La empresa actual no tiene entidades creadas</h5><br>Para continuar presione el boton crear entidad</td>' +
					'</tr>';
			}

			$(".tabla-edit-entidad").append(html);
		},
		error: function () {
			alerta('Se presento un error al intentar cargar la información, por favor recargue la pagina he intente nuevamente.');
			return;
		}
	});
}

function getDataNovedad(){

	$.ajax({
		type: 'POST',
		url: get_base_url() + 'ajuste/getDataNovedad',
		data: null,
		success: function (response) {


			try {
				var dataResponse = jQuery.parseJSON(response);
			} catch (e) {
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error no controlado, intenete nuevamente y si el problema persiste contacte a soporte';
				$("#tabla_ver_novedad").modal('close', true);
			}

			if (!dataResponse.status) {
				alerta(dataResponse.message);
				$("#tabla_ver_novedad").modal('close', true);
				return;
			}


			$(".tabla-edit-novedad").empty();
			var data = dataResponse.data;
			var html = '';

			if (data.length > 0) {

				for (i = 0; i < data.length; i++) {

					html += '<tr class="fila-novedad-empleado-edit-' + data[i].id_novedad_empleado + '">' +
						'<td style="text-align:center;">'+
							'<p>'+data[i].nombre_novedad +'</p>'+
						'</td>'+
						'<td style="text-align:center;">'+
							'<p>'+data[i].tipo_novedad_empleado +'</p>'+
						'</td>'+
						'<td style="text-align:center;"><a class="btn-floating waves-effect waves-light btn-small orange" onclick="abrirEditarNovedad(' + data[i].id_novedad_empleado + ')"><i class="material-icons left">create</i></a></td>' +
						'<td style="text-align:center;"><a class="btn-floating waves-effect waves-light btn-small red" onclick="cambiarEstadoElemento(' + data[i].id_novedad_empleado + ',' +
						"'novedad_empleado',5,'id_novedad_empleado','fila-novedad-empleado-edit-" + data[i].id_novedad_empleado + "',true,'ajuste')" +
						'"><i class="material-icons left">remove</i></a></td>' +
						'</tr>';
				}

			} else {
				html = '' +
					'<tr class="grey-text">' +
					'<td class="center-align" Colspan="6"><h5>La empresa actual no tiene novedades creadas</h5><br>Para continuar presione el boton crear entidad</td>' +
					'</tr>';
			}

			$(".tabla-edit-novedad").append(html);
		},
		error: function () {
			alerta('Se presento un error al intentar cargar la información, por favor recargue la pagina he intente nuevamente.');
			return;
		}
	});
}

function getDataConseptoPago(){

	$.ajax({
		type: 'POST',
		url: get_base_url() + 'ajuste/getDataConseptoPago',
		data: null,
		success: function (response) {

			try {
				var dataResponse = jQuery.parseJSON(response);
			} catch (e) {
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error no controlado, intenete nuevamente y si el problema persiste contacte a soporte';
				$("#modal_editar_concepto_pago").modal('close', true);
			}

			if (!dataResponse.status) {
				alerta(dataResponse.message);
				$("#modal_editar_concepto_pago").modal('close', true);
				return;
			}

			$(".tabla-edit-concepto-pago").empty();
			var data = dataResponse.data;
			var html = '';

			if (data.length > 0) {
				for (i = 0; i < data.length; i++) {

					html += '<tr class="fila-concepto-pago-edit-' + data[i].id_concepto_pago + '">' +
						'<td>'+
							'<p>'+data[i].codigo +'</p>'+
						'</td>'+
						'<td>'+
							'<p>'+data[i].nombre_concepto +'</p>'+
						'</td>'+
						'<td>'+
							'<p>'+data[i].clase_concepto_pago +'</p>'+
						'</td>'+
						'<td><a class="btn-floating waves-effect waves-light btn-small orange" onclick="abrirEditarConceptoPago(' + data[i].id_concepto_pago + ')"><i class="material-icons left">create</i></a></td>' +
						'<td><a class="btn-floating waves-effect waves-light btn-small red" onclick="cambiarEstadoElemento(' + data[i].id_concepto_pago + ',' +
						"'concepto_pago',5,'id_concepto_pago','fila-concepto-pago-edit-" + data[i].id_concepto_pago + "',false,'ajuste')" +
						'"><i class="material-icons left">remove</i></a></td>' +
						'</tr>';
				}
			} else {
				html = '' +
					'<tr class="grey-text">' +
					'<td class="center-align" Colspan="4"><h5>La empresa actual no tiene conceptos de pago creados</h5><br>Para continuar presione el boton crear concepto pago</td>' +
					'</tr>';
			}

			$(".tabla-edit-concepto-pago").append(html);
		},
		error: function () {
			alerta('Se presento un error al intentar cargar la información, por favor recargue la pagina he intente nuevamente.');
			return;
		}
	});

}

function abrirEditarEntidad(id_entidad) {

	var formData = new FormData();
	formData.append('id_entidad', id_entidad);

	$.ajax({
		type: 'post',
		url: get_base_url() + 'ajuste/getDataEntidadEditar',
		data: formData,
		contentType: false,
		processData: false,
		success: function (response) {

			try {
				var dataResponse = jQuery.parseJSON(response);
			} catch (e) {
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Error al procesar la informacion de la entidad';
			}

			if (!dataResponse.status) {
				alerta(dataResponse.message);
				return;
			}

			var data = dataResponse.data;

			$('#modal_editar_entidad').modal('open', true);
			$('#tabla_ver_entidad').modal('close', true);
			$("#ed_id_entidad").val(data[0].id_entidad);
			$("#ed_codigo_entidad_").val(data[0].codigo);
			$("#ed_nombre_entidad_").val(data[0].nombre_entidad);

			$("#ed_nit_entidad_").val(data[0].nit);
			$("#ed_direccion_entidad_").val(data[0].direccion);

			$("#ed_telefono_entidad_").val(data[0].telefono);
			$("#ed_ministerio_entidad_").val(data[0].codigo_ministerio);

			$("#ed_tipo_entidad_ option[value="+ data[0].tipo_entidad_id +"]").attr("selected",true);
			$('#een_deptartamento option:selected').removeAttr('selected');
			$("#een_deptartamento option[value='"+ data[0].departamento_id +"']").attr("selected",true);	

			cargarSelect(data[0].departamento_id,'municipio','id_municipio','nombre','cargar-municipio-edit-entidad',data[0].municipio_id);
			
			M.updateTextFields();
			$('select').formSelect();


		},
		error: function () {
			alerta('Error al procesar la informacion de la entidad');
			return;
		}
	});

}

function abrirEditarConceptoPago(id_concepto_pago){

	var formData = new FormData();
	formData.append('id_concepto_pago', id_concepto_pago);

	$.ajax({
		type: 'post',
		url: get_base_url() + 'ajuste/abrirEditarConceptoPago',
		data: formData,
		contentType: false,
		processData: false,
		success: function (response) {

			try {
				var dataResponse = jQuery.parseJSON(response);
			} catch (e) {
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Error al procesar la informacion de la entidad';
			}

			if (!dataResponse.status) {
				alerta(dataResponse.message);
				return;
			}

			var data = dataResponse.data;
			
			$('#modal_editar_concepto_pago').modal('open', true);
			$('#tabla_ver_concepto_pago').modal('close', true);
			
			$("#id_concepto_pago").val(data[0].id_concepto_pago);
			$("#ed_tipo option[value="+ data[0].tipo +"]").attr("selected",true);
			$("#ed_maneja_tasa option[value="+ data[0].maneja_tasa +"]").attr("selected",true);
			$("#ed_ibc option[value="+ data[0].ibc +"]").attr("selected",true);
			$("#ed_base_prestaciones option[value="+ data[0].base_prestaciones +"]").attr("selected",true);
			$("#ed_clase_concepto_pago option[value="+ data[0].id_clase_concepto_pago +"]").attr("selected",true);
			$("#ed_se_expresa_en option[value="+ data[0].se_expresa_en +"]").attr("selected",true);
			$("#ed_nombre_concepto").val(data[0].nombre_concepto);			
			$("#ed_tasa").val(data[0].tasa);			
			$("#ed_codigo").val(data[0].codigo);

			$('select').formSelect();
			M.updateTextFields();

		},
		error: function () {
			alerta('Error al procesar la informacion del concepto de pago');
			return;
		}
	});
}

function abrirEditarNovedad(id_novedad_empleado){

		var formData = new FormData();
		formData.append('id_novedad_empleado', id_novedad_empleado);
	
		$.ajax({
			type: 'post',
			url: get_base_url() + 'ajuste/abrirEditarNovedad',
			data: formData,
			contentType: false,
			processData: false,
			success: function (response) {
	
				try {
					var dataResponse = jQuery.parseJSON(response);
				} catch (e) {
					var dataResponse = new Object();
					dataResponse.status = false;
					dataResponse.message = 'Error al procesar la informacion de la entidad';
				}
	
				if (!dataResponse.status) {
					alerta(dataResponse.message);
					return;
				}
	
				var data = dataResponse.data;
				
				$('#modal_editar_novedad').modal('open', true);
				$('#tabla_ver_novedad').modal('close', true);
				$('#fmreditarnovedad')[0].reset();
				$("#id_novedad_empleado").val(data[0].id_novedad_empleado);
				$("#codigo_novedad_editar").val(data[0].codigo);			
				$("#nombre_novedad_editar").val(data[0].nombre_novedad);			
				$("#editar_porcentaje_salario_novedad").val(data[0].porcentaje_pago_salario);
				$("#editar_observacion").val(data[0].observacion);
				
				$('#tipo_novedad_editar option:selected').removeAttr('selected');
				$("#tipo_novedad_editar option[value="+ data[0].id_tipo_novedad_empleado +"]").attr("selected",true);

				$('#editar_descuento_auxilio_tranporte option:selected').removeAttr('selected');
				$("#editar_descuento_auxilio_tranporte option[value="+ data[0].descuenta_aux_trans +"]").attr("selected",true);

				$('#editar_descuento_prestaciones_novedad option:selected').removeAttr('selected');
				$("#editar_descuento_prestaciones_novedad option[value="+ data[0].descuenta_dias_prestacion +"]").attr("selected",true);

				$('#editar_paga_salario_novedad option:selected').removeAttr('selected');
				$("#editar_paga_salario_novedad option[value="+ data[0].pagar_salario +"]").attr("selected",true);

				$('select').formSelect();
				M.updateTextFields();
	
			},
			error: function () {
				alerta('Error al procesar la informacion del concepto de pago');
				return;
			}
		});
}

function editarFactoresPorcentaje(){

	var descuento_salud = $('#descuento_salud').val();
	var descuento_pension = $('#descuento_pension').val();
	var fondo_solidaridad = $('#fondo_solidaridad').val();
	var arl_nivel_1 = $('#arl_nivel_1').val();
	var arl_nivel_2 = $('#arl_nivel_2').val();
	var arl_nivel_3 = $('#arl_nivel_3').val();
	var arl_nivel_4 = $('#arl_nivel_4').val();
	var caja_compensacion = $('#caja_compensacion').val();
	var icbf = $('#icbf').val();
	var sena = $('#sena').val();
	var cesantias = $('#cesantias').val();
	var intereses_cesantias = $('#intereses_cesantias').val();
	var vacaciones = $('#vacaciones').val();
	var prima = $('#prima').val();
	var dotacion = $('#dotacion').val();

	//VALIDACION DE CAMPOS
	{
		if( descuento_salud ===  null || descuento_salud === undefined || descuento_salud ===  '' ) {
			alerta('El campo <b>Descuento Salud</b> es requerido','warning');
			return;
		}else if (descuento_pension ===  null ||  descuento_pension === undefined || descuento_pension === '') {
			alerta('El campo <b>Descuento Pension</b> es requerido','warning');
			return;
		} else if (fondo_solidaridad ===  null ||  fondo_solidaridad === undefined || fondo_solidaridad ===  '') {
			alerta('El campo <b>Fondo Solidaridad</b> es requerido','warning');
			return;
		} else if (arl_nivel_1 ===  null ||  arl_nivel_1 === undefined || arl_nivel_1 ===  '') {
			alerta('El campo <b>ARL Nivel 1</b> es requerido','warning');
			return;
		} else if (arl_nivel_2 ===  null ||  arl_nivel_2 === undefined || arl_nivel_2 ===  '') {
			alerta('El campo <b>ARL Nivel 2</b> es requerido','warning');
			return;
		} else if (arl_nivel_3 ===  null ||  arl_nivel_3 === undefined || arl_nivel_3 ===  '') {
			alerta('El campo <b>PARL Nivel 3</b> es requerido','warning');
			return;
		} else if (arl_nivel_4 ===  null ||  arl_nivel_4 === undefined || arl_nivel_4 ===  '') {
			alerta('El campo <b>ARL Nivel 4</b> es requerido','warning');
			return;
		} else if (caja_compensacion ===  null ||  caja_compensacion === undefined || caja_compensacion ===  '') {
			alerta('El campo <b>Caja Compensacion</b> es requerido','warning');
			return;
		} else if (icbf ===  null ||  icbf === undefined || icbf ===  '') {
			alerta('El campo <b>ICBF</b> es requerido','warning');
			return;
		} else if (sena ===  null ||  sena === undefined || sena ===  '') {
			alerta('El campo <b>Sena</b> es requerido','warning');
			return;
		} else if (cesantias ===  null ||  cesantias === undefined || cesantias ===  '') {
			alerta('El campo <b>Cesantias</b> es requerido','warning');
			return;
		} else if (intereses_cesantias ===  null ||  intereses_cesantias === undefined || intereses_cesantias ===  '') {
			alerta('El campo <b>Intereses Cesantias</b> es requerido','warning');
			return;
		} else if (vacaciones ===  null ||  vacaciones === undefined || vacaciones ===  '') {
			alerta('El campo <b>Vacaciones</b> es requerido','warning');
			return;
		} else if (prima ===  null ||  prima === undefined || prima ===  '') {
			alerta('El campo <b>Prima</b> es requerido','warning');
			return;
		} else if (dotacion ===  null ||  dotacion === undefined || dotacion ===  '') {
			alerta('El campo <b>Dotacion</b> es requerido','warning');
			return;
		} else if ( descuento_salud > 100 || descuento_salud < 0 ) {
			alerta('El valor <b>Descuento Salud</b> No puede ser mayor a 100 o menor a 0','warning');
			return;
		}else if (descuento_pension > 100 ||  descuento_pension < 0 ) {
			alerta('El valor <b>Descuento Pension</b> No puede ser mayor a 100 o menor a 0','warning');
			return;
		} else if (fondo_solidaridad > 100 ||  fondo_solidaridad < 0 ) {
			alerta('El valor <b>Fondo Solidaridad</b> No puede ser mayor a 100 o menor a 0','warning');
			return;
		} else if (arl_nivel_1 > 100 ||  arl_nivel_1 < 0 ) {
			alerta('El valor <b>ARL Nivel 1</b> No puede ser mayor a 100 o menor a 0','warning');
			return;
		} else if (arl_nivel_2 > 100 ||  arl_nivel_2 < 0 ) {
			alerta('El valor <b>ARL Nivel 2</b> No puede ser mayor a 100 o menor a 0','warning');
			return;
		} else if (arl_nivel_3 > 100 ||  arl_nivel_3 < 0 ) {
			alerta('El valor <b>ARL Nivel 3</b> No puede ser mayor a 100 o menor a 0','warning');
			return;
		} else if (arl_nivel_4 > 100 ||  arl_nivel_4 < 0 ) {
			alerta('El valor <b>ARL Nivel 4</b> No puede ser mayor a 100 o menor a 0','warning');
			return;
		} else if (caja_compensacion > 100 ||  caja_compensacion < 0 ) {
			alerta('El valor <b>Caja Compensacion</b> No puede ser mayor a 100 o menor a 0','warning');
			return;
		} else if (icbf > 100 ||  icbf < 0) {
			alerta('El valor <b>ICBF</b> No puede ser mayor a 100 o menor a 0','warning');
			return;
		} else if (sena > 100 ||  sena < 0 ) {
			alerta('El valor <b>Sena</b> No puede ser mayor a 100 o menor a 0','warning');
			return;
		} else if (cesantias > 100 ||  cesantias < 0 ) {
			alerta('El valor <b>Cesantias</b> No puede ser mayor a 100 o menor a 0','warning');
			return;
		} else if (intereses_cesantias > 100 ||  intereses_cesantias < 0 ) {
			alerta('El valor <b>Intereses Cesantias</b> No puede ser mayor a 100 o menor a 0','warning');
			return;
		} else if (vacaciones > 100 ||  vacaciones < 0) {
			alerta('El valor <b>Vacaciones</b> No puede ser mayor a 100 o menor a 0','warning');
			return;
		} else if (prima > 100 ||  prima < 0 ) {
			alerta('El valor <b>Prima</b> No puede ser mayor a 100 o menor a 0','warning');
			return;
		} else if (dotacion > 100 ||  dotacion < 0) {
			alerta('El valor <b>Dotacion</b> No puede ser mayor a 100 o menor a 0','warning');
			return;
		} 
	}

    $.ajax({                                                                             
		type: 'POST',                                                                              
		url:  get_base_url()+'ajuste/editarFactoresPorcentajeEmpresa',										
		data: $("#fmrfactoresporcentaje").serialize(),     
		success: function(response)                                                            
		{   

			try{
				var dataResponse = jQuery.parseJSON(response);
			}catch(e){
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar actaulizar los datos';
				NProgress.done();
			}

			if(!dataResponse.status){
				NProgress.done();
				alerta(dataResponse.message);
				return;
			}

			NProgress.done();
			alerta(dataResponse.message,'success');

		} ,
		error: function(){
            NProgress.done();
            alerta('Se presento un error al intentar editar el elemento');
			return;
        }                                                                                           
	});

}

function mostrarCampoTasa(value){

	if(value == "SI"){
		$(".input-tasa").removeClass('hide');
	}else{
		$(".input-tasa").addClass('hide');
	}
}

function mostrarCampoSalario(value){
	if(value === "NO"){
		$(".input-salario").addClass('hide');
		$("#porcentaje_salario_novedad").val("0");
	}else{
		$(".input-salario").removeClass('hide');
		$("#porcentaje_salario_novedad").val("100");
	}
}

function validarCodigo(){

	var tipo 	   = $("#tipo").val();
	var codigo     = $("#codigo").val();

	if(codigo.length > 1){

		var formData = new FormData();
		formData.append('tipo_codigo',tipo);
		formData.append('numero_codigo',codigo);

		$.ajax({    
			type: 'post',                                                                               
			url:  get_base_url()+'Ajuste/validarCodigo',												
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
					alerta('El tipo y numero de codigo ya esta registrado');
					$("#codigo").val('');
					$("#ver_tipo_codigo").val('');
					return;
				}
			},
			error: function(){
				return;
			}
		});

	}
}

function validarEditarCodigo(){

	var tipo 	= $("#ed_tipo").val();
	var codigo	= $("#ed_codigo").val(); 

	if (codigo.length > 1) {

		var formData = new FormData();

		formData.append('tipo_codigo', tipo);
		formData.append('numero_codigo',codigo);

		$.ajax({
			
			type: 'post',
			url:  get_base_url()+'Ajuste/validarCodigo',												
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
					alerta('El tipo y numero de codigo ya esta registrado');
					$("#ed_codigo").val('');
					$("#ver_tipo_codigo").val('');
					return;
				}
			},
			error: function(){
				return;
			}
		});
		
	}

}

function crearFormaPago(){

    NProgress.start();

    $.ajax({
        type: 'POST',                                                                        
        url: get_base_url() + 'ajuste/crearFormaPago',			
        data: $("#fmrcrearformapago").serialize(),   
        success: function (response) {

            NProgress.done();

            try {
                var dataResponse = jQuery.parseJSON(response);

            } catch (e) {
                var dataResponse = new Object();
                dataResponse.status = false;
                dataResponse.message = 'Se presento un error al intentar crear la forma de pago';
            }

            console.log('data respon', dataResponse);

            if (!dataResponse.status) {
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
                    window.location.href = get_base_url() + 'ajuste';
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