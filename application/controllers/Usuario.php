<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Usuario extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('musuario');
	}

	public function CambiarEstadoUsuario(){

		$parametros = $this->input->post();
        //VALIDA LOS CAMPOS REQUERIDOS DE
        if(!isset($parametros['id_usuario'],$parametros['id_estado']) || empty($parametros['id_usuario']) || empty($parametros['id_estado'])){
			
            echo json_encode([
                "status"  	 => false,
                "message"    => "Faltan parametros para editar el estado"
            ]);
            return ;
        }else if(empty($this->session->userdata('login'))){
            echo json_encode([
                "status"  	 => false,
                "message"    => "La sesion caduco, recargue la pagina e ingrese nuevamente"
            ]);
            return ;
        }

		$response = $this->musuario->CambiarEstadoUsuario($parametros['id_usuario'],$parametros['id_estado']);

		if(!$response){
			
			echo json_encode([
				"status"  	 => false,
				"message"    => isset($response->message)  ? $response->message  : 'No se actulizo ningun registro'
			]);

			return ;
		}  

		echo json_encode([
			"status"  	 => true,
			"message"    => $response->message
		]);
		return ;
	
	}

	public function GetUserData() {
		$parametros = $this->input->post();

		if(!isset($parametros['id_usuario']) || empty($parametros['id_usuario'])){
			
            echo json_encode([
                "status"  	 => false,
                "message"    => "Faltan parametros para editar el usuario"
            ]);
            return ;
        }

		$response = $this->musuario->TraerDataUsuario($parametros['id_usuario']);

		if(!$response){
			
			echo json_encode([
				"status"  	 => false,
				"message"    => 'No se actualizo ningun registro'
			]);

			return ;
		}  

		echo json_encode([
			"status"  	 => true,
			"message"    => $response
		]);
		return ;
	}

	public function UpdateUsuario() {
		$parametros = $this->input->post();

		$response = $this->musuario->ActualizarUsuario($parametros);

		if(!$response){
			
			echo json_encode([
				"status"  	 => false,
				"message"    => 'No se actualizo ningun registro'
			]);

			return ;
		}  

		echo json_encode([
			"status"  	 => true,
			"message"    => $response
		]);
		return ;
	}
}