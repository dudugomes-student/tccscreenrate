import { useRef } from 'react';
import Poster from '../../components/Poster/Poster';
import { genres, transitionPosters } from '../../data/genres';
import { useDiscoveryScroll } from '../../animations/useDiscoveryScroll';
import GenreChapter from './GenreChapter';
import FeaturedExperience from '../FeaturedExperience/FeaturedExperience';
import styles from './Discovery.module.css';

export default function Discovery() {
  const discoveryRef = useRef(null);
  useDiscoveryScroll(discoveryRef, styles.enhanced);

  return (
    <section ref={discoveryRef} className={styles.discovery} id="next-chapter">
      <div className={styles.transitionScene} data-discovery-transition>
        <div className={styles.transitionFrame}>
          <div className={styles.transitionGlow} aria-hidden="true" />
          <div className={styles.portal} data-transition-portal aria-hidden="true">
            {transitionPosters.map((poster) => (
              <Poster key={poster.id} poster={poster} variant="transition" />
            ))}
          </div>
          <div className={styles.transitionCopy} data-transition-copy>
            <span>Um universo inteiro espera</span>
            <h2>
              <span>Encontre sua</span>
              <span>próxima história.</span>
            </h2>
          </div>
          <p className={styles.transitionAside} data-transition-aside>
            Atravesse gêneros.<br />Encontre o que fica.
          </p>
        </div>
      </div>

      <div className={styles.genresScene} data-genres-scene>
        <div className={styles.genresViewport}>
          <div className={styles.genreRail} aria-hidden="true">
            <span>Gêneros</span>
            <ol>
              {genres.map((genre, index) => (
                <li key={genre.id} data-rail-item={index}>{genre.name}</li>
              ))}
            </ol>
          </div>
          <div className={styles.genresTrack} data-genres-track>
            {genres.map((genre, index) => (
              <GenreChapter genre={genre} index={index} key={genre.id} />
            ))}
          </div>
        </div>
      </div>

      <FeaturedExperience />
    </section>
  );
}
