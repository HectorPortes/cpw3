const express = require("express")
const app = express()

app.use(express.json())

const produtos = [
  { id: 1, nome: "Notebook", preco: 3500 },
  { id: 2, nome: "Mouse", preco: 80 },
  { id: 3, nome: "Teclado", preco: 150 },
  { id: 4, nome: "Monitor", preco: 1200 }
]

app.get("/produtos", (req,res) => {
  res.json(produtos)
})

app.get("/produtos/:id", (req, res) => {
  const produto = produtos.find(p => p.id == req.params.id)
  res.send(produto)
})

app.get("/caros", (req, res) => {
  const caros = produtos.filter(p => p.preco > 1000)
  res.send(caros)
})

app.get("/baratos", (req, res) => {
  const baratos = produtos.filter(p => p.preco < 200)
  res.send(baratos)
})

//porta pra subir o servidor
app.listen(3002, () => {
  console.log("Servidor rodando na porta 3002")
})