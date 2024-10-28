const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const { error } = require("console");
const router = express.Router();
const cors = require("cors");

//My libs
const {User} = require('../../models');
const { Book } = require("../../models");
const authenticateToken = require('../../middleware/authMiddleware');
const upload = require("../../middleware/uploadMiddleware"); 


router.use('/upload', express.static(path.join(__dirname, './upload')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
const upload1 = multer({ storage: storage });

router.post('/add', upload1.single('book_img'), async (req, res) => {
  try {
      const { name, author, year_release } = req.body;
      const book_img = req.file ? req.file.filename : null;
  
      const newBook = await Book.create({ name, author, year_release, book_img });
      res.status(201).json(newBook);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao cadastrar livro' + err });
    }
  });

  router.get('/returnBooks',  async (req, res) => {
    try {
      const books = await Book.findAll();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao recuperar livros' });
    }
  });




  router.get('/books/:id', async (req, res) => {
    try {
      const bookId = req.params.id;
      res.send(bookId);  // Capturando o ID da URL
  
      if (!bookId) {
        return res.status(400).json({ error: 'ID do livro não fornecido' });
      }
  
      const book = await Book.findByPk(bookId);
  
      if (!book) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }
  
      const imageUrl = book.book_img ? `${req.protocol}://${req.get('host')}/upload/${book.book_img}` : null;

  
      res.json({
        id: book.id,
        name: book.name,
        author: book.author,
        year_release: book.year_release,
        book_img: imageUrl,
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao recuperar o livro' });
    }
  });












  router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Procura o usuário no banco de dados pelo email
        const user = await User.findOne({ where: { email } });
        
        // Verifica se o usuário existe e se a senha está correta
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: "Invalid User" });
        }

        // Se o login for bem-sucedido, cria um token JWT
        const token = jwt.sign({ userId: user.id }, 'secreto', { expiresIn: "2h" });

        // Retorna o token como resposta
        res.json({ token });
    } catch (err) {
        // Retorna um erro em caso de falha
        res.status(500).json({ error: err.message });
    }
});


router.post('/users', async (req, res) => {
  try {
      const { name, email, password } = req.body;

      // Verifica se o email já está cadastrado
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
          return res.status(400).json({ error: "Email already registered" });
      }

      // Criptografa a senha antes de armazená-la
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Cria o novo usuário com a senha criptografada
      const user = await User.create({ name, email, password: hashedPassword });

      // Retorna o usuário criado (ou uma versão segura, omitindo a senha)
      const { password: _, ...userWithoutPassword } = user.get(); // Remove a senha do objeto retornado
      res.status(201).json(userWithoutPassword);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

router.post('/upload', upload.single('image'), async (req, res, next)=>
{
    

    try 
    {

        if(!req.file) 
        {
            return res.status(400).json({message: "Dont have archive..."});
        }
        else
        {
            res.status(200).json({message: "Archive send with succeful!", filePath: req.file.path});
        }
        
    } 
    catch (err) 
    {
      res.status(500).json({error: "Error. Code: " + err.message})  
    }



});




router.get('/books', async(req, res) =>{
    try {
        const books = await Book.findAll();

        if (!books || books.length === 0)
        {
            return res.status(404).json({message: "Dont have books"});
        }
        else
        {
            res.status(200).json(books);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server failed. code: " + error});
    }
});


router.post('/booksCreate', async (req, res) =>{
    const {name, author, year_release} = req.body;

    try {
        const books = await Book.create({name, author, year_release});
        res.status(201).json(books);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.put('booksAtt', async (req, res) =>{

});

router.get('/books/:id', async (req, res) =>{
    const {id} = req.params;

    try {
        const book = await Book.findByPk(id);
        if(book){
            res.json(book);
        }
        else {
            res.status(404).json({error: "Book unknow"});
        }
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

router.put("/books/:id", async (req, res) =>{
    const {id} = req.params;
    const {name, author, year_release} = req.body;

    try {
        const book = await Book.findByPk(id);
        if(book){
            book.name = name;
            book.author = author;
            book.year_release = year_release;

            await book.save();
            res.json(book);
        }
        else
        {
            res.status(404).json({error: "Book uknow"});
        }
    } catch (err) {
        res.status(500).json({ error: err.message });       
    }
})

router.delete('/books/:id', async (req, res)=>{


    try {
        const {id} = req.params;
        const book = await Book.findByPk(id);
        if(book)
        {
            await book.destroy();
            res.json({message: "Book deleted"});
        }
        else
        {
            res.status(404).json({error: "Book unknow"})
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
  



module.exports = router;





