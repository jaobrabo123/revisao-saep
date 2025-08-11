const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const express = require('express');
const token = require('../middlewares/auth.js')


const router = express.Router();

router.post('/veiculo', token, async(req, res)=>{
    try {
        const {modelo, placa} = req.body;
        const id = req.user.id;
        const newVeiculo = await prisma.veiculo.create({
            data: {
                modelo: modelo,
                placa: placa,
                mecanico: id
            }
        })
        console.log(newVeiculo)
        res.status(201).json({message: 'Veiculo criado', veiculo: newVeiculo})
    } catch (erro) {
        console.error('Erro ao criar Veiculo', erro)
        res.status(500).json({ error: `Erro ao criar Veiculo: ${erro.message}`})
    }
})

router.delete('/veiculo/:placa', token, async(req, res)=>{
    try {
        const placa = req.params.placa;
        const oldVeiculo = await prisma.veiculo.delete({
            where:{
                placa: placa
            }
        })
        console.log(oldVeiculo)
        res.status(201).json({message: 'Veiculo removido', veiculo: oldVeiculo})
    } catch (erro) {
        console.error('Erro ao remover Veiculo', erro)
        res.status(500).json({ error: `Erro ao remover Veiculo: ${erro.message}`})
    }
})

router.get('/veiculo', token, async(req, res)=>{
    try {
        const id = req.user.id;
        const veiculos = await prisma.veiculo.findMany({
            where: {
                mecanico_id: id
            }
        })
        console.log(veiculos)
        res.status(201).json(veiculos)
    } catch (erro) {
        console.error('Erro ao listar Veiculos', erro)
        res.status(500).json({ error: `Erro ao listar Veiculos: ${erro.message}`})
    }
})


module.exports = router;