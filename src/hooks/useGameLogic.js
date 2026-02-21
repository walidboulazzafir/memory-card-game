
import { useEffect, useState } from "react";
export const useGameLogic = (cardValues) => {
    const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for(let i = shuffled.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const intializeGame = () => {


      const shuffledValues = shuffleArray(cardValues);


    const finalCards = shuffledValues.map((value , index) =>({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(finalCards);
    setMoves(0);
    setScore(0);
    setFlippedCards([]);
    setIsLocked(false);

  }

  useEffect(() => {
    intializeGame();
  }, []);

  const handleCardClick = (card) => {

   if(card.isFlipped || card.isMatched || flippedCards.length === 2 || isLocked){
    return; 
   }

   const newCards = cards.map((c) => {
    if(c.id === card.id){
      return {...c, isFlipped: true};
    }else{
      return c;
    }  
  });
   setCards(newCards);

   const flippedCard = newCards.find(c => c.id === card.id);
   const newFlippedCards = [...flippedCards, flippedCard];
   setFlippedCards(newFlippedCards);

   if(newFlippedCards.length === 2){
    setIsLocked(true);
    const [firstCard, secondCard] = newFlippedCards;
    if(firstCard.value === secondCard.value){
      const matchedCards = newCards.map((c) => {
        if(c.value === firstCard.value){
          return {...c, isMatched: true};
        }else{
          return c;
        }
      });
      setCards(matchedCards);
      setScore(s => s + 1);
      setIsLocked(false);
    }else{
      setTimeout(() => {
        const resetCards = newCards.map((c) => {
          if(c.id === firstCard.id || c.id === secondCard.id){
            return {...c, isFlipped: false};
          }else{
            return c;
          }
        });
        setCards(resetCards);
        setIsLocked(false);
      }, 500);
    }
    setFlippedCards([]);
    setMoves(m => m + 1);
   }
  }

  const isGameWon = score === cardValues.length / 2;
  
  return{
    cards,
    score,
    moves,
    isGameWon,
    handleCardClick,
    intializeGame
  }
}