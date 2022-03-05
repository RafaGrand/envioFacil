<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
* 
*/
class mgenerales extends CI_Model{
	
	function __construct(){
		parent::__construct();
		$this->load->database();
	}

    function getListaDepartamento(){

        $this->db->select('id_departamento ,nombre');
        $this->db->where("estado_id",1);
        $query = $this->db->get('departamento');

        if ($query->num_rows()>0) {
			return $query->result();
		}
		
		return false;
    }

    function getListaTipoDocumento(){

        $this->db->select('id_tipo_documento_identidad  ,tipo_documento');
        $this->db->where("estado_id",1);
        $query = $this->db->get('tipo_documento_identidad');

        if ($query->num_rows()>0) {
			return $query->result();
		}
		
		return false;
    }

    function getListaProfesion(){

        $this->db->select('id_profesion   ,descripcion');
        $this->db->where("estado_id",1);
        $this->db->order_by('descripcion', 'ASC');
        $query = $this->db->get('profesion');

        if ($query->num_rows()>0) {
			return $query->result();
		}
		
		return false;
    }

    function getEstado(){

        $this->db->select('id_estado,estado');
        $query = $this->db->get('estado');

        if ($query->num_rows()>0) {
			return $query->result();
		}
		
		return false;
    }

    function InsertarElemento($tabla,$data){

        if(!empty($tabla) && !empty($data) && is_array($data)){

            try {
                
                $this->db->insert($tabla,$data);
                $error = $this->db->error();
    
                if($error['code'] == 0){
        
                return  $this->db->insert_id() ? $this->db->insert_id()  : true;

                }else{
                
                $this->db->insert('log_db',['descripcion' => json_encode($this->db->error()),'adicional' => $tabla]);
                return  false; 
                }
            } catch (Exception $e) {
                $this->db->insert('log_db',['descripcion' => $e,'adicional' => $this->db->error()]);
            }
        }

        return false;
    }

    function cargarSelect($valor_filtro,$tabla,$value,$display){

        $this->db->select($value.' as value,'.$display.' as display');
        $this->db->where("departamento_id ",$valor_filtro );
        $query = $this->db->get($tabla);

        if ($query->num_rows()>0) {
			return $query->result();
		}
		
		return false;
    }

    function getDataSesion(){

        $this->db->select('e.nombre as nombre_empresa,u.email,u.avatar');
		$this->db->from('usuario u');
		$this->db->join('cuenta c', 'c.id_cuenta  = u.cuenta_id');
		$this->db->join('empresa e', 'e.cuenta_id  = c.id_cuenta','left');
        $this->db->where("u.id_usuario",$this->session->userdata('id_usuario'));
        $this->db->where("e.id_empresa",$this->session->userdata('id_empresa'));
        $query = $this->db->get();
        $dataUser = $query->row();
    
        $data = [
            'id_empresa'        => $this->session->userdata('id_empresa'),
            'nombre_empresa'    => $dataUser->nombre_empresa ?? 'No seleccionada',
            'id_usuario'        => $this->session->userdata('id_usuario'),
            'id_cuenta'         => $this->session->userdata('id_cuenta'),
            'nombre_user'       => $this->session->userdata('nombre').' '. $this->session->userdata('apellidos'),
            'email_user'        => $dataUser->email ?? 'Correo no registrado',
            'avatar'            => $dataUser->avatar ?? 'default_avatar.png',
        ];

        return $data;
    }

    function cambiarEstadoElemento($tabla,$valor,$id_tabla,$campo){

        $response = new stdClass();
		$response->status  = false;
		$response->message = 'Se presento un error al actulizar el estado';
		
		$this->db->where($campo, $id_tabla);
		$this->db->update($tabla,['estado_id' =>$valor]);
		
		if ($this->db->affected_rows() > 0) {
			$response->status  = true;
			$response->message = 'Estado actulizado de forma exitosa.';
			return $response;
		}elseif($this->db->affected_rows() == 0){
			$response->status  = true;
			$response->message = 'No se detectó ningún cambio.';
			return $response;
		}

		return $response;

    }

    function getValorSalariominimo($ano){

        $this->db->select("valor_numerico_configuracion as valor_salario_minimo");
        $this->db->where("nombre_configuracion","salario_minimo");
        $this->db->where("valor_configuracion",$ano);
        $query = $this->db->get('configuracion_general');        
        return $query->row();

    }

    function  getValorAuxilioTransporte($ano){

        $this->db->select("valor_numerico_configuracion as valor_auxilio_transporte");
        $this->db->where("nombre_configuracion","auxilio_transporte");
        $this->db->where("valor_configuracion",$ano);
        $query = $this->db->get('configuracion_general');        
        return $query->row();

    }

    function getFactoresEmpresa(){

        $this->db->select("id_factores_porcentajes_empresa, empresa_id, descuento_salud, descuento_pension, fondo_solidaridad, arl_nivel_1, arl_nivel_2, arl_nivel_3, arl_nivel_4, caja_compensacion, icbf, sena, cesantias, intereses_cesantias, vacaciones, prima, dotacion,salud_empresa,pension_empresa");
        $this->db->where("empresa_id",$this->session->userdata('id_empresa'));
        $this->db->order_by('id_factores_porcentajes_empresa', 'DESC');
        $this->db->limit(1);
        $query = $this->db->get('factores_porcentajes_empresa');
        if($query->num_rows() == 0 ){
            return false;
        }
        return  $query->row();
    }
}