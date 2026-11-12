import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <svg className={styles.logo} viewBox="-12 -11 24 22" aria-hidden="true">
        <ellipse rx="11" ry="4.2" fill="none" stroke="currentColor" strokeWidth="0.9" />
        <ellipse rx="11" ry="4.2" fill="none" stroke="currentColor" strokeWidth="0.9" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" fill="none" stroke="currentColor" strokeWidth="0.9" transform="rotate(120)" />
        <circle r="2.1" fill="currentColor" />
      </svg>
      <h1 className={styles.title}>Hello world</h1>
    </main>
  );
}
