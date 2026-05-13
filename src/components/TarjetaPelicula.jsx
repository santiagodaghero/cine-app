function TarjetaPelicula({ titulo, imagen, descripcion, puntaje, fecha, onClick }) {
  const anio = fecha ? fecha.split('-')[0] : 'S/D'
  const nota = puntaje ? puntaje.toFixed(1) : 'S/D'

  return (
    <div className="tarjeta" onClick={onClick}>
      <img
        src={`https://image.tmdb.org/t/p/w300${imagen}`}
        alt={titulo}
      />
      <div className="tarjeta-info">
        <h3>{titulo}</h3>
        <div className="tarjeta-meta">
          <span>📅 {anio}</span>
          <span>⭐ {nota}</span>
        </div>
        <p>{descripcion}</p>
      </div>
    </div>
  )
}

export default TarjetaPelicula