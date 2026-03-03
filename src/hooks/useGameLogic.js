//Game Logic
import { useState } from "react";
export const useGameLogic = (cardValues) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);


  // shuffling the array of the imogies 
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for(let i = shuffled.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const intializeGame = () => {
    //intialization of the game

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

  // Clicking card logic

  const handleCardClick = (card) => {

  // if the card is flipped ot matched or is locked(you alredy flip it)  or matched you can not  flip the card
   if(card.isFlipped || card.isMatched || flippedCards.length === 2 || isLocked){
    return; 
   }
   // logic of flipped card by changing the state of the card (isFLipped become true)
   const newCards = cards.map((c) => {
    if(c.id === card.id){
      return {...c, isFlipped: true};
    }else{
      return c;
    }  
  });
   setCards(newCards);

   //putting the flipped card in the same array of 2 and see 
   const flippedCard = newCards.find(c => c.id === card.id);
   const newFlippedCards = [...flippedCards, flippedCard];
   setFlippedCards(newFlippedCards);

   //cheking if the cards matched by the vlaue of the card
   if(newFlippedCards.length === 2){
    //you can not flipp the card again after you flip 2 cards
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
      //adding score each time you match
      setScore(s => s + 1);
      setIsLocked(false);
    }else{
      setTimeout(() => {

        //if not matched reflipp the cards after 0.5s
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
    //add moves to the score each time you play
    setMoves(m => m + 1);
   }
  }

  //if score equalethe number of matches the game is won
  const isGameWon = score === cardValues.length / 2;
  
  // resting the game
  return{
    cards,
    score,
    moves,
    isGameWon,
    handleCardClick,
    intializeGame
  }
}