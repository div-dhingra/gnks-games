import './HangmanWordGuess.css';

type HangmanWordGuessProperties = { 

  lettersGuessed : string[]
  splitWordToGuess : string[], 

  isRightOrWrong : (letter : string) => string,
  gameOver : boolean

}

const HangmanWordGuess = ( {lettersGuessed, splitWordToGuess, isRightOrWrong, gameOver} : HangmanWordGuessProperties ) => {
  
    return (

        <div className = "HangmanWordGuess-Container">

          {splitWordToGuess.map((letter : string, index : number) => (

              <span className = "letterDisplay" key = {index}  style = { {borderBottom: (letter === " " ? "none" : "") } } >

                <span style = { {color : (gameOver ? isRightOrWrong(letter) : ""),
                 transform: (letter === 'ੂ' || letter === '੍ਹ' || letter === "੍ਰ") ? "translateY( calc( -0.225 * var(--fontSize)) )" : 
                            (letter ===  'ੁ' ? "translateY( calc( -0.125 * var(--fontSize)) )" : "") }} >
                      
                  { (lettersGuessed.includes(letter) || gameOver) ? letter : " "} 

                </span>

              </span>

            )
          )} 

        </div>
    )
}

export default HangmanWordGuess; 