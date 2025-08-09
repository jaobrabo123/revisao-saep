const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const server = require('http').createServer(app);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(require('./routes/mecanico.js'));
app.use(require('./routes/veiculo.js'));
app.use(require('./routes/login.js'));
app.use(require('./routes/ordem.js'));
app.get('/', async(req,res)=>{
    res.sendFile(path.join(__dirname, 'public','pages', 'login.html'))
})
app.get('/veiculos', async(req, res)=>{
    res.sendFile(path.join(__dirname, 'public','pages', 'mecanico.html'))
})

server.listen(3000, ()=>console.log('http://localhost:3000'))