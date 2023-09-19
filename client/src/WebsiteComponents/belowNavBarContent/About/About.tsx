import './About.css'

import PunjabiBubblesBackground from '../PunjabiBubblesAnimation/PunjabiBubblesBackground';

const About = () => {

    return ( 

        <div className = "about-Container"> 

            <div className= "about-summary-container"> 


                <header>
                
                    <span className = "about-title">
                        About Us
                    </span>
        
                </header>
                
                <div className= "about-content">

                    <p> 
                        GNKS Games aims to bridge the gap between education and enthusiasm. The primary purpose of any educational institution should be to instill a sense of 
                        eagerness to learn more. Through its vast assortment of interactive games for Punjabi-language Practice, GNKS Games serves to reinforce linguistic-learning 
                        in an engaging manner —— fulfilling this very purpose! Ultimately: How can one be eager to learn, if they don't enjoy doing so?
                    </p>

                    <div className = "line-background">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
            
                </div>

            </div> 

            <PunjabiBubblesBackground/>

        </div>    
    )
}

export default About; 