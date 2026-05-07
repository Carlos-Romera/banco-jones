// src/components/GraficoEvolucion.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './GraficoEvolucion.module.css';

export default function GraficoEvolucion({ data, label }) {
  return (
    <div className={styles.contenedor}>
      <h3 className={styles.titulo}>Evolución</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="anio"
            label={{ value: 'Año', position: 'insideBottomRight', offset: -10, fill: 'var(--color-text-light)' }}
            tick={{ fill: 'var(--color-text)' }}
          />
          <YAxis
            label={{ value: label, angle: -90, position: 'insideLeft', fill: 'var(--color-text-light)' }}
            tick={{ fill: 'var(--color-text)' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
            }}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="var(--color-primary)"
            strokeWidth={2}
            dot={{ fill: 'var(--color-primary)', strokeWidth: 2 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}