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

        // console.log("Filtering");

        try {

            const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/translate-text`, requestData);

            if (!response.ok) {

                throw new Error(`${response.status}`)
            }

            const result = await response.text();

            // console.log("doing");
            
            return result;

        } catch (error) {

            console.error(error);
        }

        // * Testing on: translateHangmanWord
        // ! ISSUE: Post request from deployed backend server doesn't work (I have test POST-request set-up in 
        // ! server > translate.ts to '/api/translate-text'. BUT, 'GET'-request to it works?
        // ! Post request only works when I use the 'http://localhost:3001' as the VITE_APP_SERVER_URL, 
        // ! not my deployed backend as the VITE_APP_SERVER_URL (https://gnks-games-backend.onrender.com) !!!!
        // WHY? --> 
        // TODO: Deploy frontend to render/vercel. Then, test my code again -> this time by 
        // * running the frontend on a deployed version.
        // WHY ISN'T POST REQUEST WORKING WITH RENDER.COM? (but get request is)...
        // The post-request isn't even registering, as per my test, and also that 
        // my OpenAI-API usage didn't change (hasn't registered anything at 5:37 or near -> last 
        // API-call was at 4:55/57, which was when I switched back to 'localhost' for initial testing.)
        // Maybe check if backend-server-status on render.com is 'deployed' or 'fail'...
        // Check Raddy's video --> he deploys mern-stack with vite on render... [8:12]...

        // UPDATE --> Nevermind. No problem with POST REQUEST --> Backend works fine! (Manual redeploy for failed redeployments
        // on commit on render). It didn't register my new post-request code in my backend 'res.send({"Test" : "post goes through"})'
        // because, although it commited to github, the automatic redeployment (CD) on render.com for my backend failed. 
        // Real Issue: It might be a problem with my API-Keys not registering? Or communication with the 3rd-party API 
        // (OpenAI, etc.) is not allowed? Or rapidapi (Google translate) communication is not allowed?

        // ! I'm getting a cor's error in my console with dalle? (How did I check -> I added 
        // ! a 'console.log(result)' after the 'await' in my dall-e function)!

        // ! All of the apis (google translate, dalle) that use 'fetch' in my BACKEND SERVER
        // ! to communicate with the 3rd-party API (gpt-api uses openai-chatcompletions-api-function, which works) are not working 
        // ! to retrieve data in my frontend? Dalle gets a cors-error, and translate isn't even loading (cors error, too?).
        // ! Try to fixing cors error issue on render.com...

        // ! INTERESTING --> I got a CORS error 1 time in my frontend console from DALL-E, but it doesn't show that error in the 
        // ! browser-console anymore, even though the test-code in my frontend 'createImageUrl()' was the same.
        // !^^ It may be the same with google translate API (CORS error, but client-browser-console is NOT logging the 
        // !! 'CORS-Error' message, even though its occurring)?
        // * Maybe try adding node.js, browser-console-log api to see on my backend-render.com website 
        // * if a cors-error with dalle, google translate is occuring in the backend-console?
        // * Pretty sure its a cors-error, from using fetch in the backend-server (can switch to OPENAI-API function for DALLE, 
        // * but google translate needs fetch.) --> I can try axios worst-case if needed?
        // ^^^ How to fix CORS-error on render.com fullstack?

        // render.com is also showing an error with using 'fetch' on the backend 
        // * "ReferenceError: fetch is not defined Sep 19 02:19:17 PM     
        // * at /opt/render/project/src/server/dist/routes/dalle-image/dall-e.js:29:26"
        // ^^switch to axios, then test. 
        // TODO: NOTE --> this 'error message' with my backend-api was from the 
        // TODO: render.com LOGS! That is, whatever console.logs my backend has to check errors, 
        // TODO --> POP UP ON RENDER.COM'S CONSOLE (in development, with localhost:3001-backend, the errors popped up
        // TODO --> on my vscode-integrated terminal (node.js is not a client-side language, so it can't use webbrowser-api 
        // TODO --> for client console --> LOOK AT RENDER.COM LOGS (after deployment) TO SEE MY BACKEND 'CONSOLE.log'!!!!))
        // ? SOLUTION: As per render.com's 'Logs' section (backend console.log), 
        // ? my try-catch block for the DALLE, Google Translate API's in the backend (catch -> console.error(error))
        // ? is throwing an error for using 'fetch'! -> 'fetch is not defined' for nodejs, for some reason?
        // ? Try to download new-node version that is compatible with fetch, check render.com's documentation for fetch, 
        // ? go on youtube, etc. --> may not be a cors-issue, but, rather, a fetch-in-backend-with-nodejs issue...

        // * I also just got this error in my client-console when trying to fetch to google-translate
        // * PunjabiHangman:1 Access to fetch at 'https://gnks-games-backend.onrender.com/api/translate-text' from origin 
        // * 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
        // * on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to 
        // * fetch the resource with CORS disabled.
        
       // TODO: TL;DR: For backend-server related errors, look at the 'Logs'-section on render.com for my deployed
       // TODO --> application to see the backend-console output (vscode-integrated-terminal ouptut during development)
        // TODO --> when my backend is receiving fetch-requests from the front-end, and sending fetch-requests (in NODEJS)
        // TODO -> of its own the 3rd-API endpoints. 

        // * ReferenceError: fetch is not defined Sep 19 02:52:21 PM      
        // * at /opt/render/project/src/server/dist/routes/translate-text/translate.js:26:26

        // ! SOLUTION TO ALL: 
        // ! 1) Replace fetch in backend (node.js) with 'axios' (install library and change backend-nodejs-fetch to 'axios').
        // ! For some reason, its still an 'experimental API' for Nodejs, so I can't use it in production [unstable since 
        // ! its still experimental], (but I can use it in development).  
        // https://community.render.com/t/deploying-node-js-application/7169/5
        // https://blog.logrocket.com/using-ultrafetch-boost-node-fetch-behavior/#understanding-known-drawback-fetch
        // FIRST, switch google translate API to axios in backend, and test. Then switch dalle to AXIOS 
        // (or openAI-api function for DALLE-image-generation [uses axios under the hood, I think, 
        // since the gpt-api chat-completion function does, as well]'
        // * DIVPREET
        
        // ! 2) Add 'res.header("Access-Control-Allow-Origin", "http://localhost:5173");' to my translate.ts file 
        // ! (right before res.send) to allow it to communicate API-data with my frontend-application (if I send 'a json-array 
        // ! with random-data manually from my frontend to backend (res.send({"Test" : "post"}), then it works fine. 
        // ! BUT, when fetching data from 3rd-party API-endpoints (openai, google-translate), the backend fails b/c, 
        // ! (1) In production, 'fetch' for Nodejs is not yet defined. And (2) CORS will block unfamiliar 'origins' (ports)
        // ! from communicating. I have to explicitly add the CORS-headerfor it to work, via 'res.header', and specify the 
        // ! the frontend-url with which this API-data will be communicated (CROSS-ORIGIN resource sharing)!!!

        

        // const options = {

        //     method: "POST",
        //     headers : {
        //         "Content-Type" : "application/json"
        //     } 
        // }    

        // try {
            
        //     const obj = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/translate-text`, options);
        //     const result = await obj.json();

        //     console.log(result);
        //     console.log("Hey");


        // } catch(error) {
        //     console.error(error);
        // }

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

            // console.log(data);

            return data; 

        } catch (error) {

            console.error(error);
        }
    }

    const generateDALLE_Image = async (DALLE_Prompt? : string) => {


        // console.log("Interpreted");

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

            // console.log("Image generated");

            return data;
        
        } catch(error) {
            
            console.error(error);
        }

    } 

    const createImageURL = async () => {

        try {

            const translatedText : string | undefined = await translateHangmanWord();
             // 1) Error occurs -> promise is unfulfilled (API-fetching failed due to HTTP-status error, etc.) -->
             // 'undefined' is returned by my backend-server, TO my frontend--> variable is undefined.
             // 2) Promise is fulfilled -> json-object is parsed to a string in my backend, so string is returned by my 
             // backend-server, TO my frontend.

            //  console.log(translatedText);
            // console.log("Start");

            // const translatedText : string | undefined = undefined; 

            // TODO: DIVPREET
            // * After I'm done with axios/testing in DEVELOPMENT -> Push changes to github (push to prod) 
            // * for Hangman.tsx, server.ts, package.json (downloaded axios) and then test on render.com (manual redploy if needed (check if its live, then start my 
            // * client-application up)). THEN, deploy frontend to vercel/render...
            // * Also, change frontend-.env-var back to 'https://gnks-games-backend.onrender.com', instead of localhost:3001 
            // * (backend server to communicate with)

            // resolve fetch-undefined error.

            // console.log("Error Ignored" + translatedText);

            // undefined keyword != string  -> GPT API, DALLE API can't use undefined as a value from 'req.body'
            // passed into the backend (API call fails) -> will it still count as an API call made by me though?
            // const translatedText : string | undefined = undefined;
            // console.log("Error", translatedText); -> won't work (local-scoped variable is outputted BEFORE its declared).
            // REMEMBER: Each time this function is called, 'it restarts' from the top. After the function completes each of its 
            // executions, its local variables are returned 'destroyed' (returned to stack-memory).
            // As such, there is NO DATA PERSISTENCE b/w function calls, as their value resets with each call (they are 'redeclared' 
            // and redefined when the function runs again, so I don't have to worry about previous-round variable values 
            // being used when 1 of the variables returns an 'Unfulfilled Promise' (An error).)
            // Does OPENAI count 'passing undefined as an argument' (previous linked variable of translatedText failed to return a value)
            // , that is failed to fulfill a promise), as me doing a fetch-request (usage goes up - >charged?)
            // After Paath, (designated time) -> write down the specific, discrete time. 
            // THEN, strat my server (1) && client (2), which will pass 'undefined' as an argument to the GPT API. 
            // That won't work (error in SERVER CONSOLE [HTTP: Status]), since 'undefined' is really 'empty' (NO VALUE).
            // THEN, check OPENAI Usage AT THAT EXACT TIME STAMP to see if I got charged for an API-call-fetch request, 
            // even though it failed to go through (there was an error in backend-server console/Log), since the argument 
            // was undefined (translatedText was undefined)???
            // Server Error: "TypeError: Cannot read properties of undefined (reading 'includes')" [backend log/terminal-console]
            // * TIME TO CHECK: 7:18/7:19/7:20 [5 minute delay on openai usage, maybe] --> see if openai registered a usage
            // * If not, although my backend callback function from the post-request-re-routing listener was triggered, 
            // * the req.body: translatedText paramater of 'undefined' meant that the redirected fetch-request to the 
            // * ACTUAL OPEN-AI ENDPOINT (route) DID NOT GO THROUGH, so my usage DID NOT GO UP (we good!)!!!
            // NEVERMIND, didn't register 'undefined' as an API call, even with vanilla axios, as opposed to using 
            // openai's api-functions for dall-e -- > WE GOOD !

            // THEN, implement axios (I added CORS-Allow-Access-res.header) in both -fetch-requests- for translate, dalle.
            // THEN, test in local environment. (npm run dev on server/client local host). 
            // THEN, if it works, change environment VITE-variable to domain of backend-server-on-RENDER.COM 
            // (Cmd + shift + Z in .env-client), and test on ACTUAL BACKEND SERVER-DOMAIN. 
            // THEN, publish frontend (try render | if not, try vercel -> ed.roh for frontend w/ vite (CHECK LOG FOR ERRORS))!!

            // Since all of these variables are linked, if 1 of them fails, all fail. So, I don't have to 
            // worry about 'undefined' being passed as an argument to any of the hooks.
            // I can manually input 'undefined' as an argument (NOT A STRING, but the blue-keyword) 
            // for the GPT-Prompt, and watch that the API won't work (no extraneous API calls are made), 
            // since nothing is outputted on the console (console.log inside my enerateChatGPT_AIPrompt()-function 
            // to check that a fetch-request was fulfilled, and value was returned (if nothing was outputted, then no fetch-request made 
            // [or just fulfilled]))???

            const DALLE_Prompt : string | undefined = await generateChatGPT_AIPrompt(translatedText); 
            // const DALLE_Prompt = undefined; 

            // const DALLE_Prompt : string | undefined = await generateChatGPT_AIPrompt("dog"); 
            // const DALLE_Prompt : string | undefined = await generateChatGPT_AIPrompt(undefined);
            // 10:11 -> check openai usage... 

            // console.log("We move through try, even with error" + DALLE_Prompt);
            
            const DALLE_Image_URL : string | undefined = await generateDALLE_Image(DALLE_Prompt);
            // const DALLE_Image_URL : string = "";
            // ! Testing -> Delete after

            // Api-request registered to DALLE at 9:42, even w/ undefined? 
            // If so, try using the OpenAI API-functions instead, as that is what 
            // I use for GPT (instead of vanilla axios), and that prevents a fetch-request from being used 
            // when the req.data (req.body) value is undefined...
            // If there's no api-request that went through, leave as is. 
            // ELSE: Switch DALLE to openAI-api functions, then pass argument as undefined into it, 
            // to see if it ignore API-request with undefined argument.
            // * NEVERMIND -> it just outputs a long object in my backend-console.log, with the last object 
            // * being 'data: { error: [Object] }' --> error is returned in the '.data'-object, instead of an object with 
            // * the url [val.data[0] = undefined, NOT DALLE-CREATED IMAGE URL...
            // * TO TEST: I can also add a 'console.log("try block stopped");' in my backend-dall-e.ts 'catch'-block, 
            // * to figure out if a backend-api error was actually thrown when I sent an 'undefined' object 
            // * in req.body (req.data) as the parameter for the api (i.e. 'DALLE_Prompt" -> undefined)...
            // * NEVERMIND:catch-block isn't even accessed -> dall-e.ts just returns 


            // const DALLE_Image_URL : string | undefined = await generateDALLE_Image(translatedText);

            // console.log("Image: " + DALLE_Image_URL);

            setDalleImageURL(() => DALLE_Image_URL || ""); 

        } catch (error) {

            console.error(error); 
            // console.log("Try-block stopped exectuon (returned error from backend interpreted)!")
            // this catch block doesn't run --> none of the api's return ('throw') an error, only returning 
            // 'undefined' for an Unfulfilled promise (API failed). So I still won't get undefined behavior from 
            // api's (like {} being passed in as an argument with 'res.send(error)' in my backend) -> 
            //  just use 'return error;' in my backend (!≠ res.send(error);)...
        }    
    }

    // ! const test = async () => {

    //     const options = {

    //         method: "GET",
    //         headers : {
    //             "Content-Type" : "application/json"
    //         }
    //     }    

    //     try {
            
    //         const obj = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/translate-text`, options);
    //         const result = await obj.json();

    //         console.log(result);

    //     } catch(error) {
    //         console.error(error);
    //     }
    // }
    // ! ^^ Works with render.com backend, but post-request doesn't?
    // ! WHY! -> Is it because API takes too long?


    useEffect(() => {

        setDalleImageURL(() => "");
        
        createImageURL();
        // test();

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