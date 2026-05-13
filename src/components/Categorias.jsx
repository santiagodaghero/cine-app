const categorias = [
  { id: 'popular', label: '🔥 Populares' },
  { id: 'top_rated', label: '⭐ Mejor puntuadas' },
  { id: 'now_playing', label: '🎬 Estrenos' },
]

function Categorias({ categoriaActiva, setCategoria }) {
  return (
    <div className="categorias">
      {categorias.map(cat => (
        <button
          key={cat.id}
          className={categoriaActiva === cat.id ? 'activo' : ''}
          onClick={() => setCategoria(cat.id)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

export default Categorias