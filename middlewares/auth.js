const jwt = require('jsonwebtoken');
const CHAVE = process.env.SECRET_KEY;

async function token(req, res, next) {
    const token = req.cookie.token;
    if(!token) return res.status(401).json({ error: 'Mecanico não autenticado.'})
    jwt.verify(token, CHAVE, async(err, user)=>{
        if(err) {
            res.clearCookie('token');
            if(err.name === 'TokenExpiredError') return res.status(403).json({ error: 'Sessão expirada'});
            return res.status(403).json({ error: 'Token inválido'})
        };
        req.user = user;
        next()
    })
}

module.exports = token;