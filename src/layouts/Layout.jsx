// src/layouts/Layout.jsx
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from '../components/ThemeToggle';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>BJ</span>
          <span className={styles.logoText}>Banco Jones</span>
        </div>
        <nav className={styles.nav}>
          <a href="#simulador" className={styles.navLink}>Simulador</a>
          {/* <a href="#comparador" className={styles.navLink}>Comparador</a> */}
          <a href="#historial" className={styles.navLink}>Historial</a>
        </nav>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>© 2025 Banco Jones · Un proyecto de Romera Creativos</p>
      </footer>
    </div>
  );
}