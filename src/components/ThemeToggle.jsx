// src/components/ThemeToggle.jsx
import styles from './ThemeToggle.module.css';

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      className={styles.toggle}
      onClick={onToggle}
      aria-label="Cambiar modo oscuro"
      title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}