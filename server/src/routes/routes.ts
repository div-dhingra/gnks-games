import expressClass, {Router} from 'express'

const mainRouter : Router = expressClass.Router();

import translateRouter from './translate-text/translate';
import gptRouter from './gpt-prompt/GPT';
import dalleRouter from './dalle-image/dall-e';

mainRouter.use("/translate-text", translateRouter);
mainRouter.use("/gpt-prompt", gptRouter);
mainRouter.use("/dalle-image", dalleRouter);

export default mainRouter; 