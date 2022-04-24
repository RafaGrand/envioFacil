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

	function getListaPedidos(){

		$this->db->select('
			p.id_pedido,
			p.fecha_creacion,
			p.id_remision,
			p.contenido, 
			p.nombre_destinatario, 
			p.direccion_destinatario,
			p.telefono_destinatario,
			m.nombre as ciudad,
			t.nombre as transportadora,
			e.estado,
			e.id_estado');
		$this->db->from('pedido p');
		$this->db->join('estado e', 'e.id_estado  = p.estado_id');
		$this->db->join('transportadora t', 't.id_transportadora  = p.transportadora_id');
		$this->db->join('municipio m', 'm.codigo_transportadora  = p.ciudad_destinatario','left');
		$this->db->where("p.cuenta_id",$this->session->userdata('id_cuenta'));

		$query = $this->db->get();

		if ($query->num_rows()>0) {
			return $query->result();
		}
		
		return false;
	}

}