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


	function getCoberturaTransportadora($codigo_transportadora) {

		$this->db->select('estado_id,activo_coordinadora');
		$this->db->from('municipio m');
		$this->db->where("codigo_transportadora = ".$codigo_transportadora);
		$query = $this->db->get();
		if ($query->num_rows()>0) {
			return $query->row();
		}
		return false;
	}

	function getListaPedidos($id_estado = '',$tipo_busqueda = 'TODOS'){

		$this->db->select("
			p.id_pedido,
			p.fecha_creacion,
			p.id_remision,
			p.codigo_remision,
			p.contenido, 
			p.nombre_destinatario, 
			p.direccion_destinatario,
			p.telefono_destinatario,
			p.transportadora_id,
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

		$this->db->where("p.estado_liquidacion <>",4);
		
		if($tipo_busqueda != "TODOS"){
			$this->db->where("p.cuenta_id",$this->session->userdata('id_cuenta'));
		}
		
		$this->db->order_by('p.id_pedido', 'DESC');

		if(!empty($id_estado)){
			$this->db->where("p.estado_id",$id_estado);
		}else{
			$this->db->where("p.estado_id <>".self::ESTADO_ANULADO);
		}

		$query = $this->db->get();

		if ($query->num_rows()>0) {
			return $query->result();
		}
		
		return false;
	}

	function getListaPedidosCambioEstado(){

		$this->db->select("
			p.codigo_remision");
		$this->db->from('pedido p');
		$this->db->where("p.cuenta_id",$this->session->userdata('id_cuenta'));
		$this->db->where("p.transportadora_id",1);
		$this->db->order_by('p.id_pedido', 'DESC');
		$this->db->where_not_in("p.estado_id",[self::ESTADO_ANULADO,self::ESTADO_ENTREGADO,self::CERRADA]);
	
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
			transportadora_id,
			t.nombre as transportadora,
			e.estado,
			e.id_estado,
			UPPER(concat(u.nombre,' ',u.apellido)) as usuario,
			CONCAT('- $',REPLACE(FORMAT(p.valor_comision ,0),',','.')) as valor_comision,
			CONCAT('$',REPLACE(FORMAT(p.valor_declarado ,0),',','.')) as valor_declarado,
			CONCAT('- $',REPLACE(FORMAT(p.valor_flete ,0),',','.')) as valor_flete,			
			CONCAT('$',REPLACE(FORMAT((p.valor_declarado) ,0),',','.')) as valor_cobrar,
			CONCAT('$',REPLACE(FORMAT((p.valor_declarado - p.valor_comision - p.valor_flete ) ,0),',','.')) as valor_recibir,
			p.estado_recaudo");
		$this->db->from('pedido p');
		$this->db->join('cuenta c', 'c.id_cuenta  = p.cuenta_id');
        $this->db->join('usuario u', 'u.cuenta_id = c.id_cuenta');
		$this->db->join('estado e', 'e.id_estado  = p.estado_id');
		$this->db->join('transportadora t', 't.id_transportadora  = p.transportadora_id');
		$this->db->join('municipio m', 'm.codigo_transportadora  = p.ciudad_destinatario','left');
		$this->db->where("p.cuenta_id",$id_cuenta);
		$this->db->where("p.estado_liquidacion",self::ESTADO_PENDIENTE);
        $this->db->where("p.estado_id",self::ESTADO_ENTREGADO);
		$this->db->order_by('p.id_pedido', 'DESC');

		$query = $this->db->get();

		if ($query->num_rows()>0) {
			return $query->result();
		}
		
		return false;

	}

	function cambarEstadoGuia($codigo_remision,$intento = 1,$estado){

		$this->db->query("
            UPDATE pedido
                SET 
                    estado_id         =".$estado."
            WHERE codigo_remision ='".$codigo_remision."'");

		if ($this->db->affected_rows() == 0) {
			/*$this->cambarEstadoGuia($codigo_remision,2,$estado);
			if($intento == 2){
				return false;
			}*/
			return false;
		}

		return true;
	}

	function getDataPedido($id_pedido){

		$this->db->select("
			p.id_pedido,
			p.nombre_remitente,
			p.direccion_remitente,
			p.telefono_remitente,
			p.ciudad_remitente,
			p.nombre_destinatario,
			p.direccion_destinatario,
			p.ciudad_destinatario,
			p.telefono_destinatario,
			p.valor_declarado,
			p.valor_comision,
			p.valor_flete,
			p.dias_entrega,
			p.contenido,
			p.alto,
			p.ancho,
			p.largo,
			p.peso,
			p.unidades,
			p.id_remision,
			p.codigo_remision,
			p.transportadora_id,
			m.id_municipio,
			m.departamento_id");
		$this->db->from('pedido p');
		$this->db->join('municipio m', 'm.codigo_transportadora  = p.ciudad_destinatario');
		$this->db->where("p.id_pedido",$id_pedido);

		$query = $this->db->get();

		if ($query->num_rows()>0) {
			return $query->row();
		}
		
		return false;

	}

	function actulizarEstadoRecaudoGuia($codigo_remision,$estado){

		$this->db->query("
            UPDATE pedido
                SET 
				estado_recaudo         ='".$estado."'
            WHERE codigo_remision ='".$codigo_remision."'");

		if ($this->db->affected_rows() == 0) {
			return false;
		}

		return true;

	}

	function actulizarEstadoLiquidacion($id_pedido,$id_estado,$observacion = ''){

		$this->db->query("
            UPDATE pedido
                SET 
				estado_liquidacion         ='".$id_estado."',
				observacion_liquidacion    ='".$observacion."'
            WHERE id_pedido =".$id_pedido);

		if ($this->db->affected_rows() == 0) {
			return false;
		}

		return true;

	}
}