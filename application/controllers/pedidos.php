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

    function soapCall($action, $params) {
        $client = new SoapClient($this->location.'?wsdl');
        try {
            $resp = $client->$action($params);
            return $resp;

        } catch(Exception $e) {
            var_dump($e);
        }
    }

    function verCoberturas() {
        $parametros = $this->input->post();

        if(isset($parametros['usuario'],$parametros['clave'])) {

            $action = "Guias_ciudades";

            $resp = $this->soapCall($action, $parametros);

            echo json_encode([
                'status'  	 => true,
                'message'    => $resp
            ]);
        }
    }

    function rastreoSimple() {
        $parametros = $this->input->post();

        if(isset($parametros['usuario'],$parametros['clave'],$parametros['codigo_remision'])) {
            $action = "Guias_rastreoSimple";

            $resp = $this->soapCall($action, $parametros);

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