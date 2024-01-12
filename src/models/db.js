import { createConnection } from "mongoose";

export const db = createConnection(`${process.env.DB_HOST}/${process.env.DB_DATABASE}`);
