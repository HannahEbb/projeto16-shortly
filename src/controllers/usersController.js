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

        console.log(user);
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
    
}






//autenticacao com dados criptografados via JWT NO CONTROLLER: 
// https://bootcampra.notion.site/Artigo-Autentica-o-com-JWT-2e54d82b5a414bfe83ee8fb9294ff304 