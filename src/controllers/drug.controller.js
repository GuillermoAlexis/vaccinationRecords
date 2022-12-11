import { getConnection } from "./../database/database";
const jwt = require("jsonwebtoken");

/**
 * POST /drugs -> Crear instancia de “drug” entregando los campos de “name”,
“approved”, “min_dose”, “max_dose”, “available_at”.
*/
const addDrug = async (req, res) => {
    jwt.verify(req.token, 'key', async (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
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
        }
    });
};
/**
 * PUT /drugs/:id -> Ruta para poder actualizar instancia de “drug”.
 */
const updateDrug = async (req, res) => {
    jwt.verify(req.token, 'key', async (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            try {
                const { id } = req.params;
                const { name, approved, min_dose, max_dose, available_at } = req.body;
                if ( name === undefined || approved === undefined || min_dose === undefined || max_dose === undefined || available_at === undefined) {
                    res.status(400).json({ message: "Bad Request. Please fill all field." });
                }

                const drug = { name, approved, min_dose, max_dose, available_at };
                const connection = await getConnection();
                const result = await connection.query("UPDATE drug SET ? WHERE id_drug = ?", [drug, id]);
                res.json(result);
            } catch (error) {
                res.status(500);
                res.send(error.message);
            }
        }
    });
};

/**
 * GET /drugs -> Obtener todas las instancias de “drug”.
 */
const getDrugs = async (req, res) => {
    jwt.verify(req.token, 'key', async (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            try {
                const connection = await getConnection();
                const result = await connection.query("SELECT id_drug, name, approved, min_dose, max_dose, available_at FROM drug");
                res.json(result);
            } catch (error) {
                res.status(500);
                res.send(error.message);
            }
        }
    });
};
/**
 * DELETE /drugs/:id -> Eliminar instancia de “drug”.
 */
const deleteDrug = async (req, res) => {
    jwt.verify(req.token, 'key', async (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            try {
                const { id } = req.params;
                const connection = await getConnection();
                const result = await connection.query("DELETE FROM drug WHERE id_drug = ?", id);
                res.json(result);
            } catch (error) {
                res.status(500);
                res.send(error.message);
            }
        }
    });
};

export const methods = {
    addDrug,
    updateDrug,
    getDrugs,
    deleteDrug
};