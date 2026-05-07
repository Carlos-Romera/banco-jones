// src/components/TablaAmortizacion.jsx
import styles from './TablaAmortizacion.module.css';

export default function TablaAmortizacion({ tabla }) {
  return (
    <div className={styles.contenedor}>
      <h3 className={styles.titulo}>Cuadro de amortización</h3>
      <div className={styles.tablaScroll}>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Mes</th>
              <th>Cuota</th>
              <th>Intereses</th>
              <th>Amortización</th>
              <th>Saldo pendiente</th>
            </tr>
          </thead>
          <tbody>
            {tabla.map((fila) => (
              <tr key={fila.mes}>
                <td>{fila.mes}</td>
                <td>{fila.cuota} €</td>
                <td>{fila.intereses} €</td>
                <td>{fila.amortizacion} €</td>
                <td>{fila.saldo} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}