<?php
/**
 * CodeIgniter
 *
 * An open source application development framework for PHP
 *
 * This content is released under the MIT License (MIT)
 *
 * Copyright (c) 2014 - 2018, British Columbia Institute of Technology
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @package	CodeIgniter
 * @author	EllisLab Dev Team
 * @copyright	Copyright (c) 2008 - 2014, EllisLab, Inc. (https://ellislab.com/)
 * @copyright	Copyright (c) 2014 - 2018, British Columbia Institute of Technology (http://bcit.ca/)
 * @license	http://opensource.org/licenses/MIT	MIT License
 * @link	https://codeigniter.com
 * @since	Version 1.0.0
 * @filesource
 */
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Application Controller Class
 *
 * This class object is the super class that every library in
 * CodeIgniter will be assigned to.
 *
 * @package		CodeIgniter
 * @subpackage	Libraries
 * @category	Libraries
 * @author		EllisLab Dev Team
 * @link		https://codeigniter.com/user_guide/general/controllers.html
 */
class CI_Controller {

	CONST BYTES_MAX_ARCHIVO = 2097152;
    CONST ESTADO_ACTIVO     = 1;
	CONST ESTADO_BLOQUEADO  = 2;
	CONST ESTADO_SUSPENDIDO = 3;
	CONST ESTADO_LIQUIDADO  = 4;
    CONST ESTADO_ELIMINADO  = 5;
    CONST ESTADO_EN_PROCESO = 6;
    CONST SIN_DESPACHO      = 9;
    CONST DESPACHADO        = 10;    

    CONST CLASE_SALARIO 			= 1;
	CONST CLASE_AUX_TRANSPORTE 		= 2;
	CONST CLASE_HORA_EXTRA 	        = 3;
	CONST CLASE_DESCUENTO_SALUD 	= 17;
	CONST CLASE_DESCUENTO_PENSION 	= 18;

	CONST CONCEPTO_PAGO 	 = 'P';
	CONST CONCEPTO_DESCUENTO = 'D';
	CONST CONCEPTO_PROVISION = 'D';

    CONST TIPO_NOVEAD_PAGO_DESCUENTO = 1;
	CONST TIPO_NOVEAD_EMPLEADO 		 = 2;

    CONST PERFIL_ADMIN = 1;
    CONST PERFIL_USUARIO = 2;

    CONST NIT = 1004736927;

    CONST PORCENTAJE_COMISION = 0.06;

	/**
	 * Reference to the CI singleton
	 *
	 * @var	object
	 */
	private static $instance;

	/**
	 * Class constructor
	 *
	 * @return	void
	 */
	public function __construct()
	{
		self::$instance =& $this;

		// Assign all the class objects that were instantiated by the
		// bootstrap file (CodeIgniter.php) to local class variables
		// so that CI can run as one big super object.
		foreach (is_loaded() as $var => $class)
		{
			$this->$var =& load_class($class);
		}

		$this->load =& load_class('Loader', 'core');
		$this->load->initialize();
		log_message('info', 'Controller Class Initialized');
	}

	// --------------------------------------------------------------------

	/**
	 * Get the CI singleton
	 *
	 * @static
	 * @return	object
	 */
	public static function &get_instance()
	{
		return self::$instance;
	}

	function subirArchivo($ruta, $archivo=[],$tipos='',$tipo = '') {

        $response = new stdClass();
        $path_upload = $ruta ;

        $file = array();
        $file = file($archivo["tmp_name"]);

        if (!is_uploaded_file($archivo['tmp_name'])){
            $response->respuesta = 'ERROR';
            $response->error = 'Tipo de cargue invalido.';
            return $response;
        }

        if (!file_exists($path_upload)){
            mkdir($path_upload, 0755);
        }

        switch ($tipo) {
            case 'application/pdf':
                $ext = 'pdf';
                break;
            case 'image/png':
                $ext = 'png';
                break;
            case 'image/jpeg':
                $ext = 'jpeg';
                break;
            case 'image/jpg':
                $ext = 'jpg';
                break;
            case 'image/gif':
                $ext = 'gif';
                break;
            case 'text/plain':
                $ext = 'txt';
                break;
            case 'text/csv':
                $ext = 'csv';
                break;
            case 'application/vnd.ms-excel':
                $ext = 'xls';
                break;
            case 'application/vnd.oasis.opendocument.spreadsheet':
                    $ext = 'ods';
                    break;
            case 'application/msword':
                $ext = 'doc';
                break;
            default :
                $ext = explode('.',$archivo['name']);
                $ext = array_pop($ext);
        }

        $filename = uniqid(time()) . "." . $ext;

        if ($tipos!='') {
            $extensiones = explode(',', $tipos);

            if (!in_array($ext,$extensiones)) {
                $response->respuesta = 'ERROR';
                $response->descripcion = "El tipo de archivo no es permitido.";
                return $response;
            }
        }

        try {

            move_uploaded_file($archivo["tmp_name"], $path_upload . $filename);
            // return   chmod($path_upload ."/",0760);
            // exit;


        } catch (Exception $e) {
            $response->respuesta = 'ERROR';
            $response->error = $e;
            return $response;
        }
        //echo $path_upload . $filename;

        if (file_exists($path_upload . $filename)){
            $response->respuesta = 'OK';
            $response->filename = $filename;
            $response->label = $archivo['name'];
            return $response;
        }else {
            $response->respuesta = 'ERROR';
            $response->error = "Error intentando subir archivo ";
            return $response;
        }
    }

	function EliminarArchivo($filename){// se crea esta funcion para elminar archivos (NO DIRECTORIOS)

        $response = new stdClass();
        $response->estado = false;
        $response->mensaje = '';      

        if(file_exists($filename)){

            $estado = unlink($filename);
            $response->estado = $estado;
            $response->mensaje = $estado ? 'Archivo eliminado' : 'No fue posible eliminar el archivo';

        }else {
            $response->mensaje = 'No se encontro el archivo';
        }

        return $response;
    }

    function generarPdfBase64($base64){

        $decoded = base64_decode($base64);
        $file = 'temp/descarga.pdf';
        file_put_contents($file, $decoded);

        if (file_exists($file)) {
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="'.basename($file).'"');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($file));
            readfile($file);
            exit;
        }

    }

}
