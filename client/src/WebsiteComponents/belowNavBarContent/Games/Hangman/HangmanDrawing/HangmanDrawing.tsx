import './HangmanDrawing.css';

import {useState, useEffect} from 'react';

// Gutti
const HEADCOVER = (

    <div className = "gutti" key = "gutti">

        {/* Gutti Rounded Top */}
        <div> 

        </div>

        {/* Gutti Base */}
        <div> 

        </div>

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
}

const HangmanDrawing = ( {numberWrongGuesses, resetGame, isWinner, isLoser, unfilteredWordToGuess} : HangmanDrawingProperties ) => {
    
    const HANGMAN_PARTS : JSX.Element[] = [HEADCOVER, HEAD, BODY, LEFTARM, RIGHTARM, LEFTLEG, RIGHTLEG, KARDA]; 
    const [dalleImageURL, setDalleImageURL] = useState<string>("");
   
    const translateHangmanWord = async () => {
        
        const requestData = {

            method: "POST",
            headers: {

                "content-type": 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({

                punjabiTextToTranslate : unfilteredWordToGuess
            }), 
        }

        try {

            const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/translate-text`, requestData);

            if (!response.ok) {

                throw new Error(`${response.status}`)
            }

            const result = await response.text();
            
            return result;

        } catch (error) {

            console.error(error);
        }

    }
   
    const generateChatGPT_AIPrompt = async (translatedText? : string) => {

        const requestData = {

                method: "POST",
                headers: {

                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({

                    translatedText
                })
        }

        try {

            const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/gpt-prompt`, requestData);
          
            if (!response.ok) {

                  throw new Error(`${response.status}`)
            }

            const data = await response.text();

            return data; 

        } catch (error) {

            console.error(error);
        }
    }

    const generateDALLE_Image = async (DALLE_Prompt? : string) => {


        const requestData = {

            method: "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                DALLE_Prompt
            })
        }

        try {   

            const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/dalle-image`, requestData);

            if (!response.ok) {

                  throw new Error(`${response.status}`)
            }

            const data = await response.text();

            return data;
        
        } catch(error) {
            
            console.log(error);
        }

    } 

    const createImageURL = async () => {

        try {

            const translatedText : string | undefined = await translateHangmanWord();
            const DALLE_Prompt : string | undefined = await generateChatGPT_AIPrompt(translatedText);
            const DALLE_Image_URL : string | undefined = await generateDALLE_Image(DALLE_Prompt);

            setDalleImageURL(() => DALLE_Image_URL || ""); 

        } catch (error) {

            console.error(error);
        }    
    }

    useEffect(() => {

        setDalleImageURL(() => "");
        
        createImageURL();

    }, [unfilteredWordToGuess])

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

                    <img src = {dalleImageURL} style = { {display : dalleImageURL === "" ? "none" : ""}}/> 

                    <div className = "loaderAndLoading_Container" style = { {display : dalleImageURL === "" ? "" : "none"}} >

                        <div className = "loader"/> 
                        <p className = "loadingText" > Loading </p>

                    </div>

                </div>  

                <button className = "regenerateBtn" disabled = { dalleImageURL === "" ? (isWinner || isLoser ? false : true) : false }
                  onClick = { () => { resetGame(); } } > 

                    Generate
                    
                </button>
             
            </div> 

        </div>
    )
    
}

export default HangmanDrawing; 