import styles from './Brand.module.css';

export default function Brand() {
  return (
    <span className={styles.brand} aria-label="ScreenRate">
      <span className={styles.mark} aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className={styles.wordmark}>Screen<span>Rate</span></span>
    </span>
  );
}
