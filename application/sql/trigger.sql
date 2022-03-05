DROP TRIGGER IF EXISTS before_movimiento_nomina_delete;
DELIMITER $$
CREATE DEFINER=root@localhost TRIGGER before_movimiento_nomina_delete
    BEFORE DELETE
    ON movimiento_nomina FOR EACH ROW
BEGIN

    DECLARE @clase_concepto_pago_id INT;
    
    SET @clase_concepto_pago_id = (SELECT cp.cp.clase_concepto_pago_id
        FROM movimiento_nomina mn
        JOIN concepto_pago cp ON cp.id_concepto_pago = mn.concepto_pago_id
        WHERE mn.id_movimiento_nomina = NEW.id_movimiento_nomina LIMIT 1);

    IF @clase_concepto_pago_id = 1 THEN -- CLASE SALARIO
        update registro_empleado_nomina SET  valor_salario =  valor_salario - NEW.valor, total_devengado =  total_devengado - NEW.valor WHERE id_registro_empleado_nomina = NEW.registro_empleado_nomina_id;
    END IF;

    INSERT INTO log_db VALUES (NULL,@clase_concepto_pago_id,NEW.id_movimiento_nomina);
    
END;
DELIMITER ;