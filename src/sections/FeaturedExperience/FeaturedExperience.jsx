import { useRef } from 'react';
import Poster from '../../components/Poster/Poster';
import RatingExperience from '../../components/RatingExperience/RatingExperience';
import { featuredMovie } from '../../data/featuredMovie';
import { genres } from '../../data/genres';
import { useFeaturedScroll } from '../../animations/useFeaturedScroll';
import styles from './FeaturedExperience.module.css';

const collectionPosters = [genres[2].posters[1], genres[3].posters[0]];

export default function FeaturedExperience() {
  const experienceRef = useRef(null);
  useFeaturedScroll(experienceRef, styles.enhanced);

  return (
    <section
      ref={experienceRef}
      className={styles.experience}
      id="filme-em-destaque"
      aria-labelledby="featured-title"
    >
      <div className={styles.frame} data-feature-frame>
        <div className={styles.filmWash} data-film-wash aria-hidden="true" />

        <div className={styles.posterBridge} data-feature-visual aria-hidden="true">
          <Poster poster={featuredMovie.poster} variant="feature" />
        </div>

        <article className={styles.movieCopy} data-film-copy>
          <div className={styles.meta}>
            <span>{featuredMovie.year}</span>
            <span>{featuredMovie.genre}</span>
            <span>{featuredMovie.duration}</span>
          </div>
          <h2 id="featured-title">The Last<br /><span>Signal</span></h2>
          <p className={styles.synopsis}>{featuredMovie.synopsis}</p>
          <a className={styles.detailsLink} href="#avaliar">
            Ver detalhes <span aria-hidden="true">↘</span>
          </a>
        </article>

        <div className={styles.editorialScore} data-editorial-score aria-label="Nota ScreenRate: 8.7 de 10">
          <span>Nota ScreenRate</span>
          <strong>{featuredMovie.score}</strong>
          <small>{featuredMovie.ratingCount}</small>
        </div>

        <div className={styles.ratingLayer} id="avaliar" data-rating-layer>
          <RatingExperience />
        </div>

        <div className={styles.collectionLayer} data-collection-layer>
          <div className={styles.collectionPosters} aria-hidden="true">
            {collectionPosters.map((poster) => (
              <Poster key={poster.id} poster={poster} variant="genre" />
            ))}
          </div>
          <div className={styles.collectionCopy}>
            <span>A história continua com você</span>
            <strong>Sua coleção<br />começa aqui.</strong>
            <p>O filme avaliado está pronto para encontrar seu lugar em Minha Lista.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
