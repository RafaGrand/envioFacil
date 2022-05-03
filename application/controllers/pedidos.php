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
                "departamentos"         => $this->mgenerales->getDepartamentos(),
                "listaPedidos"          => $this->mpedidos->getListaPedidos()
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

    function guardarPedido(){

        $dataSesion = $this->mgenerales->getDataSesion();
        $parametros = $this->input->post();
        $action = "Guias_generarGuia";

        $data = array(
            "codigo_remision"       => "",
            "id_remitente"          => $dataSesion['id_cuenta'],
            "nit_remitente"         => "",
            "fecha"                 => date('Y-m-d'),
            "id_cliente"            => 37587,
            "nombre_remitente"      => $dataSesion['nombre_user'],
            "direccion_remitente"   => $dataSesion['direccion'],    
            "telefono_remitente"    => $dataSesion['celular'],
            "ciudad_remitente"      => $dataSesion['codigo_trasportadora'],
            "nit_destinatario"      => "",
            "div_destinatario"      => "",
            "nombre_destinatario"   => $parametros['nombre_destinatario'], 
            "direccion_destinatario"=> $parametros['direccion_destinatario'],   
            "ciudad_destinatario"   => $parametros['municipio_destinatario'],
            "telefono_destinatario" => $parametros['telefono_destinatario'],
            "valor_declarado"       => $parametros['valor_declarado'],
            "codigo_cuenta"         => "",
            "codigo_producto"       => 0,
            "nivel_servicio"        => 1,
            "linea"                 => "",
            "contenido"             => $parametros['contenido'],
            "referencia"            => "",
            "observaciones"         => "",
            "estado"                => "IMPRESO", 
            "detalle"               => array(    
                "Agw_typeGuiaDetalle"   => array(          
                "peso"                  => (float)$parametros['peso'],
                "ubl"                   => "", 
                "alto"                  => (float)$parametros['alto'],
                "ancho"                 => (float)$parametros['ancho'],
                "largo"                 => (float)$parametros['largo'],
                "unidades"              => (float)1,
                "referencia"            => "12345678",
                "nombre_empaque"        => ""
                )
            ),
            "cuenta_contable"       =>"",
            "centro_costos"         =>"",
            "recaudos"              =>array(),
            "margen_izquierdo"      =>"",
            "margen_superior"       =>"",
            "usuario_vmi"           =>"",
            "formato_impresion"     =>"",
            "atributo1_nombre"      =>"",
            "atributo1_valor"       =>"",
            "notificaciones"        =>array(),
            "atributos_retorno"     =>array(
                "nit"           => "",
                "div"           => "",
                "nombre"        => "",
                "direccion"     => "",
                "codigo_ciudad" => "",
                "telefono"      => ""
            ),
            "nro_doc_radicados"     =>"",
            "nro_sobre"             =>"",
            "codigo_vendedor"       =>"",
            "usuario"               => "retabares.ws",
            "clave"                 => "c04dbbaa14d2c5600ff7f2ac6de2d5ae161bf1cb5a7df20ee7050db5bae5a945"
        );

        $resp = $this->soapCall($action, $data);

        if(!$resp){
            echo json_encode([
                'status'  	 => false,
                'message'    => "No hubo comunicacion con la transportadora, intente mas tarde o con otra trasportadora"
            ]);
            return;
        }

        $data_insert =[
            "nombre_remitente"          => $dataSesion['nombre_user'],
            "direccion_remitente"       => $dataSesion['direccion'],    
            "telefono_remitente"        => $dataSesion['celular'],
            "ciudad_remitente"          => $dataSesion['codigo_trasportadora'],
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
            "id_remision"               => $resp->id_remision,
            "codigo_remision"           => $resp->codigo_remision,
            "pdf_guia"                  => $resp->pdf_guia,
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
        
        echo json_encode([
            'status'  	 => true,
            'data'       => $resp
        ]);

    }
}