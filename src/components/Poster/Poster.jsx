import styles from './Poster.module.css';

export default function Poster({ poster, variant = 'hero', featured = false }) {
  const palette = {
    '--poster-a': poster.palette[0],
    '--poster-b': poster.palette[1],
    '--poster-c': poster.palette[2],
  };

  return (
    <div
      className={`${styles.poster} ${styles[variant]} ${styles[poster.slot] ?? ''}`}
      data-poster={variant}
      data-slot={poster.slot || undefined}
      data-feature-poster={featured ? 'true' : undefined}
      style={palette}
      aria-hidden="true"
    >
      <div className={styles.floatLayer}>
        <div className={`${styles.art} ${styles[poster.motif]}`}>
          <span className={styles.grain} />
          <span className={styles.posterIndex}>SR — {String(poster.id.length).padStart(2, '0')}</span>
          <div className={styles.copy}>
            <span>{poster.eyebrow}</span>
            <strong>{poster.title}</strong>
          </div>
          <span className={styles.placeholder}>arte temporária</span>
        </div>
      </div>
    </div>
  );
}
