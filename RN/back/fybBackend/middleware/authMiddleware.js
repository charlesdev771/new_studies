const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtem o token do cabeçalho Authorization

    if (!token) return res.sendStatus(401); // Se não houver token, retorna 401

    jwt.verify(token, 'secreto', (err, user) => { // Verifica o token
        if (err) return res.sendStatus(403); // Se o token não for válido, retorna 403
        req.user = user; // Armazena os dados do usuário na requisição
        next(); // Passa para o próximo middleware ou rota
    });
};

module.exports = authenticateToken;