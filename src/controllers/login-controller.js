import { pool } from '../db.js';
import bcrypt from 'bcrypt';

const saveUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        const existeEmail = await pool.query(`SELECT COUNT(EMAIL) AS REGISTRO FROM USUARIO WHERE EMAIL = '${email}'`);
        
        try {
            if (existeEmail.rows[0].registro < 1) {
                const hash = bcrypt.hashSync(password, 10);
                
                const grabaUsuario = await pool.query(`INSERT INTO USUARIO (NOMBRE,EMAIL,PASSWORD,ACTIVO) VALUES('${nombre}','${email}','${hash}', TRUE)`);

                return res.status(200).send('Usuario guardado');
            } else {
                return res.status(400).json({ message: 'Ya existe un usuario con ese email' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } catch (error) {
        console.error(error.message);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existeEmail = await pool.query(`SELECT COUNT(EMAIL) AS REGISTRO FROM USUARIO WHERE EMAIL = '${email}' AND ACTIVO IS TRUE`);
        if (existeEmail.rows[0].registro < 1) {
            return res.status(400).json({ message: 'Usuario o password incorrecto' });
        }

        const passworDB = await pool.query(`SELECT PASSWORD FROM USUARIO WHERE EMAIL = '${email}' AND ACTIVO IS TRUE`);
        const passwordCorrecto = await bcrypt.compare(password, passworDB.rows[0].password);
        if (!passwordCorrecto) {
            return res.status(400).json({ message: 'Credenciales invalidas' });
        };

        const usuario = await pool.query(`SELECT U.ID, U.NOMBRE, U.EMAIL, R.NOMBRE AS ROLE FROM USUARIO U
                                        INNER JOIN USUARIO_ROLE ur ON U.ID = UR.USUARIO_ID
                                        INNER JOIN ROLE R ON UR.ROLE_ID = R.ID WHERE U.EMAIL = '${email}'`);

        res.json({
            id: usuario.rows[0].id,
            nombre: usuario.rows[0].nombre,
            email: usuario.rows[0].email,
            role: usuario.rows[0].role,
            message: "Usuario logueado",
            ok: true
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    saveUsuario,
    login
};