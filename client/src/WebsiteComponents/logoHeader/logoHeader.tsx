import React from 'react'; 
import {Link} from 'react-router-dom';

import './logoHeader.css'; 

const LogoHeader = () => (
    
    <header className = "logoHeader-Box">

        <div className = "leftText"> 
            Guru Nanak
        </div>

        <div className = "logoHeader-Image"> 

            <Link to = "/"> 
                <img src = "/SummerGamesImages/PunjabiSchoolGames.jpg" alt="GNKSGames-Cube" />
            </Link>   
  
        </div>

        <div className = "rightText"> 
            Khalsa School
        </div>

        <Link to = "/"> 
            <div className = "gamesText"> 

                <span style={ {"--letterNum": "1"} as React.CSSProperties } > 
                    GAMES
                </span>

                <span style={ {"--letterNum": "2"} as React.CSSProperties } > 
                    GAMES
                </span> 

                {/* style={ {"--letterNum": "3"} } */}
                <span style={ {"--letterNum": "3"} as React.CSSProperties } > 
                    GAMES
                </span>

                <span style={ {"--letterNum": "4" } as React.CSSProperties } > 
                    GAMES
                </span>

                <span style={ {"--letterNum": "5"} as React.CSSProperties } > 
                    GAMES
                </span>

            </div> 

        </Link>   

   </header> 
   
)

export default LogoHeader; 