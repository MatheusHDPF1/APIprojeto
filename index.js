const express = require("express");

const cors = require("express");

const mysql = require("mysql");

const app = express();

app.use(express.json());


app.use(cors())


const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"dbprodutos"
})

conexao.connect((erro)=>{
    if(erro){
        console.error("Erro ao tentar estabelecer a conexão "+erro.stack);
        return;
    }
    console.log("Conectado ao banco - > "+conexao.threadId);
})

app.get("/produto/listar", (req, res) => {
    conexao.query("select * from tbproduto", (erro, resultado) => {
      if (erro) {
        return res
          .status(500)
          .send({ output: "Erro ao tentar executar a consulta " + erro });
      }
      res.status(200).send({ output: resultado });
    });
  });

  app.post("/produto/cadastro", (req, res) => {
    conexao.query(
      "insert into tbproduto set ?",
      [req.body],
      (erro, resultado) => {
        if (erro) {
          res
            .status(500)
            .send({ output: `Não foi possível cadastrar -> ${erro}` });
          return;
        }
        res.status(201).send({ output: resultado });
      }
    );
  });

  app.delete("/produto/apagar/:id", (req, res) => {
    conexao.query(
      "delete from tbproduto where idproduto = ?",
      [req.params.id],
      (erro, resultado) => {
        if (erro) {
          res
            .status(500)
            .send({ output: `Erro ao tentar apagar o produto -> ${erro}` });
          return;
        }
        res.status(204).send({ output: resultado });
      }
    );
  });

  

app.listen("5000",()=>console.log("Servidor online em: http://localhost:5000"));

module.exports = app;

