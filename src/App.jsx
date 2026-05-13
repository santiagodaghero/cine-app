import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import TarjetaPelicula from './components/TarjetaPelicula'
import Buscador from './components/Buscador'
import Detalle from './components/Detalle'
import Categorias from './components/Categorias'

function Inicio() {
  const [peliculas, setPeliculas] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('popular')
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setCargando(true)
    fetch(`https://api.themoviedb.org/3/movie/${categoria}?api_key=${import.meta.env.VITE_API_KEY}&language=es-ES`)
      .then(res => res.json())
      .then(datos => {
        setPeliculas(datos.results)
        setCargando(false)
      })
  }, [categoria])

  const peliculasFiltradas = peliculas.filter(pelicula =>
    pelicula.title.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div>
      <Navbar titulo="CineApp" />
      <Categorias categoriaActiva={categoria} setCategoria={setCategoria} />
      <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />

      {cargando ? (
        <div className="loader-contenedor">
          <div className="loader" />
        </div>
      ) : (
        <div className="grilla">
          {peliculasFiltradas.map(pelicula => (
            <TarjetaPelicula
              key={pelicula.id}
              titulo={pelicula.title}
              imagen={pelicula.poster_path}
              descripcion={pelicula.overview}
              puntaje={pelicula.vote_average}
              fecha={pelicula.release_date}
              onClick={() => navigate(`/pelicula/${pelicula.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/pelicula/:id" element={<Detalle />} />
    </Routes>
  )
}

export default App