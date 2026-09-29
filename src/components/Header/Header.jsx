import { useEffect, useRef, useState } from 'react';
import Brand from '../Brand/Brand';
import styles from './Header.module.css';

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="19" height="19" fill="none">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <span className={`${styles.menuIcon} ${open ? styles.menuIconOpen : ''}`} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchMessage, setSearchMessage] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchMessage('A busca será conectada ao catálogo na próxima etapa.');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header} data-site-header>
      <div className={styles.inner}>
        <a href="#hero" className={styles.logoLink} onClick={closeMenu}>
          <Brand />
        </a>

        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <MenuIcon open={menuOpen} />
        </button>

        <div
          className={`${styles.navigationShell} ${menuOpen ? styles.navigationOpen : ''}`}
          id="primary-navigation"
        >
          <nav className={styles.navigation} aria-label="Navegação principal">
            <a href="#next-chapter" onClick={closeMenu}>Filmes</a>
            <a href="#next-chapter" onClick={closeMenu}>Séries</a>
            <a href="#next-chapter" onClick={closeMenu}>Minha Lista</a>
          </nav>

          <div className={styles.actions}>
            <button
              className={styles.searchToggle}
              type="button"
              aria-expanded={searchOpen}
              aria-controls="header-search"
              onClick={() => setSearchOpen((value) => !value)}
            >
              <SearchIcon />
              <span>Buscar</span>
            </button>
            <a className={styles.signIn} href="#next-chapter" onClick={closeMenu}>Entrar</a>
            <a className={styles.signUp} href="#next-chapter" onClick={closeMenu}>Criar conta</a>
          </div>

          <form
            className={`${styles.searchPanel} ${searchOpen ? styles.searchPanelOpen : ''}`}
            id="header-search"
            role="search"
            onSubmit={handleSearch}
          >
            <label htmlFor="site-search">Buscar no ScreenRate</label>
            <div className={styles.searchField}>
              <SearchIcon />
              <input
                ref={searchRef}
                id="site-search"
                name="search"
                type="search"
                placeholder="Filmes, séries e pessoas"
                autoComplete="off"
              />
              <button type="submit">Buscar</button>
            </div>
            <p className={styles.searchStatus} role="status">{searchMessage}</p>
          </form>
        </div>
      </div>
    </header>
  );
}
