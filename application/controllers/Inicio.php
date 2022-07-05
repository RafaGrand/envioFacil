<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inicio extends CI_Controller {
	
	public function __construct(){
		parent::__construct();
		$this->load->model('musuario');
		$this->load->model('mgenerales');
	}
	
	public function index(){

        if($this->session->userdata('login')){	
				
		    $this->load->view('base',[
                "base_url"              =>base_url(),
                "modulo"                =>'inicio.twig',
				"opcion_menu"           => 'inicio',
				"data_sesion"           => $this->mgenerales->getDataSesion(),
				"perfil_id"				=> $this->session->userdata('perfil_id'),
				"dataTablaUsuarios"		=> $this->mgenerales->getdataTablaUsuarios(),
				"pedidosDespachados"    => $this->mgenerales->getCountDespachados(),
				"pedidosSinDespacho"    => $this->mgenerales->getCountNoDespachados(),
				//"GuiasSinLiquidar"		=> $this->mgenerales->getGuiasSinLiquidar(),
				"valorGuiasEntregadas"	=> $this->mgenerales->getValorGuiasEntregadas(),
				"departamentos"         => $this->mgenerales->getDepartamentos(),
            ]);

        }else{
            $this->load->view('base',["base_url"=>base_url(),"modulo"=>'login.twig']);
        }
	}
}