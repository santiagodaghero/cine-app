import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function Detalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pelicula, setPelicula] = useState(null)
  const [trailer, setTrailer] = useState(null)

useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=es-ES`)
    .then(res => res.json())
    .then(datos => setPelicula(datos))

  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}&language=es-ES`)
    .then(res => res.json())
    .then(datos => {
      const trailerEncontrado = datos.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
      )
      setTrailer(trailerEncontrado)
    })
}, [id])

  if (!pelicula) return <p className="cargando">Cargando...</p>

  return (
    <div className="detalle">
      <button onClick={() => navigate(-1)}>← Volver</button>

      <div className="detalle-contenido">
        <img
          src={`https://image.tmdb.org/t/p/w300${pelicula.poster_path}`}
          alt={pelicula.title}
        />
        <div className="detalle-info">
          <h1>{pelicula.title}</h1>
          <p className="detalle-fecha">📅 {pelicula.release_date}</p>
          <p className="detalle-puntaje">⭐ {pelicula.vote_average ? pelicula.vote_average.toFixed(1) : 'Sin puntaje'}</p>
          <p className="detalle-overview">{pelicula.overview}</p>
        </div>
      </div>

      {trailer && (
        <div className="trailer-contenedor">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            allowFullScreen
          />
        </div>
      )}

      {!trailer && (
        <p className="sin-trailer">No hay trailer disponible</p>
      )}
    </div>
  )
}

export default Detalle