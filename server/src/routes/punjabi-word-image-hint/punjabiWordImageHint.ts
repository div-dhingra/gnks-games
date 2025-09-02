import express, {Router, Request, Response} from 'express';
import { createClient } from '@supabase/supabase-js'
import { connect } from 'http2';

const supabase = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_API_KEY
)

// * RPC (remote-called-procedure) SQL-editor query in Supabase: 
// create or replace function api_get_random_punjabi_hangman_option(level text)
// returns table(punjabi_word text, punjabi_image_hint_url text)
// language sql stable as $$
//   select pw.punjabi_word, pw.punjabi_image_hint_url
//   from level_words lw
//   join punjabi_words pw on pw.id = lw.punjabi_word_id
//   join levels l on l.id = lw.level_id
//   where l.level = level
//     and pw.punjabi_image_hint_url <> ''
//   order by random()
//   limit 1;
// $$;
// -- Sample run/call:
// SELECT * 
// FROM api_get_random_punjabi_hangman_option('kinder');

const imageHintRouter: Router = express.Router();
imageHintRouter.get('/', async (req : Request, res : Response) => {
    const level: string = req.query.level.toString() ?? 'kinder'; 
    try {
        const { data, error } = await supabase.rpc(
            'api_get_random_punjabi_hangman_option', 
            { level: level }
        );

        if (error || !data?.length) {
            throw new Error('Internal database querying error')
        }

        const { punjabi_word, punjabi_image_hint_url } = data[0];
        // Public AWS S3 public/remote image-url-hosting/storing bucket:
        // const { data: u } = supabase.storage.from('images').getPublicUrl(image_path);
        console.log(punjabi_word, punjabi_image_hint_url);

        return res.json({ punjabi_word, punjabi_image_hint_url });
    } catch (error) {
	    console.error(error); 
        return error;
    }
})

export default imageHintRouter