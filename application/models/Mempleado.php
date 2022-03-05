<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
* 
*/
class mempleado extends CI_Model{
	
	function __construct(){
		parent::__construct();
		$this->load->database();
	}

    function validarEmpleadoExiste($tipo_documento,$numero_documento){
        
        $response = new stdClass();
		$response->status  = false;
        $response->message = '';
		

		$this->db->where("empresa_id", $this->session->userdata('id_empresa'));
		$this->db->where("numero_documento", $numero_documento);
        $this->db->where("tipo_documento_identidad_id ", $tipo_documento);
		$query = $this->db->get("empleado");

		if ($query->num_rows()>0) {
            $response->message = 'Ya existe un empleado con el mismo tipo y numero de documento en esta empresa';
			$response->status  = true;
			return $response;
		}

		return $response;	
    }

    function editarFotoEmpleado($filename,$id_empleado){

		$response = new stdClass();
		$response->status  = false;
		$response->message = 'Se presento un error al actulizar el logo';

		$data = array(
			"foto"=>$filename,
		);

		$this->db->where('id_empleado', $id_empleado);
		$this->db->update('empleado',$data);

		if ($this->db->affected_rows() > 0) {
			$response->status  = true;
			$response->message = 'Foto actulizada ';
			return $response;
		}elseif($this->db->affected_rows() == 0){
			$response->status  = true;
			$response->message = 'No se detectó ningún cambio.';
			return $response;
		}

		return $response;

	}


    function getListaEmpleado(){

        $this->db->select("
			e.foto,
			e.id_empleado,UPPER(CONCAT(e.primer_nombre,' ',e.segundo_nombre,' ',e.primer_apellido,' ',e.segundo_apellido)) as nombre_empleado,
			e.numero_documento,
			if(c.nombre_cargo is null,'No Asignado',c.nombre_cargo) as cargo,
			if(e2.id_estado is null,'SIN CONTRATO',UPPER(e2.estado)) as estado_contrato, 
			if(e2.id_estado is null,0,id_estado) as id_estado_contrato
		");

		$this->db->from('empleado e');
		$this->db->join('contrato ct', 'ct.empleado_id = e.id_empleado AND 
						 ct.id_contrato = (select max(id_contrato) from contrato where empleado_id=e.id_empleado)','left');

		$this->db->join('cargo c', 'c.id_cargo  = ct.cargo_id','left');
		$this->db->join('estado e2', 'e2.id_estado  = ct.estado_id','left');
        $this->db->where("e.empresa_id", $this->session->userdata('id_empresa'));
		$this->db->group_by("id_empleado");
        $query = $this->db->get();

        if ($query->num_rows()>0) {
			return $query->result();
		}
		
		return false;

    }

	function getDataEmpleado($id_empleado){

		$this->db->select("CONCAT(e.primer_nombre,' ',e.segundo_nombre,' ',primer_apellido,' ',segundo_apellido) as nombre_completo,e.numero_documento,p.descripcion as profesion,TIMESTAMPDIFF(YEAR,fecha_nacimiento,CURDATE()) AS edad,e.telefono,e.foto,tipo_documento_identidad_id");
		$this->db->from('empleado e');
		$this->db->join('profesion p', 'p.id_profesion   = e.profesion_id');
		$this->db->where("e.id_empleado ",$id_empleado);
		$this->db->limit(1);

		$query = $this->db->get();

        if ($query->num_rows()>0) {
			return $query->result();
		}
		
		return false;
	}


	function getDataEmpleadoEdit($id_empleado){

		$this->db->select("e.id_empleado, e.numero_documento, e.tipo_documento_identidad_id, e.expedicion_documento, e.primer_nombre, e.segundo_nombre, e.primer_apellido,e.segundo_apellido, e.nombre_completo, e.direccion, e.municipio_id, e.telefono, e.email, e.nacionalidad, e.fecha_nacimiento, e.lugar_nacimiento, e.estado_civil, e.libreta_militar,e.clase_libreta, e.profesion_id, e.tarjeta_profesional, e.licencia_conduccion, e.tipo_licencia, e.sexo, e.estado_id, e.empresa_id, e.fecha_creacion, e.foto,m.departamento_id,gfe.id_grupo_familiar_empleado, gfe.nombre_completo as nombre_completo_familiar , gfe.parentezco, gfe.fecha_nacimiento as fecha_nacimiento_familiar,gfe.telefono as telefono_familiar, gfe.empleado_id, gfe.estado_id as estado_id_familiar");
		
		$this->db->from('empleado e');
		$this->db->join('municipio m', 'id_municipio = e.municipio_id','left');
		$this->db->join('grupo_familiar_empleado gfe', 'gfe.empleado_id = e.id_empleado','left');
		$this->db->where("e.id_empleado ",$id_empleado);

		$query = $this->db->get();

        if ($query->num_rows()>0) {
			return $query->result();
		}
		
		return false;
	}


	function filtrarEmpleado($palabra,$id_estado){

		$this->db->select("
			e.foto,
			e.id_empleado,UPPER(CONCAT(e.primer_nombre,' ',e.segundo_nombre,' ',e.primer_apellido,' ',e.segundo_apellido)) as nombre_empleado,
			e.numero_documento,
			if(c.nombre_cargo is null,'No Asignado',c.nombre_cargo) as cargo,
			if(e2.id_estado is null,'SIN CONTRATO',UPPER(e2.estado)) as estado_contrato, 
			if(e2.id_estado is null,0,e2.id_estado) as id_estado_contrato
		");

		$this->db->from('empleado e');
		$this->db->join('contrato ct', 'ct.empleado_id = e.id_empleado AND 
						 ct.fecha_creacion = (select max(fecha_creacion) from contrato where empleado_id=e.id_empleado)','left');

		$this->db->join('cargo c', 'c.id_cargo  = ct.cargo_id','left');
		$this->db->join('estado e2', 'e2.id_estado  = ct.estado_id','left');
		$this->db->where("e.empresa_id", $this->session->userdata('id_empresa'));

	

		if((int)$id_estado != 0){

			$this->db->where("ct.estado_id", $id_estado);

		}else if($id_estado == "null"){

			$this->db->where("ct.estado_id IS NULL");
		}

		if(strlen($palabra) > 0 ){
			$this->db->like('e.nombre_completo', $palabra);
		}
		
		$this->db->group_by("id_empleado");
        $query = $this->db->get();

        if ($query->num_rows()>0){
			return $query->result();
		}
		
		return false;
	}

	function editarEmpleado($parametros){

		$response = new stdClass();
		$response->status  = false;
		$response->message = 'Se presento un error al actulizar los datos';

		$data = array(			
			'tipo_documento_identidad_id' => $parametros['ee_tipo_documento'],
			'numero_documento' => $parametros['ee_numero_documento'],
			'expedicion_documento' => $parametros['ee_expedicion_documento'],
			'primer_nombre' => $parametros['ee_primer_nombre'],
			'segundo_nombre' => $parametros['ee_segundo_nombre'],
			'primer_apellido' => $parametros['ee_primer_apellido'],
			'segundo_apellido' => $parametros['ee_segundo_apellido'],
			'fecha_nacimiento' => $parametros['ee_fecha_nacimiento'],
			'estado_civil' => $parametros['ee_estado_civil'],
			'municipio_id' => $parametros['ee_municipio_id'],
			'direccion' => $parametros['ee_direccion'],
			'telefono' => $parametros['ee_telefono'],
			'libreta_militar' => $parametros['ee_libreta_militar'],
			'clase_libreta' => $parametros['ee_clase_libreta'],
			'licencia_conduccion' => $parametros['ee_licencia_conduccion'],
			'tipo_licencia' => $parametros['ee_tipo_licencia'],
			'profesion_id' => $parametros['ee_profesion'],
			'tarjeta_profesional' => $parametros['ee_tarjeta_profesional'],
			'email' => $parametros['ee_email'],
			'nombre_completo' => $parametros['ee_primer_nombre'].' '.$parametros['ee_segundo_nombre'].' '.$parametros['ee_primer_apellido'].' '.$parametros['ee_segundo_apellido']
		);
		
		$this->db->where('id_empleado', $parametros['ee_id_empleado']);
		$this->db->where("empresa_id", $this->session->userdata('id_empresa'));
		$this->db->update('empleado',$data);

		if ($this->db->affected_rows() > 0) {
			$response->status  = true;
			$response->message = 'Empleado actualizada de forma exitosa.';
			return $response;
		}elseif($this->db->affected_rows() == 0){
			$response->status  = true;
			$response->message = 'No se detectó ningún cambio.';
			return $response;
		}

		return $response;		
	}


	function eliminarItemGrupoFamiliar($id_grupo_familiar){

		$response = new stdClass();
		$response->status  = false;
		$response->message = 'Se presento un error al eliminar el registro';

		$this->db->delete('grupo_familiar_empleado', array('id_grupo_familiar_empleado' => $id_grupo_familiar));

		if ($this->db->affected_rows() > 0) {
			$response->status  = true;
			$response->message = 'Registro eliminado de forma correcta';
			return $response;
		}elseif($this->db->affected_rows() == 0){
			$response->status  = true;
			$response->message = 'No se elimino ningun registro';
			return $response;
		}

		return $response;
	}

}