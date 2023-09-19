import expressClass, {Router, Request, Response} from 'express';
import {Configuration, OpenAIApi} from "openai";

const gptAPI_Configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY 
});


const openai : OpenAIApi = new OpenAIApi(gptAPI_Configuration);
const router_GPT : Router = expressClass.Router();

const chooseGPT_InputMessage = (topicWord : string) : string => {

    let abstractDays : string[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    
    let abstractNumbers : string[] = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", 
    "ten", "hundred", "thousand", "million"];

    let literalPrompt : string = 
    `Please DO NOT REPEAT any contents of my request in your response. Only mention the detailed text-prompt for the
     following in your response. Limit the length of your response to 300 characters.

     Describe A LITERAL, NON-SYMBOLIC, DETAILED text-prompt, that I can use on a separate AI-Image generator to 
     generate a LITERAL IMAGE (no metaphors) for the following word: "${topicWord}".`;

    let daysPrompt : string = 
    `Please DO NOT REPEAT any contents of my request in your response. Only mention the detailed text-prompt for the 
     following in your response. Limit the length of your response to  300 characters.

     Describe A LITERAL, NON-SYMBOLIC, DETAILED text-prompt that I can use on a separate AI-Image generator to 
     generate a LITERAL IMAGE (no metaphors) that SPELLS the following calendar-day: "${topicWord}".`;

    let numberPrompt : string = 
    `Please DO NOT REPEAT any contents of my request in your response. Only mention the detailed text-prompt for the 
     following in your response. Limit the length of your response to  300 characters.

     Describe A LITERAL, NON-SYMBOLIC, DETAILED text-prompt that I can use on a separate AI-Image generator to 
     generate a LITERAL IMAGE (no metaphors) that clearly shows the following numerical digit: "${topicWord}".`;
   
    if ( abstractNumbers.some((number) => topicWord.includes(number)) ) {
        
        return numberPrompt; 
    } 

    else {

        if ( abstractDays.includes(topicWord) ) {
            
            return daysPrompt; 
        }

        else {

            return literalPrompt;
        }

    }   
     
}

router_GPT.post('/', async (req: Request, res: Response) => {

    const topicWord : string = req.body.translatedText; 

    try {

        const data = await openai.createChatCompletion({

            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: chooseGPT_InputMessage(topicWord) }],

        });
        // No need for 'response.ok'-check. Axios (what OPENAI's API-function is using)
        // handles HTTP-request errors automatically, unlike 'fetch'.
               
        const DALLE_Prompt : string = data.data.choices[0].message.content;

        console.log(DALLE_Prompt);

        res.send(DALLE_Prompt); 

    }  catch (error) {
        console.error(error);
    }
})

export default router_GPT; 