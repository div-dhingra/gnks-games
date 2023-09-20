import expressClass, {Request, Response} from "express";

import corsClass from "cors";
import dotenvClass from 'dotenv';

dotenvClass.config();

import mainRouter from './routes/routes';

const app = expressClass(); 

app.use(expressClass.json());
app.use(expressClass.urlencoded({ extended: false }));
app.use(corsClass()); 

app.use("/api", mainRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT ${PORT}`);
})


//  ? STILL DOESN"T WORK for post requests, even when I remove express.routing (absolute endpoint-path in server.ts)
// Nevermind --> Post request works. It's a problem with communication w/ 3rd party APIs (openai, google translate, etc.)???
// Also, my express-router endpoint is working (that is where the post-requests are being sent to wiht the )
// ! app.post('/api/translate-text', async (req : Request, res : Response) => {

    // const url : string = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
    // const textToTranslate : string = req.body.punjabiTextToTranslate;
   
    // const options = {

    //     method: 'POST',
    //     headers: {

    //         'content-type': 'application/x-www-form-urlencoded',

    //         'Accept-Encoding': 'application/gzip',

    //         'X-RapidAPI-Key': process.env.RAPID_API_KEY,

    //         'X-RapidAPI-Host': process.env.RAPID_API_HOST
    //     },





    //     body: new URLSearchParams({
    //         q: textToTranslate, 
    //         target: 'en',
    //         source: 'pa'
    //     })

    // };

    // try {

    //     const response = await fetch(url, options);

    //     if (!response.ok) {
    //         throw new Error(`HTTP-status Error: ${response.status}`);
    //     } 

    //     const result = await response.json();
    //     const translatedText = await result.data.translations[0].translatedText;

    //     console.log(translatedText);

    //     res.send(translatedText); 
                
    // } catch (error) {
	//     console.error(error);
    // }

    // ! res.send({"Test" : "Post goes through"});
   
// ! })