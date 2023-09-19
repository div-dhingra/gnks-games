import { useEffect, useState} from 'react';

import './PunjabiBubblesBackground.css';

const punjabiLetters : string[] = ['ੳ', 'ਅ', 'ੲ', 'ਸ', 'ਹ', 'ਕ', 'ਖ', 'ਗ', 'ਘ', 'ਙ', 'ਚ', 'ਛ', 'ਜ', 'ਝ', 'ਞ', 
'ਟ', 'ਠ', 'ਡ', 'ਢ', 'ਣ', 'ਤ', 'ਥ', 'ਦ', 'ਧ', 'ਨ', 'ਪ', 'ਫ', 'ਬ', 'ਭ', 'ਮ', 'ਯ', 'ਰ', 'ਲ', 'ਵ', 'ੜ', 'ਸ਼', 'ਖ਼', 'ਗ਼', 'ਜ਼',
'ਫ਼', 'ਿ', 'ੀ', 'ੁ', 'ੂ', 'ੋ', 'ੌ', 'ੈ', 'ੇ', 'ਾ', 'ੰ', 'ੱ', 'ਂ', "੍ਰ", "੍ਹ"];

const PunjabiBubblesBackground = () => {
    
    const[randLetters, setRandLetters] = useState<string[]>([]);
   
    const letterUpdate_Interval : number = 6000;
    const numBubbles : number = 26; 

    const insert_randomLetters = (arrayLength : number) : string[] => {

        let tempLetters : string[] = [];
    
        for (let i : number = 0; i < arrayLength; i++) {
    
            tempLetters.push(punjabiLetters[ Math.floor(Math.random() * punjabiLetters.length) ]);
        }
    
        return tempLetters; 
    }
 
    useEffect(() => {
        
        setRandLetters(insert_randomLetters(numBubbles));
    
        const intervalID =  setInterval(() => setRandLetters(insert_randomLetters(numBubbles)), letterUpdate_Interval);

        return () => {
            
            clearInterval(intervalID);
        };

    }, []);
    
    return (
        <div className = "squarebubbles-container"> 


            { randLetters.map((letter, index) => (
            
                <figure key = {index} > 
                    
                    <span> 
                        {letter}
                    </span>
                
                </figure>   
            
            ))}

        </div>
    )
}

export default PunjabiBubblesBackground;