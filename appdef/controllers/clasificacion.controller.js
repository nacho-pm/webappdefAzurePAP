const database = require('../database');
const mysql = require('mysql');

// Funcion para leer la clasificacion
const readClasificacion = (req, res) => {
    const query = 'SELECT * FROM clasificacion;';
    database.query(query, (err, result) => {
        if (err) throw err;
        //console.log(result);
        res.status(200).json(result);   // Devuelve un JSON con el resultado de la consulta
    });
};

// Funcion para leer una clasificacion por usuario
const readUser_nombre = (req, res) => {
    const { nombre } = req.params;
    const query = `SELECT * FROM clasificacion WHERE nombre = ?;`;
    const queryformat = mysql.format(query, [nombre]);
    database.query(queryformat, (err, result) => {
        if (err) throw err;
        if (result[0] !== undefined) {
            res.status(200).json(result[0]);   // Devuelve un JSON con el resultado de la consulta
        } else {
            res.status(404).json({ message: '[!] No se ha encontrado el usuario.' });
        }
    });
};

// Funcion para añadir una clasificacion
const postClasificacion = (req, res) => {
    const { nombre, puntuacion, duracion, fecha } = req.body;
    const query = `INSERT INTO clasificacion (nombre, puntuacion, duracion, fecha) VALUES (?, ?, ?, ?);`;
    const queryformat = mysql.format(query, [nombre, puntuacion, duracion, fecha]);
    // ningun valor puede ser nulo
    if (nombre === undefined || puntuacion === undefined || duracion === undefined || fecha === undefined) {
        res.status(400).json({ message: '[!] No se han introducido todos los campos necesarios.' });
    } else {
        // no se pueden añadir clasificaciones con el mismo nombre
        const queryCheck = `SELECT * FROM clasificacion WHERE nombre = ?;`;
        const queryCheckFormat = mysql.format(queryCheck, [nombre]);
        database.query(queryCheckFormat, (err, result) => {
            if (err) throw err;
            if (result[0] !== undefined) {
                res.status(400).json({ message: '[!] Ya existe una clasificacion con ese nombre.' });
            } else {
                database.query(queryformat, (err, result) => {
                    if (err) throw err;
                    res.status(201).json({ message: '[+] Clasificacion añadida correctamente.' });
                });
            }
        });
    }
};

const deleteClasificacion = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM clasificacion WHERE id=?`;
  
    const queryFormat = mysql.format(query, [id]);
  
    database.query(queryFormat, (err, result) => {
      if (err) throw err;
      // console.log(result);
      res.status(200).json({ message: '[+] Usuario eliminado' });
    });
  };

module.exports = {
    readClasificacion,
    readUser_nombre,
    postClasificacion,
    deleteClasificacion
};