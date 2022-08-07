import dotenv from "dotenv";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { customAlphabet } from "nanoid";

import connection from '../db/pgsql.js';

const nanoid = customAlphabet("abcdefghijklmnopqrstuv0987654321", 7);


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
            const short = nanoid();
            
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

export async function getUrlById(req, res) {
    const { id } = req.params;

    try {
        const { rows: url, rowCount } = await connection.query(
            'SELECT id, "shortUrl", url FROM urls WHERE id = $1', [id]
        );

    if(rowCount === 0) {
        return res.sendStatus(404); 
    }

    res.send(url[0]).status(200);
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getShortUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const { rows: url, rowCount } = await connection.query(
            'SELECT * FROM urls WHERE "shortUrl" = $1', [shortUrl]
        );

    if(rowCount === 0) {
        return res.sendStatus(404); 
    }

    await connection.query(
        `UPDATE urls
        SET 
        "visitCount" = $1
        WHERE id = $2`,
        [url[0].visitCount +1, url[0].id]
    );

    res.redirect(200, url[0].url);
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function deleteUrlById(req, res) {
    const { id } = req.params;

    try {
        const token = req.headers.authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.JWT_SECRET);

        if(!data) {
            return res.sendStatus(401); //token inexistente 
        }

        const { rowCount } = await connection.query('SELECT * FROM urls WHERE id = $1 AND "userId" = $2', [
            id, data.userId
        ]);

        if(rowCount > 0) {
            await connection.query('DELETE FROM urls WHERE id = $1', [id]);
            res.sendStatus(204);

        } else {
            return res.status(401); // shortUrl nao pertecnce a este user ou shortUrl nao existe
        }


    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        
    }
}