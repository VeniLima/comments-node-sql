const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Comentario = require('./database/Comentario')

connection.authenticate().then(() => {
  console.log("Conexão com o banco de dados bem-sucedida")
}).catch((msgError) => {
  console.log(msgError);
})

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  Comentario.findAll({
    raw: true, order: [
      ['id', 'DESC']
    ]
  }).then(comentarios => {
    res.render("index", {
      comentarios: comentarios
    });
  })
});

app.post('/new', (req, res) => {
  let comentario = req.body.comentario;
  Comentario.create({
    comentario: comentario
  }).then(() => {
    res.redirect("/")
  })
})

app.listen(4000, () => {
  console.log("App rodando")
});
