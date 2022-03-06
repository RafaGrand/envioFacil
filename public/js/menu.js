function cerrarSesion(){

    Swal.fire({
		icon: 'question',
		imageAlt: 'loading icon',
		title: 'Esta a punto de salir del sistema',
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
			window.location.href = get_base_url();
		}
	});

}