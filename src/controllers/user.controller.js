import { getConnection } from "./../database/database";

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
/*
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

};*/

export const methods = {
    addUser
    /*login*/
};