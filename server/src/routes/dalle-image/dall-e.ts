import expressClass, {Router, Request, Response} from 'express';
import axiosClass from 'axios';

import {Configuration, OpenAIApi} from 'openai';

const dalleAPI_Configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai : OpenAIApi = new OpenAIApi(dalleAPI_Configuration);
const router_DALLE : Router = expressClass.Router();

router_DALLE.post('/', async (req: Request, res: Response) => {

    const DALLE_Prompt : string  = req.body.DALLE_Prompt;
    const imageSize : string = "256x256";

    const url = 'https://api.openai.com/v1/images/generations';
    // * Could declare as 2nd-argument for 'fetch'. 
    // * For 'axios, I must include the url as a key in this `options`/`requestData`-object!

    const requestData = {

        method: "POST",

        url : 'https://api.openai.com/v1/images/generations',

        headers: {

            // * Always have Content-type, authorization (API Key -> if needed), AT MINIMUM!
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${process.env.OPENAI_API_KEY}`,

        },

        // axios uses the 'data' object, instead of body -> req.data (same as req.body for 'fetch')...
        // Store request-json-object for the actual OPENAI-API endpoint.
        data : JSON.stringify({

            prompt: DALLE_Prompt,
            size: imageSize

        })

    }


    try {

        // * const response = await fetch(url, requestData);
        const response = await axiosClass(requestData);

        // if (!response.ok) {

        //       throw new Error(`HTTP-status Error: ${response.status}`);
        // }
        // * Not needed with axios (only fetch doesn't throw HTTP-status errors -> axios does, by default...)

        // * const data = await response.json();
        const data = await response.data; 
        // axios uses .data for .json() [fetch]
        const imageURL : string = data.data[0].url;

        console.log(imageURL);

        res.header("Access-Control-Allow-Origin", "http://localhost:5173");
        // http://localhost:5173/ | http://localhost:5173/PunjabiHangman

        res.send(imageURL);

    }  catch(error) {

        console.error(error); 
        // This is what is being outputted as that being 'error-object' --> The DALLE API, indeed, throws an error, and 
        // fails by-default, so nothing is returned as the promise remains unfulfilled [ and no extraneous API-request registers 
        // for OPENAI due to this specific undefined 'req.data' (req.body) error! (usage amounut stays the same on o
        // for my OpenAI Account) ] !!!

        return error; 
    }

})


export default router_DALLE;