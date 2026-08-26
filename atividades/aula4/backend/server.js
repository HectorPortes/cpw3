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
    <h1 style="
      display: flex;
      justify-content: center;
      margin: auto;
      padding: 10px;
    ">Histórico</h1>
    <div style="
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 1%;
      border: 1px solid black;
      border-radius: 1cap;
      width: fit-content;
      margin-right: auto;
      margin-left: auto;
      background-color: white;
    "><pre>${conteudo}</pre></div>
    <a href="/" style="
      display: flex;
      justify-content: center;
      padding: 10px;
    ">Enviar Nova Anotação</a>  
  `)
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})