<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
* 
*/
class mpedidos extends CI_Model{
	
	function __construct(){
		parent::__construct();
		$this->load->database();
	}

	function getPedido(){

        $this->db->select('id_pedido');
        $query = $this->db->get('pedidos');

        if ($query->num_rows()>0) {
			return $query->result();
		}
		
		return false;
    }

	function getMunicipio($id_dpto) {
		$this->db->select('id_municipio, nombre');
		$this->db->from('municipio m');
		$this->db->where("m.departamento_id = ".$id_dpto);
		$query = $this->db->get();

		if ($query->num_rows()>0) {
			return $query->result();
		}
		
		return false;
	}

	function getListaPedidos($id_estado = ''){

		$this->db->select("
			p.id_pedido,
			p.fecha_creacion,
			p.id_remision,
			p.codigo_remision,
			p.contenido, 
			p.nombre_destinatario, 
			p.direccion_destinatario,
			p.telefono_destinatario,
			m.nombre as ciudad,
			t.nombre as transportadora,
			e.estado,
			e.id_estado,
			CONCAT('- $',REPLACE(FORMAT(p.valor_comision ,0),',','.')) as valor_comision,
			CONCAT('$',REPLACE(FORMAT(p.valor_declarado ,0),',','.')) as valor_declarado,
			CONCAT('- $',REPLACE(FORMAT(p.valor_flete ,0),',','.')) as valor_flete,			
			CONCAT('$',REPLACE(FORMAT((p.valor_declarado) ,0),',','.')) as valor_cobrar,
			CONCAT('$',REPLACE(FORMAT((p.valor_declarado - p.valor_comision - p.valor_flete ) ,0),',','.')) as valor_recibir");
		$this->db->from('pedido p');
		$this->db->join('estado e', 'e.id_estado  = p.estado_id');
		$this->db->join('transportadora t', 't.id_transportadora  = p.transportadora_id');
		$this->db->join('municipio m', 'm.codigo_transportadora  = p.ciudad_destinatario','left');
		$this->db->where("p.cuenta_id",$this->session->userdata('id_cuenta'));
		$this->db->order_by('p.id_pedido', 'DESC');

		if(!empty($id_estado)){
			$this->db->where("p.estado_id",$id_estado);
		}

		$query = $this->db->get();

		if ($query->num_rows()>0) {
			return $query->result();
		}
		
		return false;
	}

	function actulizarDespachoGuia($ids_guias,$id_despacho,$codigo_despacho){

		for($i = 0; $i < count($ids_guias) ; $i++){

			$this->db->query("
            UPDATE pedido
                SET 
                    codigo_despacho   ='".$codigo_despacho."',
                    despacho_id 	  =".$id_despacho.",
					estado_id	      = ".self::DESPACHADO."
            WHERE codigo_remision = '".$ids_guias[$i]."' AND cuenta_id = ".$this->session->userdata('id_cuenta'));
		}
	}

	function guetGuiasSinLiquidarCuenta($id_cuenta){

		$this->db->select("
			p.id_pedido,
			date(p.fecha_creacion) as fecha,
			p.id_remision,
			p.codigo_remision,
			p.contenido, 
			p.nombre_destinatario, 
			p.direccion_destinatario,
			p.telefono_destinatario,
			m.nombre as ciudad,
			t.nombre as transportadora,
			e.estado,
			e.id_estado,
			UPPER(concat(u.nombre,' ',u.apellido)) as usuario,
			CONCAT('- $',REPLACE(FORMAT(p.valor_comision ,0),',','.')) as valor_comision,
			CONCAT('$',REPLACE(FORMAT(p.valor_declarado ,0),',','.')) as valor_declarado,
			CONCAT('- $',REPLACE(FORMAT(p.valor_flete ,0),',','.')) as valor_flete,			
			CONCAT('$',REPLACE(FORMAT((p.valor_declarado) ,0),',','.')) as valor_cobrar,
			CONCAT('$',REPLACE(FORMAT((p.valor_declarado - p.valor_comision - p.valor_flete ) ,0),',','.')) as valor_recibir");
		$this->db->from('pedido p');
		$this->db->join('cuenta c', 'c.id_cuenta  = p.cuenta_id');
        $this->db->join('usuario u', 'u.cuenta_id = c.id_cuenta');
		$this->db->join('estado e', 'e.id_estado  = p.estado_id');
		$this->db->join('transportadora t', 't.id_transportadora  = p.transportadora_id');
		$this->db->join('municipio m', 'm.codigo_transportadora  = p.ciudad_destinatario','left');
		$this->db->where("p.cuenta_id",$id_cuenta);
		$this->db->where("p.estado_liquidacion",11);
        $this->db->where("p.estado_id",10);
		$this->db->order_by('p.id_pedido', 'DESC');

		$query = $this->db->get();

		if ($query->num_rows()>0) {
			return $query->result();
		}
		
		return false;

	}
}