const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const express = require('express');
const token = require('../middlewares/auth.js')

const router = express.Router();

router.post('/ordem', token, async(req, res)=>{
    try {
        const {descricao, veiculo} = req.body;
        const newOrdem = await prisma.ordem_servico.create({
            data:{
                descricao: descricao,
                veiculo: veiculo
            }
        })
        console.log(newOrdem)
        res.status(201).json({message: 'ordem criado', ordem: newOrdem})
    } catch (erro) {
        console.error('Erro ao criar ordem', erro)
        res.status(500).json({ error: `Erro ao criar ordem: ${erro.message}`})
    }
})

module.exports = router;