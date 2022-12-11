import { getConnection } from "./../database/database";

/**
 *  POST /drugs -> Crear instancia de “drug” entregando los campos de “name”,
“approved”, “min_dose”, “max_dose”, “available_at”.
*/
const addDrug = async (req, res) => {
    try {
        const { name, approved, min_dose, max_dose, available_at } = req.body;
        if ( name === undefined || approved === undefined || min_dose === undefined || max_dose === undefined || available_at === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }
        const drug = { name, approved, min_dose, max_dose, available_at };
        const connection = await getConnection();
        await connection.query("INSERT INTO drug SET ?", drug);
        res.json({ message: "Drug added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

/**
 *  const getDrugs = async (req, res) => {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM drug");
    console.log(result);
    res.json(result)

};
 */

export const methods = {
    addDrug
};