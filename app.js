const express = require("express");
const jwt = require("jsonwebtoken");
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
    
const app = express();

/*POST /login -> Capturar el “email” y “password” para iniciar sesion. En caso de que
las credenciales sean correctas devolver un JWT con vencimiento definido en variable
de entorno.*/
app.post("/api/login", (req, res) => {
    const user = {
        id: 1,
        name: "testName",
        email: "test@email.com",
        password: "passTest"
    }

    console.log(process.env.TIME_OUT);
    jwt.sign({user: user}, 'key', {expiresIn: process.env.TIME_OUT}, (err, token) => {
        res.json({
            token: token
        });
    });
});

/*POST /signup -> Crear instancia de “user” entregando los campos de “name”,
“email’ y “password”.
app.post("/api/signup", (req, res) => {
    const user = {
        id: 1,
        name: "testName",
        email: "test@email.com",
        password: "passTest"
    }
    jwt.sign({user: user}, 'key', (err, token) => {
        res.json({
            token: token
        })
    });
});*/

app.post("/api/vaccinationAndDrugs", checkToken, (req, res) => {

    jwt.verify(req.token, 'key', (error, authData) => {
        if (error) {
            //acceso prohibido
            res.sendStatus(403);
        } else {
            res.json({
                mensaje: "Acceso",
                authData
            });
        }

    });

});

function checkToken(req, res, next){
    const bearer = req.headers['authorization'];

    if (typeof bearer !== 'undefined') {
        const token = bearer.split(" ")[1];
        req.token = token;
        next();      
    }else{
        //acceso prohibido
        res.sendStatus(403);
    }
}

app.listen(3000, function(){
    console.log("running")    
});


