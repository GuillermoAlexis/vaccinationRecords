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
app.use("/api", userRoutes);
app.use("/api/drug", drugRoutes);
app.use("/api/vaccination", vaccinationRoutes);

export default app;
