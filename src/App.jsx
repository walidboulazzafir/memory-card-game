import GameHeader from './components/GameHeader';
import Card from './components/Card';
import { useGameLogic } from './hooks/useGameLogic';
import WinnMessage from './components/WinnMessage';

const cardValues =[
  "🎮", "🕹️", "🎲", "👾","🧩","🗡️","🛡️","🔥",
  "🎮", "🕹️", "🎲", "👾","🧩","🗡️","🛡️","🔥"
];

function App() {

  const { cards, score, moves, isGameWon, handleCardClick, intializeGame } = useGameLogic(cardValues);

  

  return (
    <div className="app">
     <GameHeader score={score} moves={moves} onReset={intializeGame} />

     {isGameWon && <WinnMessage moves={moves} />}

     <div className="cards-grid">
      {cards.map((card) => (
        <Card key={card.id} card={card} onclick={handleCardClick} />
      ))}
     </div>
    </div>
  )
}

export default App
