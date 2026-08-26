const express = require('express')
const fs = require('node:fs')
const path = require('node:path')
const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'))
})

app.post('/estudo', (req, res) => {
  const { materia, anotacao } = req.body
  const linha = `${materia}: ${anotacao}\n`
  fs.appendFileSync('diario.txt', linha, 'utf8')
  res.redirect('/historico')
})

app.get('/historico', (req, res) => {
  if(!fs.existsSync('diario.txt')) {
    return res.send('Histórico vazio. <br><br><a href="/">Enviar Nova Anotação</a>')
  }
  const conteudo = fs.readFileSync('diario.txt', 'utf8')
  res.send(`
    <h1>Histórico</h1>
    <pre>${conteudo}</pre>
    <a href="/">Enviar Nova Anotação</a>  
  `)
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})