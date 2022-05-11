<?php
defined('BASEPATH') OR exit('No direct script access allowed');
// require_once APPPATH.'vendor/autoload.php';
// import webservice class
// use Coordinadora\WebService;
use Coordinadora\WebService;

class Pedidos extends CI_Controller {

    public $webservice;
	
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
                "departamentos"         => $this->mgenerales->getDepartamentos(),
                "listaPedidos"          => $this->mpedidos->getListaPedidos(),
                "listaPedidosSinDespacho"=> $this->mpedidos->getListaPedidos(self::SIN_DESPACHO)
            ]);

        }else{
            $this->load->view('base',["base_url"=>base_url(),"modulo"=>'login.twig']);
        }
	}

    function soapCall($action, $params) {

        $client = new SoapClient($this->location.'?wsdl');

        try {
            $resp = $client->$action($params);
            return $resp;

        } catch(Exception $e) {
            //crear log que guarde la respuesta erronea
            return false;
        }
    }

    function verCoberturas() {

        $parametros = [];
        $parametros['usuario'] = 'retabares.ws';
        $parametros['clave']   = 'c04dbbaa14d2c5600ff7f2ac6de2d5ae161bf1cb5a7df20ee7050db5bae5a945';
        $action                = "Guias_ciudades";

        $resp = $this->soapCall($action, $parametros);

        echo json_encode([
            'status'  	 => true,
            'data'       => $resp
        ]);
        
    }

    function lista_municipio(){
        $parametros = $this->input->post();

        if(isset($parametros['departamento_id'])) {
            $municipios = $this->mgenerales->getMunicipios($parametros['departamento_id']);
        }

        if(!$municipios){

            echo json_encode([
                "status" => false,
                "message"=> "No hay municipios disponibles"
            ]);

            return;
        }

        echo json_encode([
            "status" => true,
            "message"=> "",
            "data"   => $municipios
        ]);

    }

    function lista_departamento(){
        $parametros = $this->input->post();
        $departamentos = $this->mpedidos->getDepartamentos();

        echo json_encode($departamentos);
    }

    function getWS() {
        $apikey = 'c513d8b8-82de-11ec-a8a3-0242ac120002'; // your apikey of Coordinadora
        $password = 'fQ9uR3kM1xI4wM6h'; // your password of Coordinadora
        $nit = '1004736927'; //your nit

        //guides
        $id_client = '37587'; //your id client
        $user_guide = 'retabares.ws'; //your user
        $password_guide = 'c04dbbaa14d2c5600ff7f2ac6de2d5ae161bf1cb5a7df20ee7050db5bae5a945'; //your password


        try{
            $coordinadora = new WebService($apikey, $password, $nit, $id_client, $user_guide, $password_guide);
            $coordinadora->sandbox_mode(true); //true for tests or false for production
            return $coordinadora;
        }
        catch (\Exception $exception){
            echo $exception->getMessage();
        }
    }

    function guardarPedido(){

        $dataSesion = $this->mgenerales->getDataSesion();
        $parametros = $this->input->post();

        $coordinadora = $this->getWS();

        $cart_prods[] = (object)array(
            "peso"                  => (float)$parametros['peso'],
            "ubl"                   => "0", 
            "alto"                  => (float)$parametros['alto'],
            "ancho"                 => (float)$parametros['ancho'],
            "largo"                 => (float)$parametros['largo'],
            "unidades"              => (float)1,
            "referencia"            => "12345678",
            "nombre_empaque"        => "some name"
        );


        $params = array(
            'codigo_remision' => '',
            'fecha' => '',
            'id_remitente' => $dataSesion['id_cuenta'],
            'nit_remitente' => '',
            'nombre_remitente' => $dataSesion['nombre_user'],
            "direccion_remitente"   => $dataSesion['direccion'],    
            "telefono_remitente"    => $dataSesion['celular'],
            "ciudad_remitente"      => $dataSesion['codigo_transportadora'],
            'nit_destinatario' => '0',
            'div_destinatario' => '0',
            "nombre_destinatario"   => $parametros['nombre_destinatario'], 
            "direccion_destinatario"=> $parametros['direccion_destinatario'],   
            "ciudad_destinatario"   => $parametros['municipio_destinatario'],
            "telefono_destinatario" => $parametros['telefono_destinatario'],
            "valor_declarado"       => $parametros['valor_declarado'],
            'codigo_cuenta' => "2",
            'codigo_producto' => "0",
            'nivel_servicio' => "1",
            'linea' => '',
            "contenido" => $parametros['contenido'],
            'referencia' => 'refeeradd',
            'observaciones' => '',
            'estado' => 'IMPRESO',
            'detalle' => $cart_prods,
            'cuenta_contable' => '',
            'centro_costos' => '',
            'recaudos' => '',
            'margen_izquierdo' => '',
            'margen_superior' => '',
            'id_rotulo' => '0',
            'usuario_vmi' => '',
            'formato_impresion' => '',
            'atributo1_nombre' => '',
            'atributo1_valor' => '',
            'notificaciones' => (object)array(
            ),
            'atributos_retorno' => (object)array(
                'nit' => '',
                'div' => '',
                'nombre' => '',
                'direccion' => '',
                'codigo_ciudad' => '',
                'telefono' => ''
            ),
            'nro_doc_radicados' => '',
            'nro_sobre' => '',
        );

        try{

            $data = $coordinadora->Guias_generarGuia($params);

            if(!$data){
                echo json_encode([
                    'status'  	 => false,
                    'message'    => "No hubo comunicacion con la transportadora, intente mas tarde o con otra transportadora"
                ]);
                return;
            }

            if(!isset($data->id_remision)){

                echo json_encode([
                    'status'  	 => false,
                    'message'    => $data
                ]);
                return;
            }
    
            $data_insert =[
                "nombre_remitente"          => $dataSesion['nombre_user'],
                "direccion_remitente"       => $dataSesion['direccion'],    
                "telefono_remitente"        => $dataSesion['celular'],
                "ciudad_remitente"          => $dataSesion['codigo_transportadora'],
                "nombre_destinatario"       => $parametros['nombre_destinatario'], 
                "direccion_destinatario"    => $parametros['direccion_destinatario'],   
                "ciudad_destinatario"       => $parametros['municipio_destinatario'],
                "telefono_destinatario"     => $parametros['telefono_destinatario'],
                "valor_declarado"           => $parametros['valor_declarado'],
                "contenido"                 => $parametros['contenido'],
                "alto"                      => $parametros['alto'],
                "ancho"                     => $parametros['ancho'],
                "largo"                     => $parametros['largo'],
                "peso"                      => $parametros['peso'], 
                "unidades"                  => 1,
                "id_remision"               => $data->id_remision,
                "codigo_remision"           => $data->codigo_remision,
                "pdf_guia"                  => $data->pdf_guia,
                "cuenta_id"                 => $dataSesion['id_cuenta'],
                "transportadora_id "        => 1
            ];    
    
    
            $id_pedido = $this->mgenerales->InsertarElemento('pedido',$data_insert);
    
            if(!$id_pedido){
                //Implementar metodo para cancelar la remision generada en caso tal de que no se pueda insetar en al base de datos 
                echo json_encode([
                    'status'  	 => false,
                    'message'    => "No fue posible guardar el pedido en la base de datos, se procede a cancelar el codigo de remision ".$resp->id_remision. ". Por favor intente nuevamente"
                ]);
                return;
            }
                        
        }
        catch (\Exception $exception){

            if(!is_array($data)){
                echo json_encode([
                    'status'  	 => false,
                    'message'    => $exception->getMessage()
                ]);
                return;
            } 
        }
        
        echo json_encode([
            'status'  	 => true,
            'data'       => $data
        ]);

        return;

    }
    function generarDespachoGuias(){

        $parametros   = $this->input->post();
        $coordinadora = $this->getWS();

        if(!isset($parametros['checkDP'])){

            echo json_encode([
                'status'  	 => false,
                'message'    => "No se selecciono ninguna guia"
            ]);
            return;
        }
        
        $ids_guias = $parametros['checkDP'];

        $params = array(
            'guias' => $ids_guias,
            'margen_izquierdo' => 10,
            'margen_superior' => 10,
            'tipo_impresion' => 'LASER',
        );

        try{

            $data = $coordinadora->Guias_generarDespacho($params);
        
            if(!$data){
                echo json_encode([
                    'status'  	 => false,
                    'message'    => "No hubo comunicacion con la transportadora, intente mas tarde o con otra transportadora"
                ]);
                return;
            }

            if(!is_array($data)){
                echo json_encode([
                    'status'  	 => false,
                    'message'    => $data 
                ]);
                return;
            }
            
            $data_insert =[
                "url_pdf"                   => $data[0]->url,
                "pdf"                       => $data[0]->impresion,
                "codigo_despacho"           => $data[0]->codigo_despacho,
                "div_cliente"               => $data[0]->div_cliente,
                "cuenta_id"                 => $this->session->userdata('id_cuenta')
            ];
    
            $id_despacho = $this->mgenerales->InsertarElemento('despacho',$data_insert);
    
            if(!$id_despacho){

                $this->mpedidos->actulizarDespachoGuia($ids_guias,0,$data[0]->codigo_despacho);

                echo json_encode([
                    'status'  	 => false,
                    'message'    => "No fue posible guardar el despacho en la base de datos pero la transportadora si lo registro, por favor tome nota de su numero de desapacho <b>".$data[0]->codigo_despacho."</b>"
                ]);
                return;
            }else{
                $this->mpedidos->actulizarDespachoGuia($ids_guias,$id_despacho,$data[0]->codigo_despacho);
            }
            
        }
        catch (\Exception $exception){
            echo json_encode([
                'status'  	 => false,
                'message'    => $exception->getMessage()
            ]);
            return;
        }

        echo json_encode([
            'status'  	 => true,
            'message'       => "Despacho <b>".$data[0]->codigo_despacho."</b> generado de forma correcta"
        ]);

        return;

    }

    function descargarrotulo($id_remision = 0){

        $coordinadora = $this->getWS();

        if(isset($_GET['id_remision'])){
            $id_remision = $_GET['id_remision'];
        }

         $params = array(
            'id_rotulo' => 5,
            'codigos_remisiones' => array($id_remision)
        );

        $data = $coordinadora->Guias_imprimirRotulos($params);

        if($data->error){

            echo $data->errorMessage;
            return;

        }

        $this->generarPdfBase64($data->rotulos);
    }

    function rastrear_pedido() {
        $coordinadora = $this->getWS();
        $parametros = $this->input->post();
        if(isset($parametros['codigo_remision'])) {
            $params = ['codigos_remision'=>[$parametros['codigo_remision']]];
            $data = $coordinadora->Guias_rastreoSimple($params);
            if(!$data){
                echo json_encode([
                    'status'  	 => false,
                    'message'    => "No hubo comunicacion con la transportadora, intente mas tarde o con otra transportadora"
                ]);
                return;
            } else {
                echo json_encode([
                    'status'  	 => true,
                    'message'    => $data
                ]);
                return;
            }            
        }

    }

}