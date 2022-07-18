<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
* 
*/
class mreportes extends CI_Model{
	
	function __construct(){
		parent::__construct();
		$this->load->database();
	}

	function liquidacion_de_guias($fecha_ini,$fecha_fin,$id_cuenta){

		$this->db->select("date(p.fecha_creacion) as fecha,u.nombre, u.apellido,e.estado,t.nombre  as transportadora,p.codigo_remision,m.nombre as ciudad_entrega,
		CONCAT('$',REPLACE(FORMAT(p.valor_comision ,0),',','.')) as valor_comision,
		CONCAT('$',REPLACE(FORMAT(p.valor_declarado ,0),',','.')) as valor_declarado,
		CONCAT('$',REPLACE(FORMAT(p.valor_flete ,0),',','.')) as valor_flete,			
		CONCAT('$',REPLACE(FORMAT((p.valor_declarado) ,0),',','.')) as valor_cobrar,
		CONCAT('$',REPLACE(FORMAT((p.valor_declarado - p.valor_comision - p.valor_flete ) ,0),',','.')) as valor_pagar");

		$this->db->from('pedido p');
		$this->db->join('cuenta c', 'c.id_cuenta  = p.cuenta_id');
		$this->db->join('usuario u', 'u.cuenta_id  = c.id_cuenta');
		$this->db->join('municipio m', 'm.codigo_transportadora  = p.ciudad_destinatario');
		$this->db->join('transportadora t', 't.id_transportadora  = p.transportadora_id');
		$this->db->join('estado e', 'e.id_estado  = p.estado_liquidacion');

		$this->db->where("date(p.fecha_creacion) between '$fecha_ini' AND '$fecha_fin'");
		$this->db->where_in("p.estado_liquidacion",[self::ESTADO_LIQUIDADO,self::ESTADO_PENDIENTE]);

		if($id_cuenta != "TODOS"){
			$this->db->where("p.cuenta_id",$id_cuenta);
		}

		$query = $this->db->get();

		if ($query->num_rows()> 0 ) {
			return $query->result();
		}
		
		return false;

	}
	
}