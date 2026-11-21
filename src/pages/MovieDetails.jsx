import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { get } from "../services/httpClient";
import { getMovieImg } from "../utils/getMovieImg";
import "./MovieDetails.css";

function formatRuntime(minutes) {
  if (!minutes) return null;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours} h ${mins} min` : `${mins} min`;
}

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    get(`/movie/${movieId}`)
      .then((data) => {
        if (ignore) return;
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        if (ignore) return;
        console.error(err);
        setError("No se pudo cargar la película.");
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [movieId]);

  if (loading) return <p className="md-status">Cargando película...</p>;

  if (error) {
    return (
      <div className="md-status">
        <p>{error}</p>
        <Link to="/" className="md-back">← Volver al listado</Link>
      </div>
    );
  }

  if (!movie) return null;

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;
  const runtime = formatRuntime(movie.runtime);
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;
  const meta = [year, runtime].filter(Boolean);

  const posterUrl = movie.poster_path
    ? getMovieImg(movie.poster_path, 500)
    : null;
  const backdropUrl = movie.backdrop_path
    ? getMovieImg(movie.backdrop_path, 1280)
    : null;

  return (
    <section className="md-wrapper">
      <Link to="/" className="md-back">← Volver al listado</Link>

      <article className="md">
        {backdropUrl && (
          <div
            className="md-backdrop"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          />
        )}

        <div className="md-content">
          {posterUrl ? (
            <img src={posterUrl} alt={movie.title} className="md-poster" />
          ) : (
            <div className="md-poster md-poster--empty">Sin imagen</div>
          )}

          <div className="md-info">
            <h2 className="md-title">{movie.title}</h2>

            {movie.tagline && <p className="md-tagline">“{movie.tagline}”</p>}

            <div className="md-meta">
              {rating && <span className="md-rating">★ {rating}</span>}
              {meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            {movie.genres?.length > 0 && (
              <ul className="md-genres">
                {movie.genres.map((genre) => (
                  <li key={genre.id} className="md-genre">{genre.name}</li>
                ))}
              </ul>
            )}

            <h3 className="md-subtitle">Descripción</h3>
            <p className="md-overview">
              {movie.overview || "Esta película aún no tiene descripción."}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

export default MovieDetails;