const express = require('express')
const app = express()
app.use(express.json())

const jogos = [
  { id: 1, titulo: 'The Elder Scrolls V: Skyrim', genero: 'RPG', ano: 2011, nota: 10 },
  { id: 2, titulo: 'Dishonored', genero: 'Ação', ano: 2012, nota: 10 },
  { id: 3, titulo: 'Warframe', genero: 'Looter-Shooter', ano: 2013, nota: 10 }
]

app.get('/', (req, res) => {
  res.send('Servidor da API rodando corretamente!')
})

app.get('/jogos', (req, res) => {
  res.json(jogos)
})

app.get('/jogos/:id', (req, res) => {
  const jogo = jogos.find(j => j.id == req.params.id)
  if (!jogo) {
    return res.status(404).json({erro: 'Jogo não encontrado'})
  }
  res.json(jogo)
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})