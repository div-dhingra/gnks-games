import expressClass, {Router, Request, Response} from 'express';
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

    const requestData = {

        method: "POST",

        headers: {
            
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${process.env.OPENAI_API_KEY}`,

        },

        body : JSON.stringify({

            prompt: DALLE_Prompt,
            size: imageSize

        })

    }


    try {

        const response = await fetch(url, requestData);

        if (!response.ok) {

              throw new Error(`HTTP-status Error: ${response.status}`);
        }

        const data = await response.json();
        const imageURL : string = data.data[0].url;

        console.log(imageURL);

        res.send(imageURL);

    }  catch(error) {
        console.error(error);
    }

})


export default router_DALLE;