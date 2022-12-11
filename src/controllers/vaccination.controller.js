import { getConnection } from "./../database/database";

/**
 *  POST /vaccination -> Crear instancia de “vaccination” entregando los campos de
“name”, “drug_id”, “dose”, “date”. Se debe validar que la dosis este dentro de lo
permitido y que la fecha de vacunación sea posterior a la fecha de uso permitida.
*/
const addVaccinations = async (req, res) => {
    try {
        const { name, drug_id, dose, date} = req.body;
        if ( name === undefined || drug_id === undefined || dose === undefined || date === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }
        const vaccination = { name, drug_id, dose, date };
        const connection = await getConnection();
        await connection.query("INSERT INTO vaccination SET ?", vaccination);
        res.json({ message: "Vaccination added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

export const methods = {
    addVaccinations 
};