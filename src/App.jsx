import { useState } from 'react'

function App() {
  const [contador, setContador] = useState(0)

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1>¡Mi primer proyecto en React!</h1>
      <p>Has hecho clic {contador} veces</p>

      <button
        onClick={() => setContador(contador + 1)}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Aumentar número
      </button>

      <div style={{ marginTop: '20px', color: '#007bff' }}>
        <p>Sincronizado con GitHub y listo para programar.</p>
      </div>
    </div>
  )
}

export default App