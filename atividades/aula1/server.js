const express = require('express')
const app = express()

// rota GET principal
app.get('/', (req, res) => {
  res.send(`
      <h1>Menu</h1>
      <a href='/inicio'>Inicio</a><br>
      <a href='/status'>Status</a><br>
      <a href='/soma/1/2'>Soma</a><br>
      <a href='/subtracao/8/3'>Subtração</a><br>
      <a href='/multiplicacao/3/3'>Multiplicação</a>
    `)
})

// rota /inicio
app.get('/inicio', (req, res) => {
  res.send('Bem Vindo')
})

// rota /status
app.get('/status', (req, res) => {
  res.json({
    servidor: "rodando"
  })
})

// rota soma
app.get('/soma/:a/:b', (req, res) => {
  const a = Number(req.params.a)
  const b = Number(req.params.b)
  const resultado = a + b
  res.send(resultado)
})

// rota subtração
app.get('/subtracao/:a/:b', (req, res) => {
  const a = Number(req.params.a)
  const b = Number(req.params.b)
  const resultado = a - b
  res.send(resultado)
})

// rota multiplicação
app.get('/multiplicacao/:a/:b', (req, res) => {
  const a = Number(req.params.a)
  const b = Number(req.params.b)
  const resultado = a * b
  res.send(resultado)
})

// Final. Liga o servidor para escutar na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})