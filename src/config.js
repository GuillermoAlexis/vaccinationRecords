import { config } from "dotenv";

config();

export default {
    host: process.env.HOST || "",
    database: process.env.DATABASE || "",
    user: process.env.USER || "",
    password: process.env.PASSWORD || "",
    port: process.env.PORT || "",
    time_out: process.env.TIME_OUT || ""
};