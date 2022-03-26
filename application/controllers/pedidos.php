<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pedidos extends CI_Controller {
	
	public function __construct(){
		parent::__construct();
		$this->load->model('mpedidos');
		$this->load->model('mgenerales');
        $this->location = "https://sandbox.coordinadora.com/agw/ws/guias/1.6/server.php";
        // $this->guiasCiudades = new GuiasCiudades(); 
        // $this->load->model('mempresa');
	}
	
	public function index(){

        if($this->session->userdata('login')){	
			
		    $this->load->view('base',[
                "base_url"              =>base_url(),
                "modulo"                =>'pedidos.twig',
                "opcion_menu"           => 'pedidos',
                "data_sesion"           => $this->mgenerales->getDataSesion(),
                "perfil_id"				=> $this->session->userdata('perfil_id'),
				"dataTablaUsuarios"		=> $this->mgenerales->getdataTablaUsuarios(),
            ]);

        }else{
            $this->load->view('base',["base_url"=>base_url(),"modulo"=>'pedidos.twig']);
        }
	}

    function verCoberturas() {
        $parametros = $this->input->post();

        if(isset($parametros['usuario'],$parametros['clave'])) {

            $action = "Guias_ciudades";

            $client = new SoapClient($this->location.'?wsdl', array(
                'classmap'=>array('Agw_ciudadesIn'=>'Agw_ciudadesIn'),
                'debug'=>true,
                'trace'=>true
            ));
            try {
                $info = new Agw_ciudadesIn();
                $resp = $client->$action($info);
            
            
            } catch(Exception $e) {
                var_dump($e);
            }

            // echo("<pre>".print_r(json_encode($resp))."</pre>");
            echo json_encode([
                'status'  	 => true,
                'message'    => $resp
            ]);
        }
    }

    function lista_municipio(){
        $parametros = $this->input->post();
        if(isset($parametros['codigo'])) {
            $municipios = $this->mpedidos->getMunicipios($parametros['codigo']);
        }
        echo json_encode($municipios);
    }

    function lista_departamento(){
        $parametros = $this->input->post();
        $departamentos = $this->mpedidos->getDepartamentos();

        echo json_encode($departamentos);
    }
}

class Agw_ciudadesIn{
    public $usuario = 'retabares.ws';
    public $clave = 'c04dbbaa14d2c5600ff7f2ac6de2d5ae161bf1cb5a7df20ee7050db5bae5a945';
}