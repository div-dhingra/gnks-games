import expressClass, {Router, Request, Response} from 'express';

const router_Translate : Router = expressClass.Router();

router_Translate.post('/', async (req : Request, res : Response) => {

    const url : string = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
    const textToTranslate : string = req.body.punjabiTextToTranslate;
   
    const options = {

        method: 'POST',
        headers: {

            'content-type': 'application/x-www-form-urlencoded',

            'Accept-Encoding': 'application/gzip',

            'X-RapidAPI-Key': process.env.RAPID_API_KEY,

            'X-RapidAPI-Host': process.env.RAPID_API_HOST
        },





        body: new URLSearchParams({
            q: textToTranslate, 
            target: 'en',
            source: 'pa'
        })

    };

    try {

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP-status Error: ${response.status}`);
        } 

        const result = await response.json();
        const translatedText = await result.data.translations[0].translatedText;

        console.log(translatedText);

        res.send(translatedText); 
                
    } catch (error) {
	    console.error(error);
    }
   
})

export default router_Translate; 