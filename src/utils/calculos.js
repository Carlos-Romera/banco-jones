// src/utils/calculos.js

/**
 * Calcula préstamo francés (cuota fija)
 * @param {number} capital - monto del préstamo
 * @param {number} interesAnual - TIN anual en porcentaje (ej. 5)
 * @param {number} plazoMeses - duración en meses
 * @returns {object} cuota, totalPagado, totalIntereses, tabla
 */
export function calcularPrestamo(capital, interesAnual, plazoMeses) {
  const tasaMensual = interesAnual / 100 / 12;
  let cuotaMensual = 0;
  if (tasaMensual > 0) {
    cuotaMensual = (capital * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazoMeses));
  } else {
    cuotaMensual = capital / plazoMeses;
  }

  let saldo = capital;
  const tabla = [];

  for (let mes = 1; mes <= plazoMeses; mes++) {
    const interesesMes = saldo * tasaMensual;
    const amortizacion = cuotaMensual - interesesMes;
    saldo -= amortizacion;
    tabla.push({
      mes,
      cuota: cuotaMensual.toFixed(2),
      intereses: interesesMes.toFixed(2),
      amortizacion: amortizacion.toFixed(2),
      saldo: Math.max(saldo, 0).toFixed(2),
    });
  }

  const totalPagado = cuotaMensual * plazoMeses;
  return {
    cuotaMensual: cuotaMensual.toFixed(2),
    totalPagado: totalPagado.toFixed(2),
    totalIntereses: (totalPagado - capital).toFixed(2),
    tabla,
  };
}

/**
 * Calcula inversión con aportaciones mensuales
 * @param {number} capitalInicial
 * @param {number} aportacionMensual
 * @param {number} interesAnual - rentabilidad anual en porcentaje
 * @param {number} plazoAnios
 * @returns {object} balanceFinal, totalInvertido, totalIntereses, evolucion
 */
export function calcularInversion(capitalInicial, aportacionMensual, interesAnual, plazoAnios) {
  const tasaMensual = interesAnual / 100 / 12;
  const meses = plazoAnios * 12;
  let balance = capitalInicial;
  const evolucion = [];

  const totalInvertido = capitalInicial + (aportacionMensual * meses);

  for (let mes = 1; mes <= meses; mes++) {
    balance += aportacionMensual;
    balance *= (1 + tasaMensual);
    if (mes % 12 === 0 || mes === meses) {
      evolucion.push({
        anio: mes / 12,
        balance: balance.toFixed(2),
      });
    }
  }

  return {
    balanceFinal: balance.toFixed(2),
    totalInvertido: totalInvertido.toFixed(2),
    totalIntereses: (balance - totalInvertido).toFixed(2),
    evolucion,
  };
}