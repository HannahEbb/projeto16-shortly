import dotenv from "dotenv";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { hashSync, compareSync } from "bcrypt";

import connection from '../db/pgsql.js';

dotenv.config();

export async function signUp(req, res) {
    try {
        const newUser = req.body;
        const hashPassword = hashSync(newUser.password, 13);
        
        const { rowCount } = await connection.query('SELECT * FROM users WHERE email = $1', [
            newUser.email
        ]);

        if(rowCount > 0) {
            return res.sendStatus(409);
        }

        await connection.query('INSERT INTO users (name, email, password, "createdAt") VALUES ($1, $2, $3, $4)', [
            newUser.name, newUser.email, hashPassword, dayjs().format('DD/MM/YYYY')  
        ]);

        res.sendStatus(201);

    } catch(error) {
        console.log(error);
        res.sendStatus(500); //conferir na doc
    }
}

export async function signIn(req, res) {
    try {
        const postedData = req.body;
        
        const { rows: user } = await connection.query('SELECT * FROM users WHERE email = $1', [
            postedData.email
        ]);

        const passwordCrypt = compareSync(postedData.password, user[0].password);

        if(user && passwordCrypt) {
            const userSessionData = {
                userId: user[0].id,
                name: user[0].name
            }

            const chaveSecreta = process.env.JWT_SECRET;
            const token = jwt.sign(userSessionData, chaveSecreta); 

            await connection.query('INSERT INTO sessions ("userId", token, "createdAt") VALUES ($1, $2, $3)', [
            user[0].id, token, dayjs().format('DD/MM/YYYY') 
           ]); 

           return res.status(201).send(token); 

        } else {
            return res.status(401).send('Senha ou e-mail incorretos!'); 
        }

    } catch(error) {
        console.log(error);
        res.sendStatus(500); 
    }
}

export async function getUserMe(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.JWT_SECRET);

        if(!data) {
            return res.sendStatus(401); //token inexistente 
        }

        const { rows: user, rowCount } = await connection.query('SELECT * FROM users WHERE id = $1', [
            data.userId
        ]);

        if(rowCount > 0) {
            const { rows: urlData } = await connection.query('SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId" = $1', 
            [user[0].id]
            );

            const { rows: totalVisits } = await connection.query('SELECT SUM("visitCount") as "visitCount" FROM urls WHERE "userId" = $1',
            [user[0].id]);

            const result = {
                "id": user[0].id,
                "name": user[0].name,
                "visitCount": totalVisits[0].visitCount, 
                "shortenedUrls": urlData
            }

            res.send(result).status(200);
        
        } else {
            res.sendStatus(404);
        }

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getRanking(req, res) {
    try {
        const { rows: urlData, rowCount } = await connection.query(`SELECT users.id as "id", users.name as "name", COUNT(urls.url) as "linksCount", SUM(urls."visitCount") as "visitCount" 
        FROM urls 
        JOIN users 
        ON urls."userId" = users.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10`);

        if(rowCount === 0) {
            res.sendStatus(404);
        }

        res.send(urlData);
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}



