import Poster from '../../components/Poster/Poster';
import styles from './Discovery.module.css';

export default function GenreChapter({ genre, index }) {
  return (
    <article
      className={styles.genreChapter}
      data-genre-chapter
      data-genre-index={index}
      style={{ '--genre-color': genre.color }}
      aria-labelledby={`genre-${genre.id}`}
    >
      <div className={styles.genreAtmosphere} aria-hidden="true" />
      <span className={styles.giantGenre} data-giant-genre aria-hidden="true">{genre.name}</span>
      <header className={styles.genreHeader}>
        <span>{genre.number} / 05</span>
        <h2 id={`genre-${genre.id}`}>{genre.name}</h2>
        <p>{genre.caption}</p>
      </header>
      <div className={styles.genrePosters} data-genre-posters>
        {genre.posters.map((poster) => (
          <Poster key={poster.id} poster={poster} variant="genre" featured={poster.featured} />
        ))}
      </div>
      {genre.posters.some((poster) => poster.featured) && (
        <div className={styles.selectionNote} data-selection-note>
          <span>Seleção para continuar</span>
          <strong>The Last Signal</strong>
        </div>
      )}
    </article>
  );
}
