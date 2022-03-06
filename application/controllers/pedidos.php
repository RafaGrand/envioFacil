<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pedidos extends CI_Controller {
	
	public function __construct(){
		parent::__construct();
		$this->load->model('mpedidos');
		$this->load->model('mgenerales');
        // $this->load->model('mempresa');
	}
	
	public function index(){

        if($this->session->userdata('login')){	
			
		    $this->load->view('base',[
                "base_url"              =>base_url(),
                "modulo"                =>'pedidos.twig',
            ]);

        }else{
            $this->load->view('base',["base_url"=>base_url(),"modulo"=>'pedidos.twig']);
        }
	}
}