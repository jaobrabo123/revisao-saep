const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CHAVE = process.env.SECRET_KEY;

router.post('/login', async(req, res)=>{
    try {
        const { email, senha} = req.body;
        if(!email||!senha) return res.status(400).json({error: 'Email e senha devem ser forncidos'})
        
        const mecanico = await prisma.mecanico.findUnique({ where: {email: email}})
        if(mecanico && await bcrypt.compare(senha, mecanico.senha)){
            const token = jwt.sign({id: mecanico.id}, CHAVE, {expiresIn: '1d'});
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 3*24*60*60*1000
            })
        }
        else{
            return res.status(401).json({error: 'Credenciais inválidas'})
        }
        return res.status(200).json({message: 'Logado'});
    } catch (erro) {
        res.status(500).json({ error: `Erro no login`})
    }
})

router.post('/logout', async(req, res)=>{
    res.clearCookie('token',{
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    })
    return res.status(200).json({message: 'Deslogado'});
})

module.exports = router;