import {useState, useEffect, useCallback} from 'react';

import './Hangman.css';

import HangmanDrawing from './HangmanDrawing/HangmanDrawing.js';
import HangmanWordGuess from './HangmanWordGuess/HangmanWordGuess.js';
import VirtualKeyboard from './VirtualKeyboard/VirtualKeyboard.js';
import PunjabiBubblesBackground from '../../PunjabiBubblesAnimation/PunjabiBubblesBackground';

const hangmanWords : string[][] = [ 

/* Baalvardi/Kinder | Stops at "ਨ" */
["ਉੱਲੂ", "ਊਠ", "ਉਂਗਲ", "ਉਂਗਲਾਂ",
"ਅੰਗੂਠਾ", "ਅੱਖ", "ਅਨਾਨਾਸ", "ਅੰਗੂਰ", "ਅੱਗ", "ਆਲ੍ਹਣਾ",  
"ਇੱਕ", "ਇਗਲੂ", "ਇਨਾਮ",
"ਸੱਪ", "ਸੱਤ", "ਸੇਬ", "ਸੂਰਜ", "ਸਿੱਖ ਸਿਪਾਹੀ", 
"ਹੱਥ", "ਹਾਥੀ", "ਹਿਰਨ", "ਹਰਮੋਨੀਅਮ", 
"ਕੱਪਕੇਕ", "ਕੁੜੀ", "ਕੇਕ", "ਕੇਲਾ", "ਕੁੱਕੜ",
"ਖਾਲਸਾ", "ਖੀਰਾ", "ਖੋਤਾ", "ਖੋਪੜੀ", "ਖਿੜਕੀ", 
"ਗੇਂਦ", "ਗਾਜਰ", "ਗਧਾ", "ਗਾਂ", "ਗੋਰਿਲਾ", "ਗਿਲਹਰੀ", "ਗੁਬਾਰੇ", "ਗੋਲ ਚੱਕਰ",
"ਘਰ", "ਘੜੀ", "ਘੁੱਗੀ", "ਘੋੜਾ", "ਘੜਾ", 
// "ਙ",
"ਚਾਰ", "ਚੂਹਾ", "ਚੂਚੇ", "ਚਿਮਟਾ", "ਚੱਪਲ", "ਚੰਨ", 
"ਛੇ", "ਛਤਰੀ", "ਛੱਤ", 
"ਜੁਰਾਬਾਂ", "ਜਾਦੂਗਰ", "ਜੁੱਤੀ", "ਜਹਾਜ", 
"ਝੰਡਾ", "ਝੌਂਪੜੀ", "ਝਰਨਾ", "ਝਾੜੀਆਂ", 
// "ਞ",
"ਟਮਾਟਰ", "ਟਰੱਕ", "ਟੈਕਸੀ", "ਟਰਾਲੀ", 
"ਠੀਕ", "ਠੋਡੀ", "ਠਹਿਰੋ", "ਠੰਢ", 
"ਡਾਇਨੋਸੋਰ", "ਡਫਲੀ", "ਡੱਡੂ", "ਡਰੱਮ", "ਡੱਬਾ", "ਡੋਨਟ", 
"ਢੱਕਣ", "ਢਿੱਡ", "ਢੋਲ", "ਢੋਲਕੀ", "ਢਾਡੀ ਜੱਥਾ",
// "ਣ",
"ਤਿੰਨ", "ਤਰਬੂਜ਼", "ਤਲਵਾਰ", "ਤਿਤਲੀ", "ਤੋਤਾ", "ਤਾੜੀ", "ਤਾਰਾ", 
"ਥੈਲੀ", "ਥਰਮਾਮੀਟਰ", "ਥਾਲੀ", "ਥੱਪੜ", "ਥੰਮ੍ਹਲਾ", 
"ਦੋ", "ਦੰਦ", "ਦਰਖਤ", "ਦਿਲ", "ਦੁੱਧ", "ਦੌੜਨਾ", "ਦਰਵਾਜਾ", "ਦਵਾਈ", 
"ਧੁੰਨੀ", "ਧਰਤੀ", "ਧੁੱਪ", "ਧੂਆਂ", "ਧੱਕਾ",
"ਨਾਰੀਅਲ", "ਨੱਕ","ਨਿੱਛ", "ਨੌਂ", "ਨੀਲੀ ਜੇ"], 

/* Level 1*/
["ਊਠ", "ਉੱਲੂ", "ਉਦਾਸ", "ਉਂਗਲ", "ਓਕ", "ਓਕੇ", 
"ਅੱਠ", "ਅੰਗੂਠਾ", "ਅੱਖ", "ਅੱਗ", "ਅੰਗੂਰ", "ਅਗਸਤ", "ਅਫਸਰ", "ਅਜਗਰ", "ਅਲਸਰ", "ਅਕਸ", "ਅੱਜ", "ਅੱਡ", "ਅਨਹਦ", "ਔਕਟੋਪਸ", "ਐਤਵਾਰ", 
 "ਇਕ", "ਇਨਾਮ", "ਇੱਟ", "ਇੱਲ", "ਇਮਾਰਤ", "ਇਗਲੂ", "ਇੰਜਣ", 
 "ਸੱਪ", "ਸੱਤ", "ਸੂਰ", "ਸੇਬ", "ਸਰਦਾਰ ਜੀ", "ਸਰਕਸ", "ਸਰਜਨ", "ਸੰਤਰੀ", "ਸੰਤਰਾ", "ਸਿਰ", "ਸੱਟ", "ਸੱਚ", "ਸਰਦੀ", "ਸੱਠ", "ਸਭ", "ਸਲੇਟੀ", "ਸਤਰੰਗੀ ਪੀਂਘ", "ਸੋਮਵਾਰ",
"ਹੱਥ", "ਹਾਥੀ", "ਹਿੱਪੋ", "ਹੈਲੀਕੌਪਟਰ", "ਹਿਰਨ", "ਹੱਸ", "ਹਰਾ", "ਹੱਚ", "ਹਨੇਰੀ", "ਹੱਡੀ", "ਹਵਾ",
"ਕੰਨ", "ਕੁਲਫੀ", "ਕੰਘੀ", "ਕੁੜੀ", "ਕੁੱਤਾ", "ਕੈਂਚੀ", "ਕਣਕ", "ਕਸਰਤ", "ਕੱਟ", "ਕੱਛ", "ਕੱਚ", "ਕੰਧ", "ਕਦ", "ਕੱਪ", "ਕਾਲਾ",
"ਖੁਸ਼", "ਖਿਡਾਰੀ", "ਖੋਤਾ", "ਖਸਖਸ", "ਖੋਪੜੀ", "ਖਤਮ", 
"ਗੋਡਾ", "ਗਿਆਰਾਂ", "ਗਾਂ", "ਗਿਲਹਰੀ", "ਗਿੱਟਾ", "ਗਰਦਨ", "ਗਾਜਰ", "ਗੁੱਸਾ", "ਗਦਗਦ", "ਗੁਬਾਰੇ", "ਗੁਲਾਬੀ", "ਗਲਤ", "ਗਲ਼", "ਗੋਲ ਚੱਕਰ",
"ਘਰ", "ਘੋੜਾ", "ਘੰਟੀ", "ਘੁੱਗੀ", "ਘੜਾ", "ਘੜੀ", "ਘੱਟ", 
// "ਙ",
"ਚਾਰ", "ਚੂਹਾ", "ਚੂਚੇ", "ਚੀਤਾ", "ਚੰਨ", "ਚਮਚ", "ਚੱਪਲ", "ਚੱਟ",
"ਛੇ", "ਛਾਤੀ", "ਛਿਪਕਲੀ", "ਛੋਟਾ", "ਛੱਤਰੀ", "ਛਿੱਕ", "ਛੱਤ", "ਛੱਡ",
"ਜੱਗ", "ਜਹਾਜ", "ਜੁੱਤੀ", "ਜਿਰਾਫ਼", "ਜੱਜ", "ਜੱਟ", "ਜਦ", "ਜਖਮ", "ਜਾਮਨੀ", 
"ਝੰਡਾ", "ਝਾੜੂ", "ਝੀਂਗਾ", "ਝੱਗ", "ਝਪਟ",
// "ਞ", 
"ਟਮਾਟਰ", "ਟੀਵੀ", "ਟੀਕਾ", "ਟਰੈਕਟਰ", "ਟੈਕਸੀ", "ਟੈਂਟ", 
"ਠੋਡੀ", "ਠਹਿਰੋ", "ਠਕਠਕ", "ਠੰਢ", "ਠੋਕਰ", "ਠੱਪਾ", "ਠੱਗ", 
"ਡਾਇਨੋਸੋਰ", "ਡੱਡੂ", "ਡੌਲਫ਼ਿਨ", "ਡਾਲਰ", "ਡਰਾਇਅਰ", "ਡਫਲੀ", "ਡਸਟਰ", 
"ਢਿੱਡ", "ਢੋਲ", "ਢੱਕਣ", "ਢਾਈ", "ਢੱਕ",
// "ਣ",
"ਤਿਤਲੀ", "ਤਿੰਨ", "ਤਬਲਾ", "ਤਰਬੂਜ", "ਤੋਤਾ", "ਤਖ਼ਤ", 
"ਥੱਪੜ", "ਥਾਲੀ", "ਥਰਮਸ", "ਥੈਲਾ", "ਥੱਕਿਆ", "ਥੱਕੀ", "ਥੰਮ੍ਹਲਾ",
"ਦੰਦ", "ਦਸ", "ਦੋ", "ਦਰਖਤ", "ਦੁੱਧ", "ਦੂਰਬੀਨ", "ਦਰਵਾਜਾ", "ਦਰਦ", "ਦੀਵਾ", "ਦਾੜ੍ਹੀ",
"ਧੱਕਾ", "ਧਰਤੀ", "ਧੁੱਪ", "ਧਾਰੀਆਂ", "ਧੁੰਧ", 
"ਨੌਂ", "ਨੱਕ", "ਨਿਸ਼ਾਨ ਸਾਹਿਬ", "ਨਹੁੰ", "ਨਾਸ਼ਪਾਤੀ", "ਨੀਲਾ",
"ਪੰਜ", "ਪਾਣੀ", "ਪੈਰ", "ਪੱਗ", "ਪੈਰਾਸ਼ੂਟ", "ਪਤੰਗ", "ਪਜ਼ਲ", "ਪੈਨਸਿਲ", "ਪੱਟ", "ਪਪੀਤਾ", "ਪਤੰਗਾ", "ਪਲਕ", "ਪਲਕਾਂ", "ਪੀਲਾ", 
"ਫਲ", "ਫੁੱਲ", "ਫੇਫੜੇ", "ਫੁਹਾਰਾ", "ਫਸਲ", "ਫਰਕ", "ਫਸ", 
"ਬਟਨ", "ਬਾਰਾਂ", "ਬਿੱਲੀ", "ਬਰਫ਼", "ਬਾਂਹ", "ਬਾਂਦਰ", "ਬੂਟ", "ਬਲਬ", "ਬੱਸ", "ਬਕਬਕ", "ਬੱਦਲ", "ਬਿਮਾਰ", "ਬਰਗਰ", "ਬੁੱਧਵਾਰ",
"ਭਰਵੱਟਾ", "ਭੇਡ", "ਭੂਤ", "ਭਰਾ", "ਭੈਣ", "ਭਾਲੂ", "ਭੜਕ", "ਭਰੋ", "ਭੂਰਾ", 
"ਮੀਂਹ", "ਮੱਥਾ", "ਮੱਛੀ", "ਮੋਰ", "ਮੋਮਬੱਤੀ", "ਮੱਝ", "ਮੁਰਗੀ", "ਮਸਤ", "ਮੋੜ", "ਮੋਮਬੱਤੀ", "ਮੰਗਲਵਾਰ",
"ਯੂਨੀਕੋਰਨ", "ਯੋਯੋ", "ਯਾਕ", "ਯਮੀ", "ਯੈਸ", "ਯਕਦਮ", "ਯਮ", "ਯਕ",
"ਰਾਤ", "ਰੈਕੂਨ", "ਰੱਖ", "ਰੇਲ ਗੱਡੀ", "ਰੱਸੀ", "ਰੋਟੀ", "ਰਿਬਨ", "ਰੇਨਬੋ", "ਰਬ",
"ਲੱਤ", "ਲੱਭ", "ਲੇਡੀਬਗ", "ਲਾਲ", "ਲਾਲਟਨ", "ਲਕੀਰ", "ਲੂਮੜੀ", "ਲੈਂਪ",
"ਵਾਹਿਗੁਰੂ", "ਵਾਇਲੇਟ", "ਵਾਲ", "ਵੀਹ", "ਵਾਕਰ", "ਵੱਛਾ", "ਵੀਰਵਾਰ",
//"ੜ",
"ਸ਼ੇਰ", "ਸ਼ੁੱਕਰਵਾਰ", "ਸ਼ਨੀਵਾਰ", 
//"ਖ਼",
//"ਗ਼",
"ਜ਼ੀਰੋ", "ਜ਼ੈਡ", "ਜ਼ੀ", "ਜ਼ੀਬਰਾ", 
//"ਫ਼",
/* "ਲ਼" */]

];

const specialLettersArray: string[] = ['ਆ', 'ਇ', 'ਈ', 'ਉ', 'ਊ', 'ਏ', 'ਐ', 'ਓ', 'ਔ', '੍']; 

type HangmanProperties = {

    levelSelected : number
    // The 'hangmanWords"-Array is indexed on the level that was selected by the user from the submenu, 
    // and the random-word from that level (2D-array)!

}

const Hangman = ({levelSelected} : HangmanProperties) => { 

    // This function filters the current Hangman-Word in a way that splits all letters and matras in a literarily-accurate manner. 
    // Ex) The 'Sihaari-matra' is written & shown in front of the letter, in Punjabi. BUT, when typing a word with sihaari on the keyboard, 
    // in order to output sihaari in front of the designated letter, it must be typed AFTER [not before] that letter. This means that, initially, 
    // the sihaari comes after its designated letter in the string-index. In reality, HOWEVER, the sihaari should come ('be written') BEFORE its 
    // designated letter, as that is 'literarily-correct' with the syntax of the Punjabi-language.  
    function splitAndCleanWord(guessWord : string) : string[] { 

            let cleanWordArr : string[] = guessWord.split('');

            for (let i : number = 0; i < cleanWordArr.length; i++) {

                if ( specialLettersArray.includes(cleanWordArr[i]) ) 
                {
                    if (cleanWordArr[i] === "ਆ")
                    {
                        cleanWordArr.splice(i, 1, "ਅ", "ਾ");
                    }  
        
                    else if (cleanWordArr[i] === "ਇ") 
                    {
                        cleanWordArr.splice(i, 1, 'ਿ', "ੲ");
                    }
        
                    else if (cleanWordArr[i] === "ਈ") 
                    {
                        cleanWordArr.splice(i, 1, "ੲ", 'ੀ');
                    }
        
                    else if (cleanWordArr[i] === "ਉ") 
                    {
                        cleanWordArr.splice(i, 1, "ੳ", 'ੁ');
                    }
        
                    else if (cleanWordArr[i] === "ਊ") 
                    {
                        cleanWordArr.splice(i, 1, "ੳ", 'ੂ');
                    }
        
                    else if (cleanWordArr[i] === "ਏ") 
                    {
                        cleanWordArr.splice(i, 1, "ੲ", 'ੇ');
                    }
        
                    else if (cleanWordArr[i] === "ਐ") 
                    {
                        cleanWordArr.splice(i, 1, "ਅ", 'ੈ');
                    }
        
                    else if (cleanWordArr[i] === "ਓ") 
                    {
                        cleanWordArr.splice(i, 1, "ੳ", 'ੋ');
                    }
        
                    else if (cleanWordArr[i] === "ਔ")
                    {
                        cleanWordArr.splice(i, 1, "ਅ", 'ੌ');
                    }

                    // For paar-hahas and paar-raaras. When typing them online, typically, they are split into 2 characters --> '੍' + 'ਹ' OR  '੍' + 'ਰ'. Here, this conditional combines (binds)
                    // these two characters to produce a singular binded-string, i.e. the paar-raara ("੍ਰ") && the paar-hah ("੍ਹ"). This enables the users to only have to click one 'character' 
                    // (instead of 2, as '੍' is not even a written Punjabi Matra, itself) to output any of these 2 matras, aligning with the actual Phonetics of Punjabi / Punjabi-writing.
                    else if (cleanWordArr[i] === '੍') {

                        cleanWordArr.splice(i, 2, ('੍' + cleanWordArr[i + 1]) );
                        // Deletes 2 elements, starting at the '੍' —index. ALONE, this isn't a matra, BUT it combines with the next character (i.e. the letters 'Haha' and 'Rarra') to form the paar-matra. 
                        // So, we can delete those 2 elements, FOR THE COST OF 1 BINDED-STRING IN OUR cleanWordArr STRING-ARRAY, allowing the paar-rara and paar-haha to be treated as 
                        // a 'SINGLE CHARACTER', which is INJECTED AT OUR 'currIndex'!
                    }
                    
                }
        
                // For sihaari we do a swap, as, in order to be displayed before a letter (Punjabi Syntax), it has to be entered AFTER the letter it precedes.
                // NOTE: After splitting a binded-letter with a sihaari, the length of the array increases by one, and the next 'letter' (the Sihaari-Matra) is then checked. 
                // So this else-if placement works in all cases, as forEach is index-based in this manner.
                // If any sihaari in the current Hangman Word has already been filtered to the 1st-index, then we don't need to move it. 
                // SO, in that case, it will skip this condtional. Else, proceed as outlined below, to completely 'filter' the current HangmanWord, in a manner consistent 
                // with how the Punjabi-language is physically written!
                else if (cleanWordArr[i] === 'ਿ' && i != 0) 
                { 
                    // Swap with previous letter to be displayed before it, which is how the Sihaari-'ਿ' is written in Punjabi (BEFORE the letter it is used with).
                    // NOTE: 'Sihaari' can never be the first-element (index: 0), as it is always typed AFTER the letter is displayed-with (displayed before), so negative-indices aren't an issue (index: -1 = N/A) 
                    let prev : string =  cleanWordArr[i - 1];
        
                    cleanWordArr[i - 1] = cleanWordArr[i];
                    cleanWordArr[i] = prev;    
        
                }

            }

            // After cleaning guessWord, we return this cleaned-and-split version of it to the `cleanedGuessWord` state-variable.
            return cleanWordArr;
    }

    const [guessWord, setGuessWord] = useState<string>(hangmanWords[levelSelected][Math.floor(Math.random() * hangmanWords[levelSelected].length)]);
    
    // The 'cleanedGuessWord' accurately splits the guessWord (in a manner consistent with the Punjabi-language), letter-by-letter && matra-by-matra. 
    // As such, it can be properly displayed on the screen, in the <HangmanWordGuess/>-Component.
    // That is, each letter/matra in the current HangmanWord (current 'guessWord') is correctly split and displayed, ON ITS OWN BLANK-LINE.
    // FURTHER, the logic of Hangman is premised on splitting a given word into EACH, INDIVIDUAL CHARACTER. 
    // For certain Punjabi-Strings on the web, the Matra & Letter bind-together (meaning, two letters combine as '1 character').
    // Since this would mean that the certain index-values of the 'guessWord' are actually 2 characters, binded together as 1, we need 
    // to filter them, so that they are split apart, allowing Hangman to be played properly. 
    // THEREFORE: 'cleanedGuessWord' takes in the cleaned (filtered), and properly-split version of the current guessWord!
    const [cleanedGuessWord, setCleanedGuessWord] = useState<string[]>(splitAndCleanWord(guessWord));
   
    const [lettersGuessed, setLettersGuessed] = useState<string[]>([]); 

    const [virtualKeyboard, setVirtualKeyboard] = useState<string>("virtualKeyboard_PentyAkhri");
    
    // 
    const isIncorrect = (guessedLetter : string) : boolean => { 

        return (

            // Ignore " "-spaces as characters for 2-word HangmanPhrases, as the user SHOULDN'T get punished for NOT manually guessing a 
            // " "-space character.
            !cleanedGuessWord.includes(guessedLetter) && guessedLetter != " "
        )
    }

    const incorrectLetters : string[] = lettersGuessed.filter(isIncorrect);

    // Adds each letter to the 'guessedLetters' array, only if the button corresponding to said letter is clicked. 
    const addGuessedLetter = useCallback((letter : string) => {
       
        setLettersGuessed((currentLettersGuessedArr) => [...currentLettersGuessedArr, letter, " "]);

    }, [lettersGuessed]);

    const isWinner : boolean =  cleanedGuessWord.every(letter => lettersGuessed.includes(letter) );
    const isLoser : boolean = (incorrectLetters.length === 8);

   // Applies a color of "red or green" to each letter in the current "HangmanWord" (at the end of each round), based on whether or not 
   // it was correctly guessed!
   function isRedOrGreenText(letter : string) : string { 
        
        //If the letter was already clicked (i.e., guessed)
        if(lettersGuessed.includes(letter) && cleanedGuessWord.includes(letter)) 
        {
            //If the letter is in the HangmanWord, itself --> true ==> color : "green"
            return "#7CFC00";
        }

        // If the letter IS NOT in the HangmanWord, itself --> false ==> color : "red"
        return "rgb(230, 0, 0)";
    }

    // Changes background of each button to red or green (at the end of each round), based on whether or not it was guessed correctly!
    // NOTE: At the end of each round, buttons not guessed (not clicked) remain 'transparent' ("disabled"-color for a button).
    function isRedOrGreenBackground(letter : string) : string | undefined { 
        
        //If the letter was already clicked (i.e., guessed)
        if(lettersGuessed.includes(letter)) 
        {
            //If the letter is in the HangmanWord, itself --> true ==> backgroundColor : "green"
            if (cleanedGuessWord.includes(letter))
            {
                return "green";
            }

            // If the letter IS NOT in the HangmanWord, itself --> false ==> backgroundColor: "red"
            else { 

                return "#990000";
            }
        }

    }

    const resetGame = () => {
       
        // Auto-includes the 'space'-character as a guessed-character for each round, so that, if there is a 2-word Hangman-Phrase for the current round, 
        // the player WON'T be penalized for not guessing a " "-blank-space!
        setLettersGuessed([" "]);

        let randomHangmanWord : string = hangmanWords[levelSelected][Math.floor(Math.random() * hangmanWords[levelSelected].length)];
        
        setGuessWord(randomHangmanWord);
        setCleanedGuessWord(splitAndCleanWord(randomHangmanWord));

        setVirtualKeyboard("virtualKeyboard_PentyAkhri");
    };

    useEffect(() => {

        // '1 round' : 1 word (8 chances for 8 'body parts')

        resetGame();
        // 'resetGame()' -> Called for each new round (new word). 
        // At the end of each round, it RESETS the current word to the next random word, and resets (empties) the letters-guessed array.

    }, [levelSelected])

    return ( 

        <main className = "Hangman-Container">
        
            <HangmanDrawing numberWrongGuesses = {incorrectLetters.length} resetGame={resetGame} isWinner = {isWinner}  isLoser = {isLoser} unfilteredWordToGuess={guessWord}/>
             
            <HangmanWordGuess splitWordToGuess = {cleanedGuessWord} lettersGuessed = {lettersGuessed} isRightOrWrong={isRedOrGreenText} gameOver = {isWinner || isLoser} />

            <VirtualKeyboard lettersGuessed = {lettersGuessed} addGuessedLetter = {addGuessedLetter} isRightOrWrong = {isRedOrGreenBackground} gameOver = {isWinner || isLoser}
             virtualKeyboard= {virtualKeyboard} setVirtualKeyboard = { setVirtualKeyboard }/>

             <PunjabiBubblesBackground/>

        </main>
        
    )
}


export default Hangman; 