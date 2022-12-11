import express from "express";
import morgan from "morgan";

// Routes
import userRoutes from "./routes/user.routes";
import drugRoutes from "./routes/drug.routes";
import vaccinationRoutes from "./routes/vaccination.routes";

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/", userRoutes);
app.use("/drug", checkToken, drugRoutes);
app.use("/vaccination", checkToken, vaccinationRoutes);

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

export default app;
