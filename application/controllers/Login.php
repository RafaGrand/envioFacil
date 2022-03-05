<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function __construct(){
		parent::__construct();
		$this->load->model('musuario');
		$this->load->model('mgenerales');
	}
	
	public function index(){
		
		$this->session->sess_destroy();
		$this->load->view('base',["base_url"=>base_url(),"modulo"=>'login.twig','cantidad_empresas'=>0,'id_empresa'=>0,"hola_mundo"=>"hola rafa degenerado compre teclado"]);
	}

	public function registrarUsuario(){

		$parametros = $this->input->post();

		if(isset($parametros['clave'],$parametros['nombre'],$parametros['apellido'],$parametros['celular'],$parametros['telefono_fijo'],$parametros['correo'])){
			if($parametros['clave'] != $parametros['clave1']){
				echo json_encode([
					"status"  	 => false,
					"message"    => "Las contraseñas ingresadas no coinciden o no hay una contraseña valida"
				]);
				return;
			}

			if(isset($parametros['correo']) && !empty($parametros['correo'])){
				if($this->musuario->validarEmailExiste($parametros['correo'])){
					echo json_encode([
						"status"  	 => false,
						"message"    => "Ya existe un usuario creado con el  Email <b>".$parametros['correo']."</b>"
					]);	
					return;
				}

			}else{
				echo json_encode([
					"status"  	 => false,
					"message"    => "Debe ingresar el campo Email"
				]);
				return;
			}

			$cuenta_id  = $this->mgenerales->InsertarElemento('cuenta',['observacion'=>'']);

			if(!$cuenta_id ){
				echo json_encode([
					"status"  	 => false,
					"message"    => "No fue posible crear la cuenta, por favor intente de nuevo"
				]);
				return;
			}

			$datos = [
				'clave' 		=> sha1($parametros['clave']),
				'nombre' 		=> $parametros['nombre'],
				'apellido' 		=> $parametros['apellido'],
				'celular' 		=> $parametros['celular'],
				'telefono_fijo' => $parametros['telefono_fijo'],
				'email' 		=> $parametros['correo'],
				'cuenta_id ' 	=> $cuenta_id
			];

			$response = $this->mgenerales->InsertarElemento('usuario',$datos);
			
			if($response){				
				echo json_encode([
					"status"  	 => true,
					"message"    => "Usuario creado de forma exitosa",
					"id_usuario" => $response
				]);				
				return ;
			}else{
				echo json_encode([
					"status"  	 => false,
					"message"    => "No fue posible insertar el usuario, por favor recargue la pagina e intente de nuevo"
				]);
				return ;
			}
		}

		echo json_encode([
			"status"  	 => false,
			"message"    => "Faltan parametros para la creacion del usuario"
		]);
		return ;
	}

	public  function inicarSesion(){

		$parametros = $this->input->post();

		if(isset($parametros['email'],$parametros['password'])){

			$password = sha1($parametros['password']);

			$response = $this->musuario->login($parametros['email'], $password);

			if($response){

				if($response->estado_id == 1){// 1 = ESTADO ACTIVO

					$data = [
						"id_usuario" => $response->id_usuario,
						"id_cuenta"  => $response->cuenta_id,
						"nombre"     => ucwords($response->nombre),
						"apellidos"  => ucwords($response->apellido),
						"login"      => true
					];

					$this->session->set_userdata($data);

					echo json_encode([
						"status"  	 => true,
						"message"    => "Ingreso correcto"
					]);
					return ;

				}else{

					echo json_encode([
						"status"  	 => false,
						"message"    => "El usuario no esta activo, por favor contacte a soporte"
					]);
					return ;
				}
			}
			else{

				echo json_encode([
					"status"  	 => false,
					"message"    => "Usuario o contraseña incorrecta"
				]);
				return ;
			}

		}else{

			echo json_encode([
				"status"  	 => false,
				"message"    => "Faltan parametros para iniciar sesion"
			]);
			return ;
		}
	}

	public function recuperarClave(){
		$this->session->sess_destroy();
		$this->load->view('base',[
			"base_url"=>base_url(),
			"modulo"=>'olvidar_contrasena.twig']);
	}

	public function enviarCorreoRecuperarContrasena() {
		$parametros = $this->input->post();
		 /*ojo aca  */
		if(isset($parametros['email'])){
			$response = $this->musuario->validarEmailExiste($parametros['email']);

			if($response){
				if($response->estado_id == 1){// 1 = ESTADO ACTIVO
					// TODO enviar mail
					$this->enviarEmail($response->email, $response->clave);	

					echo json_encode([
						"status"  	 => true,
						"message"    => "Ingreso correcto"
					]);
					return ;

				} else {
					echo json_encode([
						"status"  	 => false,
						"message"    => "El usuario no esta activo, por favor contacte a soporte"
					]);
					return ;
				}
			} else {
				echo json_encode([
					"status"  	 => false,
					"message"    => "El correo digitado no existe"
				]);
				return ;
			}
		} else {
			echo json_encode([
				"status"  	 => false,
				"message"    => "Digite un correo válido"
			]);
			return ;
		}
	}

	public function enviarEmail($email, $encrypt_password) {
		$this->load->library('email');
		/*$config = Array(
			'protocol' => 'smtp',
			'smtp_host' => 'tls://smtp-relay.sendinblue.com', 		/*Este es el host de sendinblue que cree*/ 
			/*'smtp_port' => 587,
			'smtp_user' => 'limaca842009@gmail.com',				/*Usuario registrado*/
			/*'smtp_pass' => 'gqmWvz2tOI8SHVbG',						/*Clave smtp*/
			/*'charset' => 'utf-8',
			'priority' => 1
			
		);

		echo $this->email->print_debugger();

		$this->email->initialize($config);
		$this->email->from('limaca842009gmail', 'Liliana Acosta');
		$this->email->to('limaca842009gmail', 'Liliana Acosta');
		$this->email->subject('probando envio correo');
		$this->email->message('<p>Estamos intentando enviar un correo <a href="https://localhost/genera/login/cambiarContrasena/' . $email .'/'.$encrypt_password.'>link</a></p>');
		$this->email->send();*/
		
		$config = array(
			'protocol' => 'smtp',
			'smtp_host' => 'smtp.googlemail.com',
			'smtp_user' => 'limaca842009@gmail.com', //Su Correo de Gmail Aqui
			'smtp_pass' => 'reznisdjbzwnhjer', // Su Password de Gmail aqui
			'smtp_port' => '465',
			'smtp_crypto' => 'ssl',
			'mailtype' => 'html',
			'wordwrap' => TRUE,
			'charset' => 'utf-8'
			);
		$this->load->library('email', $config);
		$this->email->set_newline("\r\n");
		$this->email->from('limaca842009@gmail.com');
		$this->email->subject('Probando envio de correo');
		$this->email->message('Hola estamos enviando nuestro primer e-mail');
		$this->email->to('limaca842009@hotmail.com');
		if($this->email->send(FALSE)){
			echo "enviado<br/>";
			echo $this->email->print_debugger();
		}else {
			echo "fallo <br/>";
			echo "error: ".$this->email->print_debugger();
		}
	}

	public function cambiarContrasena($email, $encrypt_password) {
		$this->session->sess_destroy();
		$this->load->view('base', 
		[
			"base_url"=>"https://localhost/genera/",
			"modulo"=>'cambiar_contrasena.twig',
			'cantidad_empresas'=>0,
			'id_empresa'=>0,
			'email' => $email,
			'encrypt_password' => $encrypt_password
		]);
	}

	public function actualizarContrasena() {
		$parametros = $this->input->post();

		if(isset($parametros['email'], $parametros['password'], $parametros['repetir_password'], $parametros['encrypt_password'])){
			if ($parametros['password'] != $parametros['repetir_password']) {
				$response = $this->musuario->login($parametros['email'], $parametros['encrypt_password']);

				if($response){
					if($response->estado_id == 1){// 1 = ESTADO ACTIVO
						$password = sha1($parametros['password']);
						$this->musuario->actualizarContrasena($response->id_usuario, $password);

						echo json_encode([
							"status"  	 => true,
							"message"    => "Actualizacion correcta"
						]);
						return ;

					} else {
						echo json_encode([
							"status"  	 => false,
							"message"    => "El usuario no esta activo, por favor contacte a soporte"
						]);
						return ;
					}
				} else {
					echo json_encode([
						"status"  	 => false,
						"message"    => "El correo digitado no existe"
					]);
					return ;
				}
			} else {
				echo json_encode([
					"status"  	 => false,
					"message"    => "Digite contraseñas iguales"
				]);
				return ;
			}
		} else {
			echo json_encode([
				"status"  	 => false,
				"message"    => "Digite datos validos"
			]);
			return ;
		}
	}
}
