import expressClass, {Router} from 'express'

const mainRouter : Router = expressClass.Router();

// import translateRouter from './translate-text/translate';
// import gptRouter from './gpt-prompt/GPT';
// import dalleRouter from './dalle-image/dall-e';
import imageHintRouter from './punjabi-word-image-hint/punjabiWordImageHint'

// mainRouter.use("/translate-text", translateRouter);
// mainRouter.use("/gpt-prompt", gptRouter);
// mainRouter.use("/dalle-image", dalleRouter);

mainRouter.use("/punjabi-word-image-hint", imageHintRouter);

export default mainRouter; 