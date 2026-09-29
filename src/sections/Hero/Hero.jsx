import { useRef } from 'react';
import Poster from '../../components/Poster/Poster';
import { posters } from '../../data/posters';
import { useHeroScroll } from '../../animations/useHeroScroll';
import styles from './Hero.module.css';

export default function Hero() {
  const sceneRef = useRef(null);
  useHeroScroll(sceneRef);

  return (
    <section ref={sceneRef} className={styles.scene} id="hero" aria-labelledby="hero-title">
        <div className={styles.stickyFrame} data-hero-frame>
          <div className={styles.backdrop} aria-hidden="true">
            <span className={styles.glowLeft} />
            <span className={styles.glowRight} />
            <span className={styles.vignette} />
          </div>

          <div className={styles.posterStage} data-poster-stage>
            {posters.map((poster) => <Poster poster={poster} key={poster.id} />)}
          </div>

          <div className={styles.content} data-hero-copy>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" />
              Seu próximo filme começa aqui
            </p>
            <h1 className={styles.title} id="hero-title">
              <span data-headline-line>Descubra.</span>
              <span data-headline-line>Assista.</span>
              <span data-headline-line>Avalie.</span>
            </h1>
            <div className={styles.brandStatement} data-brand-statement>
              <span>Uma história termina.</span>
              <strong>Outra começa no Screen<span>Rate</span>.</strong>
            </div>
          </div>

          <div className={styles.sceneMeta} data-scene-meta>
            <span>Capítulo 01</span>
            <span className={styles.metaLine} />
            <span>O começo</span>
          </div>

          <div className={styles.scrollCue} data-scroll-cue aria-hidden="true">
            <span>Role para entrar</span>
            <i />
          </div>
        </div>
    </section>
  );
}
