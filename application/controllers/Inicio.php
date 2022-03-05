<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inicio extends CI_Controller {
	
	public function __construct(){
		parent::__construct();
		$this->load->model('musuario');
		$this->load->model('mgenerales');
        $this->load->model('mempresa');
	}
	
	public function index(){

        if($this->session->userdata('login')){	
			
		    $this->load->view('base',[
                "base_url"              =>base_url(),
                "modulo"                =>'inicio.twig',
				/*"data_sesion"           => $this->mgenerales->getDataSesion(),
                "sector_comercial"      => $this->mempresa->getSectorComercial(),
                "cantidad_empresas"     => $this->musuario->UserCountEmpresa($this->session->userdata('id_usuario')),
				"lista_empresa"         => $this->mempresa->getListaEmpresa($this->session->userdata('id_usuario')),
				"id_empresa"            => $this->session->userdata('id_empresa'),
				"name_user"             => $this->session->userdata('nombre')*/
            ]);

        }else{
            $this->load->view('base',["base_url"=>base_url(),"modulo"=>'login.twig']);
        }
	}
}