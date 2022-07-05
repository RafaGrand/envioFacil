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
 * Model Class
 *
 * @package		CodeIgniter
 * @subpackage	Libraries
 * @category	Libraries
 * @author		EllisLab Dev Team
 * @link		https://codeigniter.com/user_guide/libraries/config.html
 */
class CI_Model {

	CONST ESTADO_ACTIVO     = 1;
	CONST ESTADO_BLOQUEADO  = 2;
	CONST ESTADO_SUSPENDIDO = 3;
	CONST ESTADO_LIQUIDADO  = 4;
	CONST ESTADO_ELIMINADO  = 5;
	CONST IMPRESO    		= 9; 
	CONST DESPACHADO        = 10;   
	CONST ESTADO_PENDIENTE 	= 11;
	CONST ESTADO_ANULADO 	= 12;
	CONST ESTADO_ENTREGADO 	= 13;
	CONST ESTADO_RECHAZADO  = 14;


	CONST CLASE_SALARIO 			= 1;
	CONST CLASE_AUX_TRANSPORTE 		= 2;
	CONST CLASE_HORA_EXTRA 	        = 3;
	CONST CLASE_DESCUENTO_SALUD 	= 17;
	CONST CLASE_DESCUENTO_PENSION 	= 18;

	CONST CONCEPTO_PAGO 	 = 'P';
	CONST CONCEPTO_DESCUENTO = 'D';
	CONST CONCEPTO_PROVISION = 'A';

	CONST TIPO_NOVEAD_PAGO_DESCUENTO = 1;
	CONST TIPO_NOVEAD_EMPLEADO 		 = 2;

	/**
	 * Class constructor
	 *
	 * @link	https://github.com/bcit-ci/CodeIgniter/issues/5332
	 * @return	void
	 */
	public function __construct() {}

	/**
	 * __get magic
	 *
	 * Allows models to access CI's loaded classes using the same
	 * syntax as controllers.
	 *
	 * @param	string	$key
	 */
	public function __get($key)
	{
		// Debugging note:
		//	If you're here because you're getting an error message
		//	saying 'Undefined Property: system/core/Model.php', it's
		//	most likely a typo in your model code.
		return get_instance()->$key;
	}

}
