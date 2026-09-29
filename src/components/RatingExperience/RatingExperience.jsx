import { useState } from 'react';
import { ratingLabels } from '../../data/featuredMovie';
import styles from './RatingExperience.module.css';

function Star({ active }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="m12 2.6 2.86 5.8 6.4.93-4.63 4.52 1.1 6.37L12 17.2l-5.73 3.02 1.1-6.37-4.63-4.52 6.4-.93L12 2.6Z"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function RatingExperience() {
  const [rating, setRating] = useState(0);
  const [preview, setPreview] = useState(0);
  const displayRating = preview || rating;

  const selectRating = (value) => {
    // Estado demonstrativo local: persistência será integrada em uma etapa futura.
    setRating(value);
    setPreview(0);
  };

  return (
    <div className={styles.ratingExperience} data-rating-experience>
      <div className={styles.statement} data-rating-statement>
        <span>Sua opinião</span>
        <span>também faz parte</span>
        <span>da história.</span>
      </div>

      <div className={styles.interaction}>
        <div className={styles.communityScore} aria-label="Nota da comunidade: 8.7 de 10">
          <strong>8.7</strong>
          <div>
            <span>ScreenRate</span>
            <small>12.482 avaliações</small>
          </div>
        </div>

        <fieldset className={styles.ratingFieldset}>
          <legend>Qual é a sua nota?</legend>
          <div
            className={styles.stars}
            onMouseLeave={() => setPreview(0)}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={styles.starButton}
                data-active={value <= displayRating}
                data-selected={value === rating}
                aria-label={`${value} ${value === 1 ? 'estrela' : 'estrelas'} — ${ratingLabels[value]}`}
                aria-pressed={rating === value}
                onMouseEnter={() => setPreview(value)}
                onFocus={() => setPreview(value)}
                onBlur={() => setPreview(0)}
                onClick={() => selectRating(value)}
              >
                <Star active={value <= displayRating} />
              </button>
            ))}
          </div>

          <div className={styles.ratingFeedback} aria-live="polite">
            {displayRating > 0 ? (
              <>
                <strong>{displayRating}.0</strong>
                <span>— {ratingLabels[displayRating]}</span>
              </>
            ) : (
              <span>Escolha de 1 a 5 estrelas</span>
            )}
          </div>

          <p className={styles.confirmation} data-visible={rating > 0} role="status">
            Sua nota foi registrada.
          </p>
        </fieldset>
      </div>
    </div>
  );
}
