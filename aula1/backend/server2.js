const express = require('express')
const app = express()

// rota GET principal
app.get('/', (req, res) => {
  res.send(`
      <h1>Menu</h1>
      <a href='/aluno/Hector'>Ir para aluno</a><br>
      <a href='/status'>Ir para status</a>
    `)
})

app.get('/status', (req, res) => {
  res.json({
    servidor: 'Online',
    disciplina: 'CPW3',
    professora: 'Milena',
    hora: new Date().toLocaleString()
  })
})

app.use((req, res, next) => {
  console.log('Acesso:', req.method, req.url);
  next();
})

// Final. Liga o servidor para escutar na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})