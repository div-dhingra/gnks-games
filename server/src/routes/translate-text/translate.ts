import expressClass, {Router, Request, Response} from 'express';
import axiosClass from 'axios';

// need to manually import same classes/functions (express, axios, etc.) for each routed file ('mini sub-app') in backend, 
// EVEN THOUGH they are imported in the same 'server.ts'-express-app file!

const router_Translate : Router = expressClass.Router();

router_Translate.post('/', async (req : Request, res : Response) => {

    // const url : string = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
    // * ^^ from fetch. | can't pass 'url' as a second argument for axios, only fetch (url must be a 'key' in 
    // * the options-object...)!

    const textToTranslate : string = req.body.punjabiTextToTranslate;
   
    const options = {

        method: 'POST',

        url : 'https://google-translate1.p.rapidapi.com/language/translate/v2',

        headers: {

            'content-type': 'application/x-www-form-urlencoded',

            'Accept-Encoding': 'application/gzip',

            'X-RapidAPI-Key': process.env.RAPID_API_KEY, 

            'X-RapidAPI-Host': process.env.RAPID_API_HOST
        },

        data: new URLSearchParams({
            q: textToTranslate, 
            target: 'en',
            source: 'pa'
        })

        // replace body w/ data for axios
        // install axios library first --> 
        // then do -> git add package.json (for axios dependencies) | git add translate.ts
        // fetch == axios.request(options) -> options has a 'url'-header (paramater), so that is where the url goes, 
        // instead of as a 2nd-argument in 'fetch(options, url)'...

    };

    try {

        // If this API doesn't work, then 'undefined' will just be stored in the 'translatedText' variable b/c nothing 
        // will be returned (unfulfilled promise). I could 'return error', but GPT might treat that as a string-prompt
        // An error object may be parsed as a string via '.text()' in GPT-function. [can it be parsed as a string]???

        // * const response = await fetch(url, options);
        const response = await axiosClass.request(options);

        // * if (!response.ok) {
        //  *   throw new Error(`HTTP-status Error: ${response.status}`);
        // * } 
        // Not needed with axios (axios auto-throws HTTP-status errors, unlike fetch!)

        // * const result = await response.json();
        // * const translatedText = await result.data.translations[0].translatedText;
        const result = await response.data;
        const translatedText : string = await result.data.translations[0].translatedText;

        console.log(translatedText);

        // environment variables are strings by convention -> by default
        res.header("Access-Control-Allow-Origin", process.env.APP_FRONTEND_URL);
        res.send(translatedText); 
                
    } catch (error) {

	    console.error(error); 
        // console.log("TRY-Block STOPPED");
        // * Works when backend error is thrown (shows "TRY-Block STOPPED" in VS-Code backend-terminal / Render.com 'Logs'
        // * i.e.: server-"console-log"), but error is NOT thrown for the frontend? (try-catch block doesn't stop execution  
        // * in frontend)...

        // res.send(error);  --> sends back an {} -> [empty json-object], which is still interpeted as a viable prompt for GPT. 
        // Do 'return error' (Error is displayed in console, I think).  BUT, gpt-api still fails, since 'translatedText' 
        // will still old 'undefined', instead of {}
        return error; 
        // return error; behaves the same as not doing any 'return' at all...

        // res.send(error) !≠ return error; (use return error, since res.send() still sends back an empty-json object={},
        // which is changed to "{}", so that IS NOT `UNDEFINED`, and gpt-api erroneously generates a prompt from it.)
        // TODO: MORAL OF THE STORY: For backend-related API-fetching errors [API call from frontend (client) to backend (server)
        // TODO: failed (Promise was unfulfilled, returning 'undefined'), CHECK THE 'LOGS' ON 'RENDER.COM' 
        // TODO: (where my backend was deployed) to view error-messages that would be shown on my backend-terminal in VSCODE, 
        // TODO: i.e.: ('backend console-log') ]...
        // returned automatically? -> res.send is never reached if the try-block fails for some reason...
    }

    // res.send({"Test" : "Post goes through"});
    // !^^ For testing -> post request works | problem with my API keys? (3rd party API).
    // ! If this issue persists, try deploying my backend on 'cyclic.sh' or railway, instead, and 
    // ! see what happens.
    // ! ALSO: Deploy frontend and see if that makes a difference (why would it? the post request still 
    // ! goes through? (frontend to backend communication works)?? )
    // ^^ Environment variable / API-key issue?
   
})

// router_Translate.get('/', (req : Request, res : Response) => {

//     res.send( {"Hey" : "man"} );
// })

export default router_Translate; 