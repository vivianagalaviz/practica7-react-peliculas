import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import MovieDetails from "./pages/MovieDetails";

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
    </div>
  );
}

export default App;