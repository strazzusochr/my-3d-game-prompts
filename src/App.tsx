import { GameCanvas } from './components/game/GameCanvas'
import { HUD } from './components/ui/HUD'
import { useTimeCycle } from './hooks/useTimeCycle'
import { GameAudio } from './components/audio/GameAudio'

function App() {
  useTimeCycle();
  
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
      <GameCanvas />
      <HUD />
      <GameAudio />
    </div>
  )
}

export default App
