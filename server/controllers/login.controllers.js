import { sqlConnect, sql } from '../utils/sql.js';
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool.request()
        .input("userName", sql.VarChar, req.body.userName)
        .query('SELECT * FROM usuario WHERE userName = @userName');

    if (data.recordset.length === 0) {
        return res.status(400).json({ message: 'User not found', isLogin: false });
    }

    const storedPassword = data.recordset[0].passwordd;
    const [salt, storedHash] = storedPassword.split(':');

    const newMsg = salt + req.body.passwordd;
    const hashing = crypto.createHash("sha512");
    const hash = hashing.update(newMsg).digest("base64url");

    const isLogin = (hash === storedHash);

    if (isLogin) {
        const token = jwt.sign({ sub: data.recordset[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login success', user: data.recordset[0], isLogin: true });
    } else {
        return res.status(400).json({ message: 'Login failed', user: {}, isLogin: false });
    }
};

export const createUser = async (req, res) => {
    const { userName, passwordd } = req.body;

    if (!userName || !passwordd) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Generate salt
        const salt = crypto.randomBytes(24).toString('base64url').substring(0, 10);

        // Concatenate salt and password
        const newMsg = salt + passwordd;
        // Create hash
        const hashing = crypto.createHash("sha512");
        const hash = hashing.update(newMsg).digest("base64url");

        // Connect to the database and insert user
        const pool = await sqlConnect();
        await pool.request()
            .input("userName", sql.VarChar, userName)
            .input("passwordd", sql.VarChar, `${salt}:${hash}`)
            .query('INSERT INTO [backend].[dbo].[usuario] (userName, passwordd) VALUES (@userName, @passwordd)');

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};