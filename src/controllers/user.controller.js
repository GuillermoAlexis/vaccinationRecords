import jwt from 'jsonwebtoken';
import { getConnection } from "./../database/database.js";
import config from "./../config.js";
/**
 * POST /signup -> Crear instancia de “user” entregando los campos de “name”,
“email’ y “password”.
*/
const addUser = async (req, res) => {
    try {
        const { name, email, password} = req.body;
        if ( email === undefined || password === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }
        const user = { name, email, password };
        const connection = await getConnection();
        await connection.query("INSERT INTO user SET ?", user);
        res.json({ message: "User added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

/**
 * POST /login -> Capturar el “email” y “password” para iniciar sesion. En caso de que
las credenciales sean correctas devolver un JWT con vencimiento definido en variable
de entorno.
*/
const newSession = async (req, res) => {
    try {   
        const { email, password } = req.body;

        if ( email === undefined || password === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }
        const connection = await getConnection();
        const user_session = await connection.query("SELECT * FROM user WHERE email = ? AND password=?", [email, password]);
        if (user_session[0]){ 
            jwt.sign({user: user_session}, 'key', {expiresIn: config.time_out}, (err, token) => {
                res.json({
                    token: token
                });
            });
        }else{
            res.json({ message: "User not found" });
        }
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

export const methods = {
    addUser,
    newSession
};