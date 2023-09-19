import './VirtualKeyboard.css';

const pentyAkhriLetters: string[] = ['ੳ', 'ਅ', 'ੲ', 'ਸ', 'ਹ', 'ਕ', 'ਖ', 'ਗ', 'ਘ', 'ਙ', 'ਚ', 'ਛ', 'ਜ', 'ਝ', 'ਞ', 
'ਟ', 'ਠ', 'ਡ', 'ਢ', 'ਣ', 'ਤ', 'ਥ', 'ਦ', 'ਧ', 'ਨ', 'ਪ', 'ਫ', 'ਬ', 'ਭ', 'ਮ', 'ਯ', 'ਰ', 'ਲ', 'ਵ', 'ੜ', 'ਸ਼', 'ਖ਼', 'ਗ਼', 'ਜ਼',
'ਫ਼'];

const matraLetters: string[] = ['ਿ', 'ੀ', 'ੁ', 'ੂ', 'ੋ', 'ੌ', 'ੈ', 'ੇ', 'ਾ', 'ੰ', 'ੱ', 'ਂ', "੍ਰ", "੍ਹ"];

type VirtualKeyBoardProps = { 

    lettersGuessed : string[], 
    addGuessedLetter: (letter : string) => void,

    isRightOrWrong : (letter : string) => string | undefined,
    gameOver : boolean,

    virtualKeyboard : string,
    setVirtualKeyboard : (keyboard : string) => void 
}

const VirtualKeyboard = ( {lettersGuessed, addGuessedLetter, isRightOrWrong, gameOver, virtualKeyboard, setVirtualKeyboard} :
                           VirtualKeyBoardProps) => {

    const changeKeyboard = () => {
        
        if (virtualKeyboard === "virtualKeyboard_PentyAkhri") {

            setVirtualKeyboard("virtualKeyboard_Matra");
        }

        else {
            
            setVirtualKeyboard("virtualKeyboard_PentyAkhri");
        }
    }   

   const rowButtons = (FIRST_PentyAkhriArray_Index : number, LAST_PentyAkhriArray_Index : number, FIRST_MatraArray_Index? : number,
                       LAST_MatraArray_Index? : number) => {

        if ( virtualKeyboard === "virtualKeyboard_PentyAkhri" ) {

            return (

                (pentyAkhriLetters).slice(FIRST_PentyAkhriArray_Index, LAST_PentyAkhriArray_Index).map( (letter) => (
    
                    <button key = {letter} className = 'btn' onClick = { () => { addGuessedLetter(letter); } } 
                     disabled = { (lettersGuessed.includes(letter) ? true : false) || gameOver}
                     style = { { backgroundColor: isRightOrWrong(letter) } } > 
    
                        {letter}
    
                    </button>

                ))
            )

        }   

        else if (virtualKeyboard === "virtualKeyboard_Matra" && (FIRST_MatraArray_Index != undefined &&  LAST_MatraArray_Index != undefined) ) {

            return (

                (matraLetters).slice(FIRST_MatraArray_Index,  LAST_MatraArray_Index).map( (letter) => (
    
                    <button key = {letter} className = 'btn' onClick= { () => { addGuessedLetter(letter); } } 
                     disabled = { (lettersGuessed.includes(letter) ? true : undefined) || gameOver ? true : undefined}
                    style = { { backgroundColor: isRightOrWrong(letter) } } > 
    
                        {letter}
    
                    </button>
                ))
            )

        }

    }; 

    return ( 

        <div className = "virtualKeyboard" > 

            <div className = "row1">
                { rowButtons(0, 10, 0, 4) }
            </div>    


            <div className = "row2"> 
                {rowButtons(10, 20, 4, 8)}
            </div>    


            <div className = "row3"> 
                {rowButtons(20, 30, 8, 12)}
            </div>    

            <div className = "row4"> 
                {rowButtons(30, 40, 12, 14)}
            </div>   

            <div className = "rowMatra"> 

                <button className = "Matra" onClick = { () => { changeKeyboard(); } }> MATRA </button>
                
            </div>

        </div>
    )
}

export default VirtualKeyboard; 