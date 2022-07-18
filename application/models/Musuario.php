<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
* 
*/
class musuario extends CI_Model{
	
	function __construct(){
		parent::__construct();
		$this->load->database();
	}

    function validarEmailExiste($email){

        $this->db->where("email", $email);
		$query = $this->db->get("usuario");

		if ($query->num_rows()>0) {
			return $query->row();
		}
		else{
			return false;
		}
    }

    function login($email, $password){
		$this->db->where("email", $email);
		$this->db->where("clave", $password);
		$query = $this->db->get("usuario");
		if ($query->num_rows()>0) {
			return $query->row();
		}
		else{
			return false;
		}
	}

    function UserCountEmpresa($id_usuario){

		$this->db->select('1');
		$this->db->from('empresa e');
		$this->db->join('cuenta c', 'c.id_cuenta  = e.cuenta_id');
		$this->db->join('usuario u', 'u.cuenta_id  = c.id_cuenta');
        $this->db->where("u.id_usuario",$id_usuario);
        $query = $this->db->get();
        return $query->num_rows();
    }

	function CambiarEstadoUsuario($id_usuario,$id_estado){

		$response = new stdClass();
		$response->status  = false;
		$response->message = 'Se presento un error al actulizar los datos';
		
		$this->db->where('id_usuario', $id_usuario);
		$this->db->update('usuario',['estado_id' =>$id_estado]);
		
		if ($this->db->affected_rows() > 0) {
			$response->status  = true;
			$response->message = 'Estado actualizado de forma exitosa.';
			return $response;
		}elseif($this->db->affected_rows() == 0){
			$response->status  = true;
			$response->message = 'No se detecto ningún cambio.';
			return $response;
		}

		return $response;
	}

	function TraerDataUsuario($id_usuario) {
		$this->db->select('cuenta_id,u.id_usuario,u.nombre,u.apellido,u.email,u.celular,u.telefono_fijo,
		municipio_id,u.direccion,u.tipo_cuenta,u.numero_cuenta_banco,u.banco,u.numero_documento,m.departamento_id');
		$this->db->from('usuario u');
		$this->db->join('municipio m', 'm.id_municipio  = u.municipio_id','left');
		$this->db->where("id_usuario", $id_usuario);
		$query = $this->db->get();

		if ($query->num_rows()>0) {
			return $query->result();
		}
		
		return false;
	}

	function ActualizarUsuario($parametros) {

		$response = new stdClass();
		$response->status  = false;
		$response->message = 'Se presento un error al actualizar los datos';


		$this->db->where('id_usuario', $parametros['id_usuario']);
		$this->db->update('usuario',[
			'nombre'     			=>$parametros['edit_nombre'],
			'apellido'   			=>$parametros['edit_apellido'], 
			'email'     			=>$parametros['edit_correo'], 
			'celular'    			=>$parametros['edit_celular'],
			'telefono_fijo' 		=>$parametros['edit_celular'],
			'municipio_id'  		=>$parametros['municipio_user_edit'], 
			'direccion'  			=>$parametros['edit_direccion'], 
			'tipo_cuenta'			=>$parametros['edit_tipo_cuenta'],
			'numero_cuenta_banco'	=>$parametros['edit_numero_cuenta'],
			'banco'					=>$parametros['edit_banco'],
			'numero_documento'		=>$parametros['edit_numero_documento']
		]);

		if ($this->db->affected_rows() > 0) {
			$response->status  = true;
			$response->message = 'Usuario actualizado de forma exitosa.';
			return $response;
		}elseif($this->db->affected_rows() == 0){
			$response->status  = true;
			$response->message = 'No se detecto ningún cambio.';
			return $response;
		}

		return $response;
	}

	function actualizarClave($parametros){

		$response = new stdClass();
		$response->status  = false;
		$response->message = 'Se presento un error al actualizar los datos';

		$this->db->where('id_usuario', $parametros['id_usuario']);
		$this->db->update('usuario',[
			'clave'  =>sha1($parametros['clave_1']), 
		]);

		if ($this->db->affected_rows() > 0) {
			$response->status  = true;
			$response->message = 'Contraseña actualizada de forma exitosa.';
			return $response;
		}elseif($this->db->affected_rows() == 0){
			$response->status  = true;
			$response->message = 'No se detecto ningún cambio.';
			return $response;
		}

		return $response;

	}

	function getListaUsariosSelect(){

		$this->db->select("CONCAT(nombre,' ',apellido) as display ,cuenta_id as value");
		$query = $this->db->get('usuario');
  
		if ($query->num_rows()>0) {
		  return $query->result();
		}
		
		return false;
	}
}