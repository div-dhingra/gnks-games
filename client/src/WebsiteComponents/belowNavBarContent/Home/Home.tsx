import './Home.css';
import PunjabiBubblesBackground from '../PunjabiBubblesAnimation/PunjabiBubblesBackground.tsx';

import {useState} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGlobe} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    
    const [isPunjabi, setIsPunjabi] = useState<boolean>(true);

    return (

            <div className = "homeContent"> 

                <ul className = "line-paper-container" >
                    
                    <li> </li>

                    <li className = {isPunjabi ? "homeText punjabiPhrase" : "homeText englishPhrase"} > { isPunjabi === true ? " ਆਉ! ਪੰਜਾਬੀ ਨਵੇਂ ਤਰੀਕੇ ਨਾਲ ਸਿੱਖੀਏ!" : "Come! Let's Learn Punjabi in a Fun Way!" } </li>
                    
                    <li> 

                        <button className = "translationButton" onClick = { () => {setIsPunjabi(prev => !prev); } } > 

                            <FontAwesomeIcon icon={faGlobe} className = "translationIcon" />
                            <span> Translate </span> 

                        </button>
                    
                    </li>

                </ul>

                <PunjabiBubblesBackground/>

            </div>
        
            

    )
}

export default Home; 