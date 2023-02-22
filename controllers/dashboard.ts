import {
  ITrabajadoresActivos,
  ISexo,
  IMonth,
  IVacacionesActivos,
  ILicenciasActivos,
  IEgresosLastMonth,
  ITrabajadoresIngresos,
  IAntiguedadActivos,
  IAntiguedadDesvinculados,
  IIngresos2LastMonth,
  IIngresos3LastMonth,
  IEgresos3LastMonth,
  IEgresos2LastMonth,
} from "../interfaces/dashboard.interfaces";
import { Request, Response } from "express";
import db from "../db/connection.js";

import { logger } from "../utils/logger.js";

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const [
      trabajadoresActivos,
      vacacionesActivas,
      licenciasActivas,
      egresosLastMonth,
      ingresosLastMonth,
      antiguedadActivos,
      antiguedadDesvinculados,
      sexo,
      ingresos2lastMonth,
      ingresos3lastMonth,
      egresos2lastMonth,
      egresos3lastMonth,
      last3Months,
    ] = await Promise.all([
      db.query(
        "SELECT COUNT(*) as 'trabajadores_activos' FROM trabajador WHERE estado = true"
      ),
      db.query(
        "SELECT COUNT(*) as 'vacaciones_activos' FROM vacaciones where estado_vacaciones = true"
      ),
      db.query(
        "SELECT COUNT(*) as 'licencias_activos' FROM licencias_medicas where estado_licencia = true"
      ),
      db.query(
        "SELECT COUNT(*) as 'egresos_last_month' FROM egresos where fecha_desvinculacion >= Date_sub( DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH),INTERVAL day(CURRENT_DATE)-1 DAY) and  fecha_desvinculacion <= Date_sub( DATE_SUB(CURRENT_DATE, INTERVAL 0 MONTH),INTERVAL day(CURRENT_DATE)+0 DAY)"
      ),
      db.query(
        "SELECT COUNT(*) as 'trabajadores_ingresos' FROM trabajador where fecha_ingreso >= Date_sub( DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH),INTERVAL day(CURRENT_DATE)-1 DAY) and  fecha_ingreso <= Date_sub( DATE_SUB(CURRENT_DATE, INTERVAL 0 MONTH),INTERVAL day(CURRENT_DATE)+0 DAY)"
      ),
      db.query(
        "select sum( datediff(curdate(),fecha_ingreso)/365)/(select count(ficha) from trabajador where estado = true) as 'antiguedad_activos' from trabajador where estado= true"
      ),
      db.query(
        "select sum( datediff(curdate(),fecha_ingreso)/365)/(select count(ficha) from trabajador where estado = false) as 'antiguedad_desvinculados' from trabajador where estado= false"
      ),
      db.query(
        "select count(sexo) as M, (select count(sexo) from trabajador where sexo = 'F'and estado=true) as F from trabajador where sexo = 'M' and estado=true"
      ),
      db.query(
        "SELECT COUNT(*) as 'ingresos_2_last_month' FROM trabajador where fecha_ingreso >= Date_sub( DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH),INTERVAL day(CURRENT_DATE)-1 DAY) and fecha_ingreso <=Date_sub( DATE_SUB(CURRENT_DATE,INTERVAL 1 MONTH),INTERVAL day(CURRENT_DATE)+0 DAY)"
      ),
      db.query(
        "SELECT COUNT(*) as 'ingresos_3_last_month' FROM trabajador where fecha_ingreso >= Date_sub( DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH),INTERVAL day(CURRENT_DATE)-1 DAY) and fecha_ingreso <=Date_sub( DATE_SUB(CURRENT_DATE,INTERVAL 2 MONTH),INTERVAL day(CURRENT_DATE)+0 DAY)"
      ),
      db.query(
        "SELECT COUNT(*) as 'egresos_2_last_month' FROM egresos where fecha_desvinculacion >= Date_sub( DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH),INTERVAL day(CURRENT_DATE)-1 DAY) and  fecha_desvinculacion <= Date_sub( DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH),INTERVAL day(CURRENT_DATE)+0 DAY)"
      ),
      db.query(
        "SELECT COUNT(*) as 'egresos_3_last_month' FROM egresos where fecha_desvinculacion >= Date_sub( DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH),INTERVAL day(CURRENT_DATE)-1 DAY) and  fecha_desvinculacion <= Date_sub( DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH),INTERVAL day(CURRENT_DATE)+0 DAY)"
      ),
      db.query(
        "select Date_sub( DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH),INTERVAL day(CURRENT_DATE)-1 DAY) as 'treeMonth' ,(select Date_sub( DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH),INTERVAL day(CURRENT_DATE)-1 DAY)) as 'twoMonth',(select Date_sub( DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH),INTERVAL day(CURRENT_DATE)-1 DAY)) as 'month'"
      ),
    ]);
    const { M, F } = sexo[0][0] as ISexo;
    const { month, twoMonth, treeMonth } = last3Months[0][0] as IMonth;
    const countTrabajadoresActivos =
      trabajadoresActivos[0][0] as ITrabajadoresActivos;
    const countIngresos2lastMonth =
      ingresos2lastMonth[0][0] as IIngresos2LastMonth;
    const countIngresos3lastMonth =
      ingresos3lastMonth[0][0] as IIngresos3LastMonth;
    const countEgresos2lastMonth =
      egresos2lastMonth[0][0] as IEgresos2LastMonth;
    const countEgresos3lastMonth =
      egresos3lastMonth[0][0] as IEgresos3LastMonth;
    const countAntiguedadActivos =
      antiguedadActivos[0][0] as IAntiguedadActivos;
    const countAntiguedadInactivos =
    antiguedadDesvinculados[0][0] as IAntiguedadDesvinculados;
    const countVacacionesActivas =
      vacacionesActivas[0][0] as IVacacionesActivos;
    const countLicenciasActivas = licenciasActivas[0][0] as ILicenciasActivos;
    const countEgresosLastMonth = egresosLastMonth[0][0] as IEgresosLastMonth;
    const countIngresosLastMonth =
      ingresosLastMonth[0][0] as ITrabajadoresIngresos;

    res.json({
      ok: true,
      data: {
        trabajadores_activos: countTrabajadoresActivos.trabajadores_activos,
        vacaciones_activas: countVacacionesActivas.vacaciones_activos,
        licencias_activas: countLicenciasActivas.licencias_activos,
        egresos_lastMonth: countEgresosLastMonth.egresos_last_month,
        ingresos_lastMonth: countIngresosLastMonth.trabajadores_ingresos,
        antiguedad_activos: countAntiguedadActivos.antiguedad_activos,
        antiguedad_desvinculados: countAntiguedadInactivos.antiguedad_desvinculados ,
        sexo: [M, F],
        array_ingresos3months: [
          countIngresos3lastMonth.ingresos_3_last_month,
          countIngresos2lastMonth.ingresos_2_last_month,
          countIngresosLastMonth.trabajadores_ingresos,
        ],
        array_egresos3months: [
          countEgresos3lastMonth.egresos_3_last_month,
          countEgresos2lastMonth.egresos_2_last_month,
          countEgresosLastMonth.egresos_last_month,
        ],
        array_months: [treeMonth, twoMonth, month],
      },
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      msg: "Hable con el administrador",
      ok: false,
    });
  }
};
