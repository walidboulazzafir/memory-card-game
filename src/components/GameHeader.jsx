import React from 'react';
import { SlGameController } from "react-icons/sl";
import { TiPlusOutline } from "react-icons/ti";



function GameHeader({ score, moves , onReset }) {
  return (
    <div className="game-header">
      <h1>
        <SlGameController />
        Memory Card Game
        </h1>
        <div className='stats'>
            <div className='stat-item'>
                <span className='stat-label'>Score:</span>
                <div className='stat-value'>{score}</div>
            </div>
            <div className='stat-item'>
                <span className='stat-label'>Moves:</span>
                <div className='stat-value'>{moves}</div>
            </div>
        </div>

        <button className="reset-btn" onClick={onReset}>
            <TiPlusOutline className='new-icon' />
            New Game
        </button>
    </div>
  )
}

export default GameHeader