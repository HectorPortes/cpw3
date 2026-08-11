const { log } = require('console')
const express = require('express')
const app = express()

// 1. Define uma rota (endpoint)
app.get('/', (req, res) => {
  res.send('Hello World')
})

// 2. 
app.get('/aluno', (req, res) => {
  res.send('Rota Ok')
})

app.get('/aluno:nome', (req,res) => {
  const nome = req.params.nome
  res.send(`Olá, ${nome}!`)
})

app.get('/aluno/:a/:b', (req, res) => {
  const a = Number(req.params.a)
  const b = Number(req.params.b)
  const resultado = a + b
  res.send(`O resultado é, ${resultado}!`)
})

// Final. Liga o servidor para escutar na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})