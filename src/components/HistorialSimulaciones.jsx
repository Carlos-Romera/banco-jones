// src/components/HistorialSimulaciones.jsx
import styles from './HistorialSimulaciones.module.css';

export default function HistorialSimulaciones({ historial }) {
  if (historial.length === 0) return null;

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.titulo}>Últimas simulaciones</h2>
      <ul className={styles.lista}>
        {historial.map((sim) => (
          <li key={sim.id} className={styles.item}>
            <span className={styles.tipo}>{sim.tipo === 'prestamo' ? 'Préstamo' : 'Inversión'}</span>
            <span className={styles.fecha}>{sim.fecha}</span>
            <span className={styles.detalle}>{sim.resumen}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}