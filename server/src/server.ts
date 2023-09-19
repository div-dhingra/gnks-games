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