function registrarUsuario(form){

    var clave  = $("#clave").val();
    var clave1 = $("#clave1").val();

    if(clave != clave1){
        alerta('Las contraseñas ingresadas no coinciden');
        return ;
    }

	NProgress.start();

    $.ajax({                                                                             
		type: 'POST',                                                                              
		url:  get_base_url()+'/login/registrarUsuario',										
		data: $("#fmregistrouser").serialize(),      
		success: function(response)                                                            
		{ 
			try{
				var dataResponse = jQuery.parseJSON(response);
			}catch(e){
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar crear el usuario';
			}

			if(!dataResponse.status){
				alerta(dataResponse.message);
				NProgress.done();
				return;
			}

			NProgress.done();
			alerta(dataResponse.message,'success');
			$('#fmregistrouser')[0].reset();
			//$('.modal').modal().hide();
			$('#md-new-user').modal('close', true);
		} ,
		error: function(){
            NProgress.done();
            alerta('Se presento un error al intentar crear el usuario');
			return;
        }                                                                                           
	});
}

function login(){

	NProgress.start();

	$.ajax({                                                                             
		type: 'POST',                                                                              
		url:  get_base_url()+'/login/inicarSesion',									
		data: $("#fmrlogin").serialize(),      
		success: function(response)                                                            
		{ 
			NProgress.done();

			try{
				var dataResponse = jQuery.parseJSON(response);
			}catch(e){
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar iniciar sesion';
			}
			
			if(!dataResponse.status){
				alerta(dataResponse.message);
				return;
			}
			document.getElementById("email").value = "";
			window.location.href = get_base_url()+"inicio";
		},
		error: function(){
            NProgress.done();
            alerta('Se presento un error al intentar iniciar sesion');
			return;
        }                                                                                         
	});
}

function mostrarPassword(){
	if(clave.type == "password" ){
		clave.type = "text";
		document.getElementById("icono-psw").innerHTML = '<i id="icono-psw" style="cursor:pointer; font-size:20px; top:-0.1rem;" class="material-icons prefix">visibility<i>';
	}else{
		clave.type = "password";
		document.getElementById("icono-psw").innerHTML = '<i id="icono-psw" style="cursor:pointer; font-size:20px; top:-0.1rem;" class="material-icons prefix">visibility_off<i>';
	 }

}

function mostrarPassword1(){
	if(clave1.type == "password" ){
		clave1.type = "text";
		document.getElementById("icono-psw1").innerHTML = '<i id="icono-psw1" style="cursor:pointer;  font-size:20px; top:-0.1rem;" class="material-icons prefix">visibility<i>';
	}else{
		clave1.type = "password";
		document.getElementById("icono-psw1").innerHTML = '<i id="icono-psw1" style="cursor:pointer;  font-size:20px; top:-0.1rem;" class="material-icons prefix">visibility_off<i>';
	 }

}

function mostrarPassword2(){
	if(clave2.type == "password" ){
		clave2.type = "text";
		document.getElementById("icono-psw2").innerHTML = '<i id="icono-psw2" style="cursor:pointer; font-size:20px; top:-0.1rem;" class="material-icons prefix">visibility<i>';
	}else{
		clave2.type = "password";
		document.getElementById("icono-psw2").innerHTML = '<i id="icono-psw2" style="cursor:pointer; font-size:20px; top:-0.1rem;" class="material-icons prefix">visibility_off<i>';
	 }

}
function showPassword() {
	const e = document.querySelector("#eye");
	const passwordInput = document.querySelector('#password');

    if (e.classList.contains('show')) {
        e.classList.remove('show');
        e.textContent = 'visibility_off';
        passwordInput.type = 'text';
    } else {
        e.classList.add('show');
        e.textContent = 'visibility';
        passwordInput.type = 'password';
    }
}

function olvidarContrasena() {
	NProgress.start();

	$.ajax({                                                                             
		type: 'POST',                                                                              
		url:  get_base_url()+'/login/enviarCorreoRecuperarContrasena',									
		data: $("#fmrOlvidarContrasena").serialize(),      
	 
		success: function(response)  
		                                                        
		{ 
			NProgress.done();
			console.log(response);
			
			try{
				var dataResponse = jQuery.parseJSON(response);
			}catch(e){
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar recuperar contraseña';
			}
			
			if(!dataResponse.status){
				alerta(dataResponse.message);
				return;
			}
			
			window.location.href = get_base_url();
		},
		error: function(){
            NProgress.done();
            alerta('Se presento un error al intentar recuperar contraseña');
			return;
        }                                                                                         
	});
}

function cambiarContrasena() {
	NProgress.start();

	$.ajax({                                                                             
		type: 'POST',                                                                              
		url:  get_base_url()+'/login/actualizarContrasena',									
		data: $("#fmrCambiarContrasena").serialize(),     // adicionar parametros de la url -> correo y clave encriptada 
		success: function(response)                                                            
		{ 
			NProgress.done();

			try{
				var dataResponse = jQuery.parseJSON(response);
			}catch(e){
				var dataResponse = new Object();
				dataResponse.status = false;
				dataResponse.message = 'Se presento un error al intentar cambiar la contraseña';
			}
			
			if(!dataResponse.status){
				alerta(dataResponse.message);
				return;
			}

			window.location.href = get_base_url();
		},
		error: function(){
            NProgress.done();
            alerta('Se presento un error al intentar cambiar la contraseña');
			return;
        }                                                                                         
	});
}