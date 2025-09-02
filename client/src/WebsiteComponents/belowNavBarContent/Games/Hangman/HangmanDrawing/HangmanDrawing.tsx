import './HangmanDrawing.css';

import {useState, useEffect, useRef} from 'react';

// Gutti
const HEADCOVER = (

    <div className = "gutti" key = "gutti">

        {/* Gutti Rounded Top */}
        <div/>

        {/* Gutti Base */}
        <div/>

        <img src= '/SummerGamesImages/BlueKhanda.png' alt='' />

    </div>

)

const HEAD = (

    <div className = "head" key = "head"/>
)

const BODY = ( 

    <div className = "body" key = "body"/>
)

const LEFTARM = ( 

    <div className = "leftArm" key = "leftArm"/> 
)

const RIGHTARM = ( 

    <div className = "rightArm" key = "rightArm"/> 
)

const LEFTLEG = ( 

    <div className = "leftLeg" key = "leftLeg"/> 
)

const RIGHTLEG = ( 

    <div className = "rightLeg" key = "rightLeg"/> 
)

const KARDA = ( 

    <div className = "karda" key = "karda"/> 
)   

type HangmanDrawingProperties = { 

    numberWrongGuesses: number,
    resetGame : () => void,
    isWinner : boolean,
    isLoser : boolean,

    unfilteredWordToGuess : string,
    imageHintUrl: string
}

const HangmanDrawing = ( {numberWrongGuesses, resetGame, isWinner, isLoser, unfilteredWordToGuess, imageHintUrl} : HangmanDrawingProperties ) => {
    const HANGMAN_PARTS : JSX.Element[] = [HEADCOVER, HEAD, BODY, LEFTARM, RIGHTARM, LEFTLEG, RIGHTLEG, KARDA]; 
    return (

       <div className = "overallContainer">

            <div className = "drawingContainer"> 

                <div className = "rope"/>

                <div className = "topBar"/> 
                <div className = "middleBar"/>
                <div className = "bottomBar"/>
                <div className = "skewedBar" />

                { HANGMAN_PARTS.slice(0, numberWrongGuesses) }
            
            </div>


            <div className = "imageAndResultContainer">

                <div className = "winOrLose-Text"> 

                    <span style = {{visibility: (isWinner || isLoser) ? "visible" : "hidden", color: (isWinner ? "#7CFC00" : "#fd5c63" ), fontWeight: "bold"}}>

                        <span> {isWinner ?  "CONGRATS! The Word Is: " : (isLoser ? "Nice Try! The Correct Word: " : "" )} </span>
                        <span className = "winOrLose-Text-row2"> {unfilteredWordToGuess} </span>

                    </span>

                </div>

                <div className= "imageGenContainer"> 

                    <img src = {imageHintUrl} style = { {display : imageHintUrl === "" ? "none" : ""}}/> 

                    <div className = "loaderAndLoading_Container" style = { {display : imageHintUrl === "" ? "" : "none"}} >

                        <div className = "loader"/> 
                        <p className = "loadingText" > Loading </p>

                    </div>

                </div>  

                <button className = "regenerateBtn" disabled = { imageHintUrl === "" ? (isWinner || isLoser ? false : true) : false }
                  onClick = { () => { resetGame(); } } > 
                    Generate
                </button>
             
            </div> 

        </div>
    )
    
}

export default HangmanDrawing; 