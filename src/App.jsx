import Header from './components/Header/Header';
import Hero from './sections/Hero/Hero';
import Discovery from './sections/Discovery/Discovery';

export default function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Discovery />
      </main>
    </div>
  );
}
