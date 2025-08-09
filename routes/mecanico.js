const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CHAVE = process.env.SECRET_KEY;

router.post('/mecanico', async(req, res)=>{
    try {
        const {nome, email, senha} = req.body;
        const senhaCrip = await bcrypt.hash(senha, 10);
        const newMecanico = await prisma.mecanico.create({
            data: {
                nome: nome,
                email: email,
                senha: senhaCrip
            },
            select: {
                id: true,
                nome: true,
                email: true
            }
        })
        const token = jwt.sign({id: newMecanico.id}, CHAVE, {expiresIn: '1d'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3*24*60*60*1000
        })
        console.log(newMecanico)
        res.status(201).json({message: 'Mecanico criado', mecanico: newMecanico})
    } catch (erro) {
        console.error('Erro ao criar mecanico', erro)
        res.status(500).json({ error: `Erro ao criar mecanico: ${erro.message}`})
    }
})

module.exports = router;