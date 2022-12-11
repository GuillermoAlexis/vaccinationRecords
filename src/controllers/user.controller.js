const jwt = require("jsonwebtoken");
import { getConnection } from "./../database/database";
import config from "./../config";
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
        /*const { email, password } = req.body;

        if ( email === undefined || password === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }
/*
        const sesion_validations = await connection.query("SELECT * FROM user WHERE email = ?", email);

        const drug = { name, approved, min_dose, max_dose, available_at };
        const connection = await getConnection();
        const result = await connection.query("UPDATE drug SET ? WHERE id_drug = ?", [drug, id]);
        res.json(result);    

*/
            const user = {
                id: 1,
                name: "testName",
                email: "test@email.com",
                password: "passTest"
            }
        
            console.log(config.time_out);
            jwt.sign({user: user}, 'key', {expiresIn: config.time_out}, (err, token) => {
                res.json({
                    token: token
                });
            });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

export const methods = {
    addUser,
    newSession
};