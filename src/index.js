import app from "./app.js";
/**
 * start main function
 */
const main = () => {
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
};

main();
