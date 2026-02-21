import React from 'react'
import { FaQuestionCircle } from "react-icons/fa";




function Card({ card, onclick }) {
  return (
    <div className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`} onClick={()=> onclick(card)}>
        <div className="card-front"><FaQuestionCircle /></div>
        <div className="card-back">
            {card.value}
        </div>
    </div>
  )
}

export default Card