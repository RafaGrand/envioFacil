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
        $this->load->model('musuario');
	}
	
	public function index(){

        if($this->session->userdata('login')){	
			
		    $this->load->view('base',[
                "base_url"              =>base_url(),
                "modulo"                =>'reportes.twig',
                "opcion_menu"           => 'reportes',
                "data_sesion"           => $this->mgenerales->getDataSesion(),
                "perfil_id"				=> $this->session->userdata('perfil_id'),
                "listaUsuario"         => $this->musuario->getListaUsariosSelect()                
            ]);

        }else{
            $this->load->view('base',["base_url"=>base_url(),"modulo"=>'login.twig']);
        }
	}

    function liquidacion_de_guias(){

        if(!isset($_GET['fecha_ini'],$_GET['fecha_fin'])){
			"Faltan parametros";
            return;
		}

        if(!isset($_GET['id_cuenta'])){
            $id_cuenta = $this->session->userdata('id_cuenta');
        }else{
            $id_cuenta = $_GET['id_cuenta'];
        }


	    header("Content-Type:application/vnd.ms-excel");
		header("Content-Disposition: attachment; filename=liquidacion_guias.xls");

		$response = $this->mreportes->liquidacion_de_guias($_GET['fecha_ini'],$_GET['fecha_fin'],$id_cuenta);
		
		$this->load->view('reportes/liquidacion_de_guias.twig',["dataReporte" => $response]);

    }
}
