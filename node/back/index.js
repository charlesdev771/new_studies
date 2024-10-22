const express = require('express');
const app = express();
const { sequelize } = require('./models'); // Certifique-se de que o caminho esteja correto
const userRoutes = require('./routes/userRoutes'); // Importar as rotas
const cors = require('cors');
const bodyParser = require('body-parser');// Middlewares

app.use(cors({
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization']
})); // <--- Aqui
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Registrar as rotas
app.use('/api', userRoutes);

// Testar a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso!');
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

  app.use(cors());

// Use body-parser para lidar com dados de formulários

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
