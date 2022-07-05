<?php
defined('BASEPATH') OR exit('No direct script access allowed');
// require_once APPPATH.'vendor/autoload.php';
// import webservice class
// use Coordinadora\WebService;
use Coordinadora\WebService;

class Reportes extends CI_Controller {
    public function __construct(){
		parent::__construct();
		$this->load->model('mreportes');
		$this->load->model('mgenerales');
	}
	
	public function index(){

        if($this->session->userdata('login')){	
			
		    $this->load->view('base',[
                "base_url"              =>base_url(),
                "modulo"                =>'reportes.twig',
                "opcion_menu"           => 'reportes',
                "data_sesion"           => $this->mgenerales->getDataSesion(),
                "perfil_id"				=> $this->session->userdata('perfil_id'),
				"dataTablaUsuarios"		=> $this->mgenerales->getdataTablaUsuarios(),
                "departamentos"         => $this->mgenerales->getDepartamentos()
            ]);

        }else{
            $this->load->view('base',["base_url"=>base_url(),"modulo"=>'login.twig']);
        }
	}
}
