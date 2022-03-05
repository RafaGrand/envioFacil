<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
* 
*/
class mempresa extends CI_Model{
	
	function __construct(){
		parent::__construct();
		$this->load->database();
	}

    function getSectorComercial(){

        $this->db->select('id_sector_comercial,sector_comercial');
        $this->db->where("estado_id",1);
        $query = $this->db->get('sector_comercial');

        if ($query->num_rows()>0) {
			return $query->result();
		}
		
		return false;
    }

	public function getListaEmpresa($id_usuario){

		$this->db->select('e.id_empresa,e.nombre as nombre_empresa,e.documento_empresa,m.nombre as municipio,date(e.fecha_creacion) as fecha_creacion,e.porcentaje_config,es.estado,e.logo');
		$this->db->from('empresa e');
		$this->db->join('cuenta c', 'c.id_cuenta  = e.cuenta_id');
		$this->db->join('usuario u', 'u.cuenta_id  = c.id_cuenta');
		$this->db->join('estado es', 'es.id_estado  = e.estado_id');
		$this->db->join('municipio m', 'm.id_municipio  = e.municipio_id', 'left');
        $this->db->where("u.id_usuario",$id_usuario);
        $query = $this->db->get();

        if ($query->num_rows()>0) {
			return $query->result();
		}
		
		return false;
	}

	public function getDataEmpresa($id_empresa){

		$this->db->select('e.id_empresa,e.nombre,e.documento_empresa,e.digito_verificacion,e.representante_legal,e.naturaleza,telefono,e.email,e.direccion,e.periodo_pago,e.centros_costo,e.estado_id ,e.municipio_id,m.departamento_id,e.logo,sector_comercial_id');
		$this->db->from('empresa e');
		$this->db->join('municipio m', 'm.id_municipio  = e.municipio_id', 'left');
		$this->db->where("e.id_empresa",$id_empresa);
		$this->db->where("e.cuenta_id ",$this->session->userdata('id_cuenta'));
		$this->db->limit(1);

		$query = $this->db->get();

        if ($query->num_rows()>0) {
			return $query->result();
		}
		
		return false;
	}

	public function cargarCentroCostos($id_empresa){

		$this->db->select('e.id_empresa,e.centros_costo,e.estado_id');
		$this->db->from('empresa e');
		$this->db->where("e.id_empresa ",$this->session->userdata('id_empresa'));

		$query = $this->db->get();

        if ($query->num_rows()>0) {
			return $query->row();
		}
		
		return false;

	}

	public function getDataEmpresaSesion(){

		$this->db->select('e.id_empresa,e.nombre,e.documento_empresa,e.digito_verificacion,UPPER(e.representante_legal) as representante_legal,e.naturaleza,telefono,e.email,e.direccion,e.periodo_pago,e.centros_costo,e.estado_id ,e.municipio_id,m.departamento_id,e.logo,sector_comercial_id');
		$this->db->from('empresa e');
		$this->db->join('municipio m', 'm.id_municipio  = e.municipio_id', 'left');
		$this->db->where("e.id_empresa ",$this->session->userdata('id_empresa'));

		$query = $this->db->get();

        if ($query->num_rows()>0) {
			return $query->row();
		}
		
		return false;
	}

	public function vidarEmpresaCuenta($id_empresa){

		$response = new stdClass();
		$response->status  = false;
		$response->message = 'La empresa no esta asociada a la cuenta, es posible que la sesion haya caducado o la empresa ya no exista.<br>(Recargue la pagina, sie le problema persiste contacte a soporte)';

		$this->db->where("id_empresa ", $id_empresa);
		$this->db->where("cuenta_id  ", $this->session->userdata('id_cuenta'));
		$query = $this->db->get("empresa");

		if ($query->num_rows()>0) {
			$response->status  = true;
			return $response;
		}

		return $response;	

	}

	function editarEmpresa($parametros){

		$response = new stdClass();
		$response->status  = false;
		$response->message = 'Se presento un error al actulizar los datos';

		$data = array(
			'documento_empresa'		=> $parametros['documento_empresa_edit'],
			'digito_verificacion'	=> $parametros['digito_verificacion_edit'],
			'nombre'				=> $parametros['nombre_edit'],
			'naturaleza'			=> $parametros['naturaleza_edit'],
			'sector_comercial_id '	=> $parametros['sector_comercial_id_edit'],
			'representante_legal'	=> $parametros['representante_legal_edit'],
			'estado_id '			=> $parametros['estado_edit'],
			'periodo_pago'			=> $parametros['periodo_pago_edit'],
			'centros_costo'			=> $parametros['centros_costo_edit'],
			'telefono'				=> $parametros['telefono_edit'],
			'email'					=> $parametros['email_edit'],
			'municipio_id '			=> $parametros['municipio_edit'],
			'direccion'				=> $parametros['direccion_edit'],
			'porcentaje_config'		=> 90,
		);
		
		$this->db->where('id_empresa', $parametros['id_empresa_edit']);
		$this->db->where("cuenta_id  ", $this->session->userdata('id_cuenta'));
		$this->db->update('empresa',$data);

		if ($this->db->affected_rows() > 0) {
			$response->status  = true;
			$response->message = 'Empresa actualizada de forma exitosa.';
			return $response;
		}elseif($this->db->affected_rows() == 0){
			$response->status  = true;
			$response->message = 'No se detectó ningún cambio.';
			return $response;
		}

		return $response;		
	}

	function editarLogoEmpresa($filename,$id_empresa){

		$response = new stdClass();
		$response->status  = false;
		$response->message = 'Se presento un error al actulizar el logo';

		$data = array(
			"logo"=>$filename,
			"porcentaje_config" => 100
		);

		$this->db->where('id_empresa', $id_empresa);
		$this->db->where("cuenta_id  ", $this->session->userdata('id_cuenta'));
		$this->db->update('empresa',$data);

		if ($this->db->affected_rows() > 0) {
			$response->status  = true;
			$response->message = 'Empresa actualizada de forma exitosa.';
			return $response;
		}elseif($this->db->affected_rows() == 0){
			$response->status  = true;
			$response->message = 'No se detectó ningún cambio.';
			return $response;
		}

		return $response;

	}
}