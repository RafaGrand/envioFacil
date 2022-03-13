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

}