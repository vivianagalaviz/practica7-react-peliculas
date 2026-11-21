import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import MovieDetails from "./pages/MovieDetails";
import escudoCucei from "./img/Escudo_CUCEI.svg";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🎬 Películas</h1>
        <p>Explora nuestro catálogo de películas</p>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <img src={escudoCucei} alt="Escudo CUCEI" className="footer-logo" />
        <div className="footer-info">
          <p><strong>Integrantes:</strong> Dante Martínez, Laura Macias, Viviana Galaviz</p>
          <p><strong>Profesor:</strong> ZEUS EMANUEL GUTIERREZ COBIAN</p>
          <p><strong>Materia:</strong> Desarrollo de Aplicaciones Web</p>
          <p><strong>Calendario escolar:</strong> 2026B | <strong>Fecha:</strong> Noviembre 2026</p>
          <p><strong>Institución:</strong> CUCEI - Universidad de Guadalajara</p>
        </div>
      </footer>
      
    </div>
  );
}

export default App;