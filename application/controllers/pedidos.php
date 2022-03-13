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

            $request = " 
            <soapenv:Envelope 
                xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" 
                xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" 
                xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" 
                xmlns:ser=\"https://sandbox.coordinadora.com/agw/ws/guias/1.6/server.php\"
            >
                <soapenv:Header/>
                <soapenv:Body>
                    <ser:Guias_ciudades soapenv:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\">
                        <p xsi:type=\"ser:Agw_ciudadesIn\">
                            <usuario xsi:type=\"xsd:string\">".$parametros['usuario']."</usuario>
                            <clave xsi:type=\"xsd:string\">".$parametros['clave']."</clave>
                        </p>
                    </ser:Guias_ciudades>
                </soapenv:Body>
            </soapenv:Envelope>
            ";

            // print("Request: <br>");
            // print("<pre>".htmlentities($request)."</pre>");


            $action = "Guias_ciudades";
            $headers = [
                'Method: POST',
                'Connection: Keep-Alive',
                'User-Agent: PHP-SOAP-CURL',
                'Content-Type: text/xml; charset=utf-8',
                'SOAPAction: '.$action,
            ];

            $ch = curl_init($this->location);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $request);
            curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);

            $response = curl_exec($ch);
            $err_status = curl_error($ch);

            // print("Response: <br>");
            // print("<pre>".$response."</pre>");
           
            echo json_encode([
                'status'  	 => true,
                'message'    => $response
            ]);
        }
    }

    function lista_municipio(){
        $parametros = $this->input->post();
        if(isset($parametros['id_departamento'])) {
            
            $municipios = $this->mpedidos->getMunicipios($parametros['id_departamento']);
        }

        echo json_encode($municipios);
    }

    function lista_departamento(){
        $parametros = $this->input->post();
        $departamentos = $this->mpedidos->getDepartamentos();

        echo json_encode($departamentos);
    }
}