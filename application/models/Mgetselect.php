<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
* 
*/
class mgetselect extends CI_Model{
	
	function __construct(){
		parent::__construct();
		$this->load->database();
	}

    function getEstado($estados){

        $this->db->select("id_estado as value ,estado as display");
        $this->db->where_in("id_estado",$estados);
        $query = $this->db->get('estado');

        if ($query->num_rows()>0) {
			    return $query->result();
        }

        return false;
		}
		
	

    function getCargo(){

        $this->db->select("id_cargo as value ,nombre_cargo as display");
        $this->db->where("estado_id",self::ESTADO_ACTIVO);
        $this->db->where("empresa_id",$this->session->userdata('id_empresa'));
        $query = $this->db->get('cargo');

        if ($query->num_rows()>0) {
			    return $query->result();
        }

        return false;
		}
    
    function getArea(){

        $this->db->select("id_area  as value ,area as display");
        $this->db->where("estado_id",self::ESTADO_ACTIVO);
        $this->db->where("empresa_id",$this->session->userdata('id_empresa'));
        $query = $this->db->get('area');

        if ($query->num_rows()>0) {
			    return $query->result();
        }

        return false;
		}

    function getCentroCosto(){

        $this->db->select("id_centro_costo  as value ,CONCAT(codigo,' - ',nombre) as display");
        $this->db->where("estado_id",self::ESTADO_ACTIVO);
        $this->db->where("empresa_id",$this->session->userdata('id_empresa'));
        $query = $this->db->get('centro_costo');

        if ($query->num_rows()>0) {
			    return $query->result();
        }

        return false;
		}

    function getTipoContrato(){

        $this->db->select("id_tipo_contrato  as value ,tipo_contrato as display");
        $this->db->where("estado_id",self::ESTADO_ACTIVO);
        $query = $this->db->get('tipo_contrato');

        if ($query->num_rows()>0) {
			    return $query->result();
        }

        return false;
		}

    function getEntidad($tipo_entidad){

        $this->db->select("id_entidad  as value ,nombre_entidad as display");
        if($tipo_entidad == 4){
          $this->db->where_in("tipo_entidad_id ",[4,3]);
        }else{
          $this->db->where("tipo_entidad_id ",$tipo_entidad);
        }

        $this->db->where("estado_id",self::ESTADO_ACTIVO);
        $this->db->where("empresa_id",$this->session->userdata('id_empresa'));
        $query = $this->db->get('entidad');

        if ($query->num_rows()>0) {
			    return $query->result();
        }

        return false;
		}

    function getFormaPago(){

        $this->db->select("id_forma_pago   as value ,CONCAT(codigo_cuenta,' - ',medio) as display");
        $this->db->join('catalogo_cuenta cc', 'cc.id_catalogo_cuenta = fp.catalogo_cuenta_id');
		    $this->db->join('tipo_forma_pago tfp', 'tfp.id_tipo_forma_pago  = fp.tipo_forma_pago_id');
        $this->db->where("fp.estado_id",self::ESTADO_ACTIVO);
        $this->db->where("fp.empresa_id",$this->session->userdata('id_empresa'));
        $query = $this->db->get('forma_pago fp');

        if ($query->num_rows()>0) {
			    return $query->result();
        }

        return false;
		}
    function getGrupoContable(){

        $this->db->select("id_grupo_contable   as value ,nombre as display");
        $this->db->where("estado_id",self::ESTADO_ACTIVO);
        $this->db->where("empresa_id",$this->session->userdata('id_empresa'));
        $query = $this->db->get('grupo_contable');

        if ($query->num_rows()>0) {
			    return $query->result();
        }

        return false;
		}

    function getTipoEntidad(){

      $this->db->select("id_tipo_entidad   as value ,tipo_entidad as display");
      $query = $this->db->get('tipo_entidad');

      if ($query->num_rows()>0) {
        return $query->result();
      }

      return false;
  }

  function getTipoNovedad(){

    $this->db->select("id_tipo_novedad_empleado   as value ,tipo_novedad_empleado as display");
    $query = $this->db->get('tipo_novedad_empleado');

    if ($query->num_rows()>0) {
      return $query->result();
    }

    return false;
  }

  function getClaseConceptoPago(){

    $this->db->select("id_clase_concepto_pago   as value ,clase_concepto_pago as display");
    $query = $this->db->get('clase_concepto_pago');

    if ($query->num_rows()>0) {
      return $query->result();
    }

    return false;
  }

  function getSelectGeneral($value,$display,$tabla){

    $this->db->select((string)$value." as value ,".(string)$display." as display");
      $query = $this->db->get((string)$tabla);

      if ($query->num_rows()>0) {
        return $query->result();
      }

      return false;
  }

  function getListaConceptoPagosEmpresa(){

    $this->db->select("id_concepto_pago as value, CONCAT(codigo,' - ',nombre_concepto) as display");
    $this->db->where_not_in('clase_concepto_pago_id', [self::CLASE_SALARIO,self::CLASE_AUX_TRANSPORTE,self::CLASE_DESCUENTO_SALUD,self::CLASE_DESCUENTO_PENSION]);
    $this->db->where_not_in('tipo','A');
    $this->db->where("estado_id",self::ESTADO_ACTIVO);
    $this->db->where("empresa_id",$this->session->userdata('id_empresa'));
    $query = $this->db->get('concepto_pago');

    if ($query->num_rows()>0) {
      return $query->result();
    }

    return false;
  }


  function getListaNovedadEmpleado(){

      $this->db->select("CONCAT(id_novedad_empleado,'|',tipo_novedad_empleado_id) as value ,CONCAT(nombre_novedad,' - ',codigo) as display");
      $this->db->where("empresa_id",$this->session->userdata('id_empresa'));
      $query = $this->db->get('novedad_empleado');

      if ($query->num_rows()>0) {
        return $query->result();
      }
      
      return false;
  }

 
  public function getDataEmpleados(){

    $this->db->select("id_empleado as value, nombre_completo as display");//seleccionar el valor "id del empleado"  mostrar el campo "nombre completo"
    $this->db->from('empleado ep'); //Traer de la tabla "empleado"
    $this->db->where("ep.estado_id ",self::ESTADO_ACTIVO); //Que cumpla esta condicion estado ACTIVO
    $this->db->where("ep.empresa_id ",$this->session->userdata('id_empresa'));//Condicion EMPRESA ACTUAL O SELECCIONADA
    $query = $this->db->get();

    if ($query->num_rows() > 0) {
      return $query->result();
    }	
    return false;

	}

  public function getDataEntidades(){

    $this->db->select("id_entidad as value, nombre_entidad as display");
    $this->db->from('entidad ep'); 
    $this->db->where("ep.estado_id ",self::ESTADO_ACTIVO); 
    $this->db->where("ep.empresa_id ",$this->session->userdata('id_empresa'));
    $query = $this->db->get();

    if ($query->num_rows() > 0) {
      return $query->result();
    }	
    return false;

	}

  public function getTipoFormaPago(){

    $this->db->select("id_tipo_forma_pago as value ,medio as display");
    $query = $this->db->get('tipo_forma_pago');

    if ($query->num_rows()>0) {
      return $query->result();
    }
    return false;
  }

  public function getCatalogoCuenta(){

    $this->db->select("id_catalogo_cuenta as value ,CONCAT(codigo_cuenta,'-',nombre_cuenta) as display");
    $this->db->where("empresa_id ",$this->session->userdata('id_empresa'));
    $this->db->where("estado_id",self::ESTADO_ACTIVO);
    $query = $this->db->get('catalogo_cuenta');

    if ($query->num_rows()>0) {
      return $query->result();
    }
    return false;

  }

  public function getPeriodoNominaInicial(){

    $this->db->select("id_periodo_nomina as value, CONCAT(numero_periodo,periodo_pago,'-',mes,'-',ano_periodo) AS display");
    $this->db->where("fecha_inicio >= '2022-01-01'");//Solo se listaran los periodos del 2022 en adelante
    $query = $this->db->get('periodo_nomina');

    if ($query->num_rows()>0) {
      return $query->result();
    }

    return false;

  }

}