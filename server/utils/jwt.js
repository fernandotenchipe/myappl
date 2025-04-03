import jwt from "jsonwebtoken";
import {Router} from "express"; 

export const validateJWT = Router();

validateJWT.use((req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    if(token.startsWith("Bearer ")){
        token =token.split(" ")[1];
    }
})