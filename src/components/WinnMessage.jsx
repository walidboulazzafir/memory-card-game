import React from 'react'

function WinnMessage({ moves }) {
  return (
    <div className='win-message'>
        <h2>Congratulations! </h2>
        <p>You've won the game in {moves} moves</p>
    </div>
  )
}

export default WinnMessage