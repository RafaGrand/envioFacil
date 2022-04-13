CREATE TABLE estado (
    id_estado int not null AUTO_INCREMENT,
    estado varchar (20),
    observacion varchar (100),
    PRIMARY KEY (id_estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE perfil (
    id_perfil int not null AUTO_INCREMENT,
    perfil varchar (20),
    observacion varchar (100),
    PRIMARY KEY (id_perfil)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE departamento (
	id_departamento int(11) NOT NULL AUTO_INCREMENT,
	nombre varchar(255) NOT NULL,
	codigo int(20) NOT NULL,
	PRIMARY KEY (id_departamento),
    estado_id int not null DEFAULT 1,
    FOREIGN KEY (estado_id)
	    REFERENCES estado(id_estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE municipio (
	id_municipio int(11) NOT NULL AUTO_INCREMENT,
	departamento_id int(11) NOT NULL,
	codigo_trasportadora int(8) unsigned zerofill,
	nombre varchar(255) NOT NULL,
	PRIMARY KEY(id_municipio),
    estado_id int not null DEFAULT 1,
	FOREIGN KEY (departamento_id)
	    REFERENCES departamento(id_departamento),
    FOREIGN KEY (estado_id)
	    REFERENCES estado(id_estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE cuenta (
    id_cuenta int not null AUTO_INCREMENT,
    fecha_registro datetime DEFAULT current_timestamp,
    observacion varchar (100),
    estado_id int not null DEFAULT 1,
    PRIMARY KEY (id_cuenta),
    FOREIGN KEY (estado_id)
	    REFERENCES estado(id_estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE usuario (
    id_usuario int not null AUTO_INCREMENT,
	clave varchar(50),
    nombre varchar(50),
    apellido varchar(50),
    celular varchar(10),
    telefono_fijo varchar(10),
    email varchar(60),
	fecha_registro datetime DEFAULT current_timestamp,
    estado_id int not null DEFAULT 1,
    cuenta_id int not null,
    perfil_id int not null DEFAULT 1,
	PRIMARY KEY (id_usuario),
    FOREIGN KEY (estado_id)
	    REFERENCES estado(id_estado),
    FOREIGN KEY (cuenta_id)
	    REFERENCES cuenta(id_cuenta),
    FOREIGN KEY (perfil_id)
	    REFERENCES perfil(id_perfil)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE profesion(
    id_profesion int not null AUTO_INCREMENT,
    codigo varchar(15),
    descripcion varchar(100),
    fecha_registro datetime DEFAULT current_timestamp,
    estado_id int not null DEFAULT 1,
    PRIMARY KEY (id_profesion),
    FOREIGN KEY (estado_id)
	    REFERENCES estado(id_estado)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE log_db (
    id_log_db bigint not null AUTO_INCREMENT,
    descripcion varchar(250),
    adicional varchar(100),
    fecha_registro datetime DEFAULT current_timestamp,
    PRIMARY KEY (id_log_db)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE sector_comercial(
    id_sector_comercial int not null AUTO_INCREMENT,
    sector_comercial varchar (60) not null,
    descripcion varchar(100),
    estado_id int not null DEFAULT 1,
    PRIMARY KEY (id_sector_comercial),
    FOREIGN KEY (estado_id)
	    REFERENCES estado(id_estado)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE regimen(
    id_regimen tinyint  not null AUTO_INCREMENT,
    codigo varchar(20),
    descripcion varchar(50),
    estado_id int not null DEFAULT 1,
    PRIMARY KEY (id_regimen),
    FOREIGN KEY (estado_id)
	    REFERENCES estado(id_estado)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE empresa(
    id_empresa int not null AUTO_INCREMENT,
    nombre varchar(80) not null,
    representante_legal varchar(60),
    documento_empresa varchar(15) not null,
    naturaleza ENUM ('PN','PJ') not null,
    telefono varchar(10),
    email varchar(60),
    direccion varchar(100),
    pais varchar(30) DEFAULT 'colombia',
    periodo_pago ENUM ('quincenal','mensual','semanal') DEFAULT 'quincenal',
    centros_costo ENUM ('si','no') DEFAULT 'no',
    fecha_creacion datetime DEFAULT current_timestamp,
    porcentaje_config tinyint,
    logo varchar(100) DEFAULT 'logo_empresa_default.png',
    sector_comercial_id int,
    municipio_id int,
    cuenta_id int not null,
    estado_id int not null DEFAULT 1,
    PRIMARY KEY (id_empresa),
    FOREIGN KEY (sector_comercial_id)
	    REFERENCES sector_comercial(id_sector_comercial),
    FOREIGN KEY (municipio_id)
	    REFERENCES municipio(id_municipio),
    FOREIGN KEY (cuenta_id)
	    REFERENCES cuenta(id_cuenta),
    FOREIGN KEY (estado_id)
	    REFERENCES estado(id_estado)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE cargo (
    id_cargo int not null AUTO_INCREMENT,
    nombre_cargo varchar(50) not null,
    fecha_creacion datetime DEFAULT current_timestamp,
    estado_id int not null DEFAULT 1,
    PRIMARY KEY (id_cargo),
    FOREIGN KEY (estado_id)
	    REFERENCES estado(id_estado)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE tipo_contrato (
    id_tipo_contrato int not null AUTO_INCREMENT,
    tipo_contrato varchar(50) not null,
    fecha_creacion datetime DEFAULT current_timestamp,
    estado_id int not null DEFAULT 1,
    PRIMARY KEY (id_tipo_contrato),
    FOREIGN KEY (estado_id)
	    REFERENCES estado(id_estado)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE tipo_documento_identidad (
    id_tipo_documento_identidad int not null AUTO_INCREMENT,
    tipo_documento varchar(30) not null,
    prefijo varchar(30) not null,
    fecha_creacion datetime DEFAULT current_timestamp,
    estado_id int not null DEFAULT 1,
    PRIMARY KEY (id_tipo_documento_identidad),
    FOREIGN KEY (estado_id)
	    REFERENCES estado(id_estado)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE empleado (
    id_empleado int not null AUTO_INCREMENT,
    numero_documento varchar(20),
    tipo_documento_identidad_id int,
    expedicion_documento varchar(50),
    primer_nombre varchar (30),
    segundo_nombre varchar (30),
    primer_apellido varchar (30),
    segundo_apellido varchar (30),
    direccion varchar(100),
    municipio_id int,
    telefono varchar(10),
    email varchar(60),
    nacionalidad varchar(30) DEFAULT 'Colombiano',
    fecha_nacimiento date ,
    lugar_nacimiento varchar(50),
    estado_civil ENUM('Soltero(a)','Casado(a)','Union Libre'),
    libreta_militar ENUM('Si','No','No Aplica') DEFAULT 'No aplica',
    clase_libreta ENUM('1RA','2DA','No Aplica') DEFAULT 'No aplica',
    profesion_id int,
    tarjeta_profesional varchar(20),
    licencia_conduccion  ENUM('Si','No') DEFAULT 'No',
    tipo_licencia  ENUM('A1','A2','B1','B2','B3','C1','C2','C3','No aplica') DEFAULT 'No aplica',
    sexo ENUM('Masculino','Femenino','Otro'),
    estado_id int,
    empresa_id int,
    fecha_creacion datetime DEFAULT current_timestamp,
    PRIMARY KEY (id_empleado),
    UNIQUE KEY (numero_documento,tipo_documento_identidad_id,empresa_id),
    INDEX (empresa_id),
    FOREIGN KEY (tipo_documento_identidad_id)
	    REFERENCES tipo_documento_identidad(id_tipo_documento_identidad),
    FOREIGN KEY (municipio_id)
	    REFERENCES municipio(id_municipio),
    FOREIGN KEY (profesion_id)
	    REFERENCES profesion(id_profesion),
    FOREIGN KEY (estado_id)
	    REFERENCES estado(id_estado),
    FOREIGN KEY (empresa_id)
	    REFERENCES empresa(id_empresa)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE grupo_familiar_empleado(
    id_grupo_familiar_empleado int not null AUTO_INCREMENT,
    nombre_completo varchar (100),
    parentezco ENUM('Madre','Padre','Hermano(a)','Hijo(a)','Abuelo(a)','Primo(a)','Tio(a)','Sobrino(a)'),
    fecha_nacimiento DATE,
    telefono varchar(10),
    fecha_creacion datetime DEFAULT current_timestamp,
    empleado_id int,
    estado_id int,
    PRIMARY KEY (id_grupo_familiar_empleado),
    INDEX (empleado_id),
    FOREIGN KEY (empleado_id)
	    REFERENCES empleado(id_empleado),
    FOREIGN KEY (estado_id)
	    REFERENCES estado(id_estado)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE area (
    id_area int not null AUTO_INCREMENT,
    area varchar(50) not null,
    fecha_creacion datetime DEFAULT current_timestamp,
    estado_id int not null DEFAULT 1,
    PRIMARY KEY (id_area),
    FOREIGN KEY (estado_id)
	    REFERENCES estado(id_estado)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE centro_costo (
    id_centro_costo int not null AUTO_INCREMENT,
    codigo varchar(4),
    nombre varchar(50),
    ubicacion varchar (70),
    fecha_creacion datetime DEFAULT current_timestamp,
    empresa_id int,
    PRIMARY KEY (id_centro_costo),
    FOREIGN KEY (empresa_id)
	    REFERENCES empresa(id_empresa)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE tipo_entidad(
    id_tipo_entidad int not null AUTO_INCREMENT,
    tipo_entidad varchar(30),
    PRIMARY KEY (id_tipo_entidad)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE entidad(
    id_tipo_entidad int not null AUTO_INCREMENT,
    codigo char(2),
    nombre_entidad varchar (50),
    nit varchar(15),
    direccion varchar(100),
    telefono varchar(10),
    codigo_ministerio varchar(10),
    municipio_id int,
    tipo_entidad_id int,
    PRIMARY KEY (id_tipo_entidad),
    FOREIGN KEY (municipio_id)
	    REFERENCES municipio(id_municipio),
    FOREIGN KEY (tipo_entidad_id)
	    REFERENCES tipo_entidad(id_tipo_entidad)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE catalogo_cuenta (
    id_catalogo_cuenta int(11) not null AUTO_INCREMENT,
    codigo_cuenta varchar(14) not null,
    nombre_cuenta varchar (60) not null,
    cuenta_auxiliar ENUM('SI','NO') DEFAULT 'NO',
    cuenta_tercero  ENUM('SI','NO') DEFAULT 'NO',
    centro_costo    ENUM('SI','NO') DEFAULT 'NO',
    naturaleza      ENUM('D','C') DEFAULT 'D' COMMENT ' D = debito C = credito',
    tipo_registro   ENUM('M','A') DEFAULT 'A' COMMENT 'Indica si el registro se creo por  MANUAL o por ARCHIVO',
    fecha_creacion datetime DEFAULT current_timestamp,
    estado_id int not null DEFAULT 1,
    empresa_id int,
    PRIMARY KEY (id_catalogo_cuenta),
    INDEX(empresa_id),
    FOREIGN KEY (estado_id)
	    REFERENCES estado(id_estado),
    FOREIGN KEY (empresa_id)
	    REFERENCES empresa(id_empresa)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE clase_concepto_pago(
    id_clase_concepto_pago int not null AUTO_INCREMENT,
    clase_concepto_pago varchar (30) not null,
    estado_id int not null DEFAULT 1,
    PRIMARY KEY (id_clase_concepto_pago),
    FOREIGN KEY (estado_id)
	    REFERENCES estado(id_estado)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE concepto_pago(
    id_concepto_pago int(11) not null AUTO_INCREMENT,
    codigo char(5),
    nombre_concepto varchar(60),
    tipo ENUM('P','D','A') not null COMMENT 'P = pago D = DESCUENTO A = provision',
    maneja_tasa ENUM('SI','NO') not null DEFAULT 'NO',
    tasa float not null DEFAULT 0,
    se_expresa_en ENUM('HORAS','DIAS','UNIDADES','NINGUNO'),
    ibc ENUM ('X DEFECTO','EXCLUIR','OBLIGAR') DEFAULT 'X DEFECTO',
    base_prestaciones ENUM ('X DEFECTO','EXCLUIR','OBLIGAR') DEFAULT 'X DEFECTO',
    fecha_creacion datetime DEFAULT current_timestamp,
    clase_concepto_pago_id int DEFAULT 0,
    estado_id int not null DEFAULT 1,
    empresa_id int,
    catalogo_cuenta_d_id int(11),
    catalogo_cuenta_c_id int(11),
    PRIMARY KEY(id_concepto_pago),
    INDEX(empresa_id),
    FOREIGN KEY (clase_concepto_pago_id)
	    REFERENCES clase_concepto_pago(id_clase_concepto_pago),
    FOREIGN KEY (estado_id)
	    REFERENCES estado(id_estado),
    FOREIGN KEY (empresa_id)
	    REFERENCES empresa(id_empresa),
    FOREIGN KEY (catalogo_cuenta_d_id)
	    REFERENCES catalogo_cuenta(id_catalogo_cuenta),
    FOREIGN KEY (catalogo_cuenta_c_id)
	    REFERENCES catalogo_cuenta(id_catalogo_cuenta)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE grupo_contable(
    id_grupo_contable int not null AUTO_INCREMENT,
    codigo varchar(10),
    nombre varchar(60),
    fecha_creacion datetime DEFAULT current_timestamp,
    empresa_id int,
    estado_id int not null DEFAULT 1,
    PRIMARY KEY (id_grupo_contable),
    INDEX(codigo,empresa_id),
    UNIQUE(codigo,empresa_id),
    FOREIGN KEY (empresa_id)
	    REFERENCES empresa(id_empresa)
    FOREIGN KEY (estado_id)
	    REFERENCES estado(id_estado)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE concepto_pago_grupo_contable(
    id_concepto_pago_grupo_contable int(11) not null AUTO_INCREMENT,
    observacion varchar (100),
    grupo_contable_id int not null,
    concepto_pago_id int(11) not null,
    fecha_creacion datetime DEFAULT current_timestamp,
    PRIMARY KEY (id_concepto_pago_grupo_contable),
    INDEX (grupo_contable_id,concepto_pago_id),
    FOREIGN KEY (grupo_contable_id)
	    REFERENCES grupo_contable(id_grupo_contable),
    FOREIGN KEY (concepto_pago_id)
	    REFERENCES concepto_pago(id_concepto_pago)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE forma_pago(
    id_forma_pago int not null AUTO_INCREMENT,
    codigo_forma_pago varchar(20),
    tipo varchar(20),
    codigo_cuenta varchar(14),
    tercero_defecto varchar(50),
    PRIMARY KEY(id_forma_pago)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE contrato (
    id_contrato int(11)  not null AUTO_INCREMENT,
    numero_contrato varchar(10),
    empleado_id int not null,
    fecha_ini date,
    tipo_contrato_id int ,
    cargo_id int ,
    area_id int,
    salario_basico float not null DEFAULT 0,
    auxilio_transporte ENUM('SI','NO') DEFAULT 'SI',
    centro_costo_id int,
    esatdo_id int,
    maneja_turno ENUM('SI','NO') DEFAULT 'NO',
    horas_dia tinyInt,
    integral ENUM('SI','NO') DEFAULT 'SI',
    pensionado ENUM('SI','NO') DEFAULT 'NO',
    cod_caja int COMMENT 'EL VALOR DE ESTOS CAMPOS ES EL DE LA TABLA entidad',
    cod_eps  int COMMENT 'EL VALOR DE ESTOS CAMPOS ES EL DE LA TABLA entidad',
    cod_fpen int COMMENT 'EL VALOR DE ESTOS CAMPOS ES EL DE LA TABLA entidad',
    cod_fces int COMMENT 'EL VALOR DE ESTOS CAMPOS ES EL DE LA TABLA entidad',
    cod_arl int  COMMENT 'EL VALOR DE ESTOS CAMPOS ES EL DE LA TABLA entidad',
    cod_banco int COMMENT 'EL VALOR DE ESTOS CAMPOS ES EL DE LA TABLA entidad',
    grupo_contable_id int,
    tipo_cuenta varchar(20),
    num_cuenta_banco varchar(20),
    forma_pago_id int,
    fecha_creacion datetime DEFAULT current_timestamp,
    PRIMARY KEY (id_contrato),
    INDEX(empleado_id,esatdo_id),
    FOREIGN KEY (empleado_id)
        REFERENCES empleado (id_empleado),
    FOREIGN KEY (tipo_contrato_id)
        REFERENCES tipo_contrato(id_tipo_contrato),
    FOREIGN KEY (cargo_id)
        REFERENCES cargo (id_cargo),
    FOREIGN KEY(area_id)
        REFERENCES area (id_area),
    FOREIGN KEY (centro_costo_id)
        REFERENCES centro_costo (id_centro_costo),
    FOREIGN KEY (esatdo_id)
        REFERENCES estado (id_estado),
    FOREIGN KEY (grupo_contable_id)
        REFERENCES grupo_contable (id_grupo_contable),
    FOREIGN KEY (forma_pago_id)
        REFERENCES forma_pago (id_forma_pago)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE periodo_nomina(
    id_periodo_nomina int not null AUTO_INCREMENT,
    periodo_pago ENUM ('Q','M','S') not null COMMENT 'Q = quincenal, M = mensual, S = semanal',
    numero_periodo TINYINT not null COMMENT 'si es quincenal seria 1 y 2 si es mensual del 1 al 12 y si es semanal el numero de la semana en el ano',
    mes ENUM('ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE','SEMANA') not null,
    ano_periodo ENUM('2021','2022','2023','2024','2025','2026','2026','2027','2028','2029','2030','2031','2032','2033','2034') not null,
    fecha_inicio date not null,
    fecha_fin date not null,
    PRIMARY KEY (id_periodo_nomina),
    UNIQUE (periodo_pago,numero_periodo,mes,ano_periodo)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE empresa_periodo_nomina(
    id_empresa_periodo_nomina int not null AUTO_INCREMENT,
    empresa_id int not null,
    periodo_nomina_id int not null,
    estado_id int not null DEFAULT 6,
    fecha_creacion datetime DEFAULT current_timestamp,
    fecha_cambio_estado datetime,
    PRIMARY KEY (id_empresa_periodo_nomina),
    UNIQUE(empresa_id,periodo_nomina_id),
    INDEX(empresa_id),
    FOREIGN KEY (estado_id)
	    REFERENCES estado(id_estado),
    FOREIGN KEY (empresa_id)
	    REFERENCES empresa(id_empresa),
    FOREIGN KEY (periodo_nomina_id)
	    REFERENCES periodo_nomina(id_periodo_nomina)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE ano(
    ano char(4) NOT NULL,
    ano_actual ENUM('N','S') DEFAULT 'N',
    PRIMARY KEY (ano)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE registro_empleado_nomina(
    id_registro_empleado_nomina bigint not null AUTO_INCREMENT,
    empleado_id int not null,
    contrato_id int not null,
    empresa_periodo_nomina_id int not null,
    estado_id int DEFAULT 8,
    dias_laborados tinyInt COMMENT 'los días que labor, por defecto la cantidad de dias del periodo de pago de la empresa',
    valor_salario float COMMENT 'salaraio_basico / 30 * dias_laborados',
    valor_auxilio_transporte float COMMENT 'auxilio_trasporte / 30 * dias_laborados',
    valor_h_extras float,
    valor_otros_pagos float,
    total_devengado float,
    valor_salud float COMMENT 'Conceptos IBC X 4%',
    valor_pension float COMMENT 'Conceptos IBC X 4%',
    valor_otros_descuentos float,
    total_descuentos float,
    total_pago float,
    fecha_registro  datetime DEFAULT current_timestamp,
    PRIMARY KEY (id_registro_empleado_nomina),
    INDEX (empleado_id),
    INDEX (empresa_periodo_nomina_id),
    INDEX (empleado_id,empresa_periodo_nomina_id),
    FOREIGN KEY (empleado_id)
        REFERENCES empleado (id_empleado),
    FOREIGN KEY (contrato_id)
        REFERENCES contrato (id_contrato),
    FOREIGN KEY (empresa_periodo_nomina_id)
        REFERENCES empresa_periodo_nomina (id_empresa_periodo_nomina),
    FOREIGN KEY (estado_id)
        REFERENCES estado (id_estado)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE configuracion_general(
    id_configuracion_general int not null  AUTO_INCREMENT,
    nombre_configuracion varchar(60),
    valor_configuracion varchar(255),
    valor_numerico_configuracion float,
    observacion varchar(255),
    PRIMARY KEY (id_configuracion_general)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE factores_porcentajes_empresa(
    id_factores_porcentajes_empresa int not null AUTO_INCREMENT,
    empresa_id int not null,
    descuento_salud  float not null DEFAULT  4,
    descuento_pension float not null DEFAULT 4,
    fondo_solidaridad float not null DEFAULT 1,
    arl_nivel_1 float not null DEFAULT 0.52,
    arl_nivel_2 float not null DEFAULT 0,
    arl_nivel_3 float not null DEFAULT 0,
    arl_nivel_4 float not null DEFAULT 0,
    caja_compensacion  float not null DEFAULT 4,
    icbf float not null DEFAULT 3,
    sena float not null DEFAULT 2,
    cesantias float not null DEFAULT 8.33,
    intereses_cesantias float not null DEFAULT 12,
    vacaciones float not null DEFAULT 4.17,
    prima float not null DEFAULT 8.33,
    dotacion float not null DEFAULT 0,
    UNIQUE(empresa_id),
    INDEX(empresa_id),
    PRIMARY KEY(id_factores_porcentajes_empresa),
    FOREIGN KEY (empresa_id)
        REFERENCES empresa (id_empresa)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE concepto_pago_defecto(
    id_concepto_pago_defecto int not null AUTO_INCREMENT,
    codigo char(5),
    nombre_concepto varchar(60),
    tipo ENUM('P','D','A') not null COMMENT 'P = pago D = DESCUENTO A = provision',
    maneja_tasa ENUM('SI','NO') not null DEFAULT 'NO',
    tasa float not null DEFAULT 0,
    se_expresa_en ENUM('HORAS','DIAS','UNIDADES','NINGUNO'),
    ibc ENUM ('SI','NO') DEFAULT 'NO',
    base_prestaciones ENUM ('SI','NO') DEFAULT 'NO',
    clase_concepto_pago_id int DEFAULT 0,
    estado_id int not null DEFAULT 1,
    PRIMARY KEY (id_concepto_pago_defecto),
    UNIQUE(codigo),    FOREIGN KEY (estado_id)
        REFERENCES estado (id_estado)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE tipo_movimiento(
    id_tipo_movimiento int not null AUTO_INCREMENT,
    tipo_movimiento varchar(50) not null,
    prefijo_movimiento varchar(10) not null,
    observacion varchar(100),
    PRIMARY KEY(id_tipo_movimiento)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE movimiento_nomina(
    id_movimiento_nomina bigint not null AUTO_INCREMENT,
    fecha  datetime DEFAULT current_timestamp,
    cantidad int DEFAULT 0,
    valor float DEFAULT 0,
    valor_unitario float DEFAULT 0,
    porcentaje_aplicado float not null DEFAULT 0,
    operacion_movimiento ENUM('+','-') not null DEFAULT '+',
    observacion varchar (100),
    concepto_pago_id int(11) not null,
    registro_empleado_nomina_id bigint not null,
    tipo_movimiento_id int not null,
    PRIMARY KEY (id_movimiento_nomina),
    INDEX (registro_empleado_nomina_id),
    FOREIGN KEY (concepto_pago_id)
        REFERENCES concepto_pago (id_concepto_pago),
    FOREIGN KEY (registro_empleado_nomina_id)
        REFERENCES registro_empleado_nomina (id_registro_empleado_nomina),
    FOREIGN KEY (tipo_movimiento_id)
        REFERENCES tipo_movimiento (id_tipo_movimiento)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;



CREATE TABLE tipo_novedad_empleado(
    id_tipo_novedad_empleado INT not null AUTO_INCREMENT,
    tipo_novedad_empleado varchar (80) not null,
    observacion varchar (100),
    estado_id int DEFAULT 1,
    PRIMARY key (id_tipo_novedad_empleado),
    FOREIGN KEY (estado_id)
        REFERENCES estado (id_estado)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE novedad_empleado(
    id_novedad_empleado int not null AUTO_INCREMENT,
    codigo varchar(10),
    nombre_novedad varchar(100),
    descuenta_aux_trans ENUM('NO','SI') DEFAULT 'NO',
    porcentaje_pago_salario float NOT NULL DEFAULT 100,
    descuenta_dias_prestacon ENUM('NO','SI') DEFAULT 'NO',
    observacion varchar (100),
    tipo_novedad_empleado_id int not null  DEFAULT 0,
    empresa_id int not null,
    PRIMARY KEY(id_novedad_empleado),
    FOREIGN KEY (tipo_novedad_empleado_id)
        REFERENCES tipo_novedad_empleado (ID_tipo_novedad_empleado),
    FOREIGN KEY (empresa_id)
        REFERENCES empresa (id_empresa)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE registro_novedad_empleado(
    id_registro_novedad_empleado bigint not null AUTO_INCREMENT,
    fecha_ini date not null,
    fecha_fin date not null,
    cantidad_dias int COMMENT 'Tiene que se la diferenica entre fecha ini y fecha fin',
    valor_unitario float COMMENT 'valor por dia',
    valor_total float COMMENT 'valor_total = cantidad_dias * valor_unitario',
    observacion  varchar(100),
    fecha_registro datetime DEFAULT current_timestamp,
    novedad_empleado_id int,
    empleado_id int,
    PRIMARY KEY (id_registro_novedad_empleado),
    INDEX(fecha_ini,fecha_fin),
    INDEX(novedad_empleado_id,empleado_id),
    INDEX(empleado_id),
    FOREIGN KEY (novedad_empleado_id)
        REFERENCES novedad_empleado (id_novedad_empleado),
    FOREIGN KEY (empleado_id)
        REFERENCES empleado (id_empleado)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- genera_db.novedad_empleado definition

CREATE TABLE novedad_empleado_defecto (
  id_novedad_empleado_defecto int NOT NULL AUTO_INCREMENT,
  codigo char(3) CHARACTER SET utf8 DEFAULT NULL,
  nombre_novedad varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  descuenta_aux_trans enum('NO','SI') CHARACTER SET utf8 DEFAULT 'NO',
  pagar_salario enum('SI','NO') COLLATE utf8_danish_ci NOT NULL DEFAULT 'NO',
  porcentaje_pago_salario float NOT NULL DEFAULT '100',
  descuenta_dias_prestacion enum('NO','SI') CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'NO',
  afecta_ibc enum('NO','SI','','') COLLATE utf8_danish_ci NOT NULL DEFAULT 'NO',
  pagar_arl enum('NO','SI','','') COLLATE utf8_danish_ci NOT NULL DEFAULT 'NO',
  pagar_parafiscales enum('NO','SI','','') COLLATE utf8_danish_ci NOT NULL DEFAULT 'NO',
  observacion varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  tipo_novedad_empleado_id int NOT NULL DEFAULT '0',
  estado_id int DEFAULT '1',
  PRIMARY KEY (id_novedad_empleado_defecto)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_danish_ci;
