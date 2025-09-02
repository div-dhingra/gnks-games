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

// * AFTER MOBILE RN MIGRATION (priority: then add prism ORM for performant, scalable, secure architecture/system design !!
// TODO: What I’d pick for GNKS Hangman:
// TODO: Start with Option 1 (Supabase JS + RPC) for the random round and image URLs. It’s clean, secure (RLS-friendly), and minimal.
// TODO: If you later add lots of endpoints and want TS types on queries, adopt Drizzle or Kysely. Prisma is fine too, but it’s heavier than you need right now.
// TODO: Also: keep Supabase CLI/SQL as your migration source of truth. If you add an ORM (Prisma with Types) later, introspect (pull) the schema instead of letting two systems fight over migrations.