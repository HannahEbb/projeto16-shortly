import dotenv from "dotenv";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { customAlphabet } from "nanoid";

import connection from '../db/pgsql.js';

const nanoid = customAlphabet("abcdefghijklmnopqrstuv0987654321", 6);


export async function createUrl(req, res) {
    try {
        const body = req.body;
        const url = body.url;
        const token = req.headers.authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.JWT_SECRET);

        if(!data) {
            return res.sendStatus(401); //token inexistente 
        }

        const { rowCount } = await connection.query('SELECT * FROM users WHERE id = $1', [
            data.userId
        ]);

        if(rowCount > 0) {
            //pode criar seu shorts
            const short = nanoid();
            //insere dados no banco, na tabela urls
            await connection.query('INSERT INTO urls ("userId", "shortUrl", url, "visitCount", "createdAt") VALUES ($1, $2, $3, $4, $5)', 
            [data.userId, short, url, 0, dayjs().format('DD/MM/YYYY')]);

            res.send({ shortUrl: short }).status(201);

        } else {
            return res.sendStatus(401); // token inválido - não pertence a usuario cadastrado
        }


    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}