const express = require("express");
const app = express();

app.use(express.json());

const filmes = [
  { id: 1, titulo: "A Origem", ano: 2010, nota: 10 },
  { id: 2, titulo: "A Familia do Futuro", ano: 2007, nota: 9 },
  { id: 3, titulo: "Homem-Aranha", ano: 2002, nota: 8 },
  { id: 4, titulo: "Interestelar", ano: 2014, nota: 10 },
  { id: 5, titulo: "Click", ano: 2006, nota: 9 }
]

app.get("/filmes", (req, res) => {
  res.json(filmes)
})

app.get("/filmes/:id", (req, res) => {
  const filme = filmes.find(f => f.id == req.params.id)
  if (!filme) {
    return res.status(404).json({ erro: "Filme não encontrado" })
  }
  res.json(filme)
})

app.get("/bem-avaliados", (req, res) => {
  const bemAvaliados = filmes.filter(f => f.nota >= 9)
  res.send(bemAvaliados)
})

app.get("/filmes/ano/:ano", (req,res) => {
  const filme = filmes.filter(f => f.ano == req.params.ano)
  res.send(filme)
})

//porta pra subir o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});