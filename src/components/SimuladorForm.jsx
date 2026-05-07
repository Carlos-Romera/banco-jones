// src/components/SimuladorForm.jsx
import { useState } from 'react';
import styles from './SimuladorForm.module.css';

export default function SimuladorForm({ onCalcular, onLimpiar }) {
  const [tipo, setTipo] = useState('prestamo');
  const [capital, setCapital] = useState('');
  const [interes, setInteres] = useState('');
  const [plazo, setPlazo] = useState('');
  const [aportacion, setAportacion] = useState('');
  const [errores, setErrores] = useState({});

  const validar = () => {
    const err = {};
    if (!capital || isNaN(capital) || capital <= 0) err.capital = 'Capital requerido';
    if (!interes || isNaN(interes) || interes <= 0) err.interes = 'Interés requerido';
    if (!plazo || isNaN(plazo) || plazo <= 0) err.plazo = 'Plazo requerido';
    if (tipo === 'inversion' && (!aportacion || isNaN(aportacion) || aportacion < 0)) err.aportacion = 'Aportación no válida';
    setErrores(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;
    const datos = {
      tipo,
      capital: parseFloat(capital),
      interes: parseFloat(interes),
    };
    if (tipo === 'prestamo') {
      datos.plazo = parseInt(plazo);
    } else {
      datos.plazo = parseInt(plazo);
      datos.aportacion = parseFloat(aportacion);
    }
    onCalcular(datos);
  };

  const handleLimpiar = () => {
    setCapital('');
    setInteres('');
    setPlazo('');
    setAportacion('');
    setErrores({});
    if (onLimpiar) onLimpiar();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.tipoSelector}>
        <button
          type="button"
          className={`${styles.tipoBtn} ${tipo === 'prestamo' ? styles.activo : ''}`}
          onClick={() => setTipo('prestamo')}
        >
          Préstamo
        </button>
        <button
          type="button"
          className={`${styles.tipoBtn} ${tipo === 'inversion' ? styles.activo : ''}`}
          onClick={() => setTipo('inversion')}
        >
          Inversión
        </button>
      </div>

      <div className={styles.campos}>
        <div className={styles.grupo}>
          <label>{tipo === 'prestamo' ? 'Capital del préstamo' : 'Capital inicial'}</label>
          <input
            type="number"
            min="0"
            step="any"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            placeholder="Ej. 10000"
            className={errores.capital ? styles.errorInput : ''}
          />
          {errores.capital && <span className={styles.errorMsg}>{errores.capital}</span>}
        </div>

        <div className={styles.grupo}>
          <label>Interés anual (%)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={interes}
            onChange={(e) => setInteres(e.target.value)}
            placeholder="Ej. 5"
            className={errores.interes ? styles.errorInput : ''}
          />
          {errores.interes && <span className={styles.errorMsg}>{errores.interes}</span>}
        </div>

        <div className={styles.grupo}>
          <label>{tipo === 'prestamo' ? 'Plazo (meses)' : 'Plazo (años)'}</label>
          <input
            type="number"
            min="1"
            step="1"
            value={plazo}
            onChange={(e) => setPlazo(e.target.value)}
            placeholder={tipo === 'prestamo' ? 'Ej. 60' : 'Ej. 10'}
            className={errores.plazo ? styles.errorInput : ''}
          />
          {errores.plazo && <span className={styles.errorMsg}>{errores.plazo}</span>}
        </div>

        {tipo === 'inversion' && (
          <div className={styles.grupo}>
            <label>Aportación mensual</label>
            <input
              type="number"
              min="0"
              step="any"
              value={aportacion}
              onChange={(e) => setAportacion(e.target.value)}
              placeholder="Ej. 200"
              className={errores.aportacion ? styles.errorInput : ''}
            />
            {errores.aportacion && <span className={styles.errorMsg}>{errores.aportacion}</span>}
          </div>
        )}
      </div>

      <div className={styles.acciones}>
        <button type="submit" className={styles.btnCalcular}>
          Calcular
        </button>
        <button type="button" className={styles.btnLimpiar} onClick={handleLimpiar}>
          Limpiar
        </button>
      </div>
    </form>
  );
}