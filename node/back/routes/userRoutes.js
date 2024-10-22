const express = require('express');
const router = express.Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const upload = require('../middeware/uploadMiddleware'); // Importa o middleware de upload
// Configuração do Multer


// Rota para upload de imagem
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado!' });
    }
    res.status(200).json({ message: 'Imagem enviada com sucesso!', filePath: req.file.path });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar a imagem' });
  }
});



router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
      const token = jwt.sign({ userId: user.id }, 'secreto', { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
// Criar um novo usuário
router.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Buscar todos os usuários
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    
    // Verifica se não há usuários
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
    }

    // Retorna os usuários encontrados
    res.status(200).json(users);
  } catch (err) {
    // Retorna um erro detalhado
    console.error(err); // Log do erro no servidor
    res.status(500).json({ error: 'Erro interno do servidor. Tente novamente mais tarde.' });
  }
});

// Buscar um usuário por ID
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar um usuário
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.name = name;
      user.email = email;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar um usuário
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'Usuário deletado' });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
