// src/components/ResumenTarjeta.jsx
import styles from './ResumenTarjeta.module.css';

export default function ResumenTarjeta({ tipo, resultado }) {
  return (
    <div className={styles.tarjeta}>
      {tipo === 'prestamo' ? (
        <>
          <div className={styles.item}>
            <span className={styles.label}>Cuota mensual</span>
            <span className={styles.valorPrincipal}>{resultado.cuotaMensual} €</span>
          </div>
          <div className={styles.grid}>
            <div className={styles.item}>
              <span className={styles.label}>Total a pagar</span>
              <span className={styles.valorSecundario}>{resultado.totalPagado} €</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Intereses totales</span>
              <span className={styles.valorSecundario}>{resultado.totalIntereses} €</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.item}>
            <span className={styles.label}>Balance final</span>
            <span className={styles.valorPrincipal}>{resultado.balanceFinal} €</span>
          </div>
          <div className={styles.grid}>
            <div className={styles.item}>
              <span className={styles.label}>Total invertido</span>
              <span className={styles.valorSecundario}>{resultado.totalInvertido} €</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Intereses ganados</span>
              <span className={styles.valorSecundario}>{resultado.totalIntereses} €</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}