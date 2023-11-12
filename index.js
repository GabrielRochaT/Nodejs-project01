const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conn = require('./db/database')
const Question = require("./db/question");

conn
    .authenticate()
    .then(() =>{
        console.log("Conexão feita com sucesso");
    })
    .catch((errorMsg) => {
        console.log(`Ocorreu um erro: ${errorMsg}` )
    })

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
 
app.get("/", (req, res) => {
    Question.findAll({raw: true, order: [
        ['createdAt','DESC']
    ]}).then(questions => {
        res.render("index", {
            questions: questions
        });
    })
});

app.get("/perguntar", (req, res) =>{
    res.render("perguntar");
});

app.post("/save_question", (req, res) => {
    var title = req.body.title
    var desc = req.body.desc;
    Question.create({
        title: title,
        description: desc
    }).then(() => {
        res.redirect("/");
    })
    console.log("Pergunta registrada")
})

app.listen(8181, () => {
    console.log("App Iniciado!");
});
