import { getConnection } from "./../database/database";
const moment = require('moment');

/**
 *  POST /vaccination -> Crear instancia de “vaccination” entregando los campos de
“name”, “drug_id”, “dose”, “date”. Se debe validar que la dosis este dentro de lo
permitido y que la fecha de vacunación sea posterior a la fecha de uso permitida.
*/
const addVaccination = async (req, res) => {
    try {
        const { name, drug_id, dose, date} = req.body;
        if ( name === undefined || drug_id === undefined || dose === undefined || date === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }
        const vaccination = { name, drug_id, dose, date };
        const connection = await getConnection();

        const drug_validations = await connection.query("SELECT min_dose, max_dose, available_at FROM drug WHERE id_drug = ?", drug_id);

        if (dose > drug_validations[0].min_dose && dose < drug_validations[0].max_dose) {
            if ((moment(date)).isAfter(moment(drug_validations[0].available_at))) {
                await connection.query("INSERT INTO vaccination SET ?", vaccination);
                res.json({ message: "Vaccination added" });
            } else {
                res.json({ message: "The dose does not meet the date allowed for vaccinations" });  
            }               
        }else{
            res.json({ message: "The dose does not meet the parameters of quantity allowed for vaccination" });
        }
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

/**
 * PUT /vaccination /:id -> Actualizar instancia de “vaccination”.
 */
const updateVaccination = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, drug_id, dose, date } = req.body;

        if ( name === undefined || drug_id === undefined || dose === undefined || date === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const vaccination = { name, drug_id, dose, date };
        const connection = await getConnection();

        const drug_validations = await connection.query("SELECT min_dose, max_dose, available_at FROM drug WHERE id_drug = ?", drug_id);

        if (dose > drug_validations[0].min_dose && dose < drug_validations[0].max_dose) {
            if ((moment(date)).isAfter(moment(drug_validations[0].available_at))) {
                const result = await connection.query("UPDATE vaccination SET ? WHERE id_vaccination = ?", [vaccination, id]);
                res.json(result);
            } else {
                res.json({ message: "The dose does not meet the date allowed for vaccinations" });  
            }               
        }else{
            res.json({ message: "The dose does not meet the parameters of quantity allowed for vaccination" });
        }

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

/**
 * GET / vaccination -> Obtener todas las instancias de “vaccination”.
 */
const getVaccinations = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id_vaccination, name, drug_id, dose, date FROM vaccination");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
/**
 * DELETE / vaccination /:id -> Eliminar instancia de “vaccination”
 */
const deleteVaccination = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM vaccination WHERE id_vaccination = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    addVaccination,
    updateVaccination, 
    getVaccinations,
    deleteVaccination 
};