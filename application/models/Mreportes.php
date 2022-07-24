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

	function guias($fecha_ini,$fecha_fin,$id_cuenta){

		$this->db->select("p.id_pedido,concat(u.nombre,' ',u.apellido) as usuario,
		u.email as email,date(p.fecha_creacion) as fecha, p.id_remision, p.codigo_remision, p.contenido,p.alto, p.ancho,p.largo,p.peso,p.unidades,p.nombre_destinatario, 
		p.direccion_destinatario, p.telefono_destinatario, m.nombre as ciudad, t.nombre as transportadora, e.estado,e2.estado  as estado_liquidacion,
		FORMAT(p.valor_comision, 0) as valor_comision, 
		CONCAT('$',REPLACE(FORMAT(p.valor_declarado ,0),',','.')) as valor_declarado,
		FORMAT(p.valor_flete, 0) as valor_flete, 
		FORMAT((p.valor_declarado - p.valor_comision - p.valor_flete ), 0) as valor_recibir");

		$this->db->from('pedido p');
		$this->db->join('cuenta c', 'c.id_cuenta  = p.cuenta_id');
		$this->db->join('usuario u', 'u.cuenta_id  = c.id_cuenta');
		$this->db->join('municipio m', 'm.codigo_transportadora  = p.ciudad_destinatario');
		$this->db->join('transportadora t', 't.id_transportadora  = p.transportadora_id');
		$this->db->join('estado e', 'e.id_estado  = p.estado_id');
		$this->db->join('estado e2', 'e2.id_estado  = p.estado_liquidacion');

		$this->db->where("date(p.fecha_creacion) between '$fecha_ini' AND '$fecha_fin'");

		if($id_cuenta != "TODOS"){
			$this->db->where("p.cuenta_id",$id_cuenta);
		}

		$query = $this->db->get();

		if ($query->num_rows()> 0 ) {
			return $query->result();
		}
		
		return false;

	}

	function usuarios($id_cuenta){

		$this->db->select("
			u.id_usuario,
			u.fecha_registro,
			u.numero_documento,
			concat(u.nombre,' ',u.apellido) as usuario,
			u.email as email,
			u.celular,
			u.telefono_fijo,
			m.nombre  as ciudad,
			u.direccion,
			if(u.tipo_cuenta = 1, 'admin' , 'user' ) as tipo_user ,
			u.tipo_cuenta,
			u.banco,
			u.numero_cuenta_banco,
			e.estado"
		);

		$this->db->from('cuenta c');
		$this->db->join('usuario u', 'u.cuenta_id  = c.id_cuenta');
		$this->db->join('estado e', 'e.id_estado  = u.estado_id');
		$this->db->join('municipio m', 'm.id_municipio  = u.municipio_id',"LEFT");

		if($id_cuenta != "TODOS"){
			$this->db->where("c.id_cuenta",$id_cuenta);
		}

		$query = $this->db->get();

		if ($query->num_rows()> 0 ) {
			return $query->result();
		}
		
		return false;

	}
	
}