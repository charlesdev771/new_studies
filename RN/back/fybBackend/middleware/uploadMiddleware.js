const multer = require("multer");
const path = require("path");

// Configuração do armazenamento do multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload'); // Diretório onde as imagens serão armazenadas
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada imagem
    }
  });
  
  // Verificação para garantir que apenas imagens sejam enviadas
  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas!'));
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5 // Limite de tamanho do arquivo: 5MB
    },
    fileFilter: fileFilter
  });
  
  module.exports = upload;