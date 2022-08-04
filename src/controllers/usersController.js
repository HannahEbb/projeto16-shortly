import dotenv from "dotenv";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { hashSync } from "bcrypt";

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

        await connection.query('INSERT INTO users (name, email, password, createdAt) VALUES ($1, $2, $3, $4))', [
            newUser.name, newUser.email, hashPassword, dayjs().format('DD/MM/YYYY')  
        ]);

        res.sendStatus(201);

    } catch(error) {
        console.log(error);res.sendStatus(500); //conferir na doc
    }
}


export async function signIn(req, res) {
    try {
        const postedData = req.body;
        
        const user = await connection.query('SELECT * FROM users WHERE email = $1', [
            postedData.email
        ]);

        const passwordCrypt = bcrypt.compareSync(postedData.password, user.password);

        if(user && passwordCrypt) {
            const userSessionData = {
                name: user.name,
                userId: user.id
            }

            const chaveSecreta = process.env.JWT_SECRET;
            const token = jwt.sign(userSessionData, chaveSecreta); 

            await connection.query('INSERT INTO sessions (userId, token, createdAt) VALUES ($1, $2, $3)', [
            user.id, token, dayjs().format('DD/MM/YYYY') 
           ]); 

           return res.status(201).send({ token }); // só retorna isso? 

        } else {
            return res.status(401).send('Senha ou e-mail incorretos!'); 
        }

    } catch(error) {
        console.log(error);
        res.sendStatus(500); //conferir na doc
    }
}






//autenticacao com dados criptografados via JWT NO CONTROLLER: 
// https://bootcampra.notion.site/Artigo-Autentica-o-com-JWT-2e54d82b5a414bfe83ee8fb9294ff304 