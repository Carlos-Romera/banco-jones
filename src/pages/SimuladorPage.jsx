// src/pages/SimuladorPage.jsx
import { useState } from 'react';
import { calcularPrestamo, calcularInversion } from '../utils/calculos';
import SimuladorForm from '../components/SimuladorForm';
import ResumenTarjeta from '../components/ResumenTarjeta';
import TablaAmortizacion from '../components/TablaAmortizacion';
import GraficoEvolucion from '../components/GraficoEvolucion';
import HistorialSimulaciones from '../components/HistorialSimulaciones';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SimuladorPage.module.css';

export default function SimuladorPage() {
  const [resultado, setResultado] = useState(null);
  const [tipoSimulacion, setTipoSimulacion] = useState('prestamo');
  const [historial, setHistorial] = useLocalStorage('simulaciones', []);

  const handleCalcular = (datos) => {
    const { tipo, ...params } = datos;
    setTipoSimulacion(tipo);
    let res;
    if (tipo === 'prestamo') {
      res = calcularPrestamo(params.capital, params.interes, params.plazo);
    } else {
      res = calcularInversion(params.capital, params.aportacion, params.interes, params.plazo);
    }
    setResultado({ tipo, ...res });

    const nuevaSimulacion = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString(),
      tipo,
      datos: params,
      resumen: tipo === 'prestamo'
        ? `Cuota ${res.cuotaMensual}€ | Total intereses ${res.totalIntereses}€`
        : `Balance final ${res.balanceFinal}€ | Intereses ${res.totalIntereses}€`
    };
    setHistorial(prev => [nuevaSimulacion, ...prev].slice(0, 10));
  };

  const handleLimpiar = () => setResultado(null);

  return (
    <div className={styles.page}>
      <section id="simulador" className={styles.simuladorSection}>
        <motion.h1
          className={styles.titulo}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Simulador financiero
        </motion.h1>
        <SimuladorForm onCalcular={handleCalcular} onLimpiar={handleLimpiar} />
      </section>

      <AnimatePresence>
        {resultado && (
          <motion.section
            id="resultados"
            className={styles.resultados}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0 }}
          >
            <ResumenTarjeta tipo={tipoSimulacion} resultado={resultado} />
            {tipoSimulacion === 'prestamo' ? (
              <TablaAmortizacion tabla={resultado.tabla} />
            ) : (
              <GraficoEvolucion data={resultado.evolucion} label="Balance (€)" />
            )}
            {tipoSimulacion === 'prestamo' && (
              <GraficoEvolucion
                data={resultado.tabla.map(t => ({ anio: t.mes / 12, balance: t.saldo }))}
                label="Saldo pendiente (€)"
              />
            )}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button className="btn-imprimir" onClick={() => window.print()}>
                Exportar a PDF / Imprimir
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <section id="historial" className={styles.historialSection}>
        <HistorialSimulaciones historial={historial} />
      </section>
    </div>
  );
}