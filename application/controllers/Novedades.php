<?php
defined('BASEPATH') OR exit('No direct script access allowed');
// require_once APPPATH.'vendor/autoload.php';
// import webservice class
// use Coordinadora\WebService;
use Coordinadora\WebService;

class Novedades extends CI_Controller {
    public function __construct(){
		parent::__construct();
		$this->load->model('mnovedades');
		$this->load->model('mgenerales');
	}
	
	public function index(){

        if($this->session->userdata('login')){	
			
		    $this->load->view('base',[
                "base_url"              =>base_url(),
                "modulo"                =>'novedades.twig',
                "opcion_menu"           => 'novedades',
                "data_sesion"           => $this->mgenerales->getDataSesion(),
                "perfil_id"				=> $this->session->userdata('perfil_id'),
				"dataTablaUsuarios"		=> $this->mgenerales->getdataTablaUsuarios(),
                "departamentos"         => $this->mgenerales->getDepartamentos(),
                "listaNovedades"        => $this->mnovedades->getListaNovedades(),
                "listaNovedadesSinGestion"=> $this->mnovedades->getListaNovedades(self::SIN_GESTION),
                "GuiasSinLiquidar"		=> $this->mgenerales->getGuiasSinLiquidar()
            ]);

        }else{
            $this->load->view('base',["base_url"=>base_url(),"modulo"=>'login.twig']);
        }
	}
}
