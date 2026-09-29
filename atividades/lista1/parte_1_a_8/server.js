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

app.get('/jogos/melhores', (req, res) => {
  const melhores = jogos.filter(j => j.nota >= 8)
  res.status(200).json(melhores)
})

app.get('/jogos/:id', (req, res) => {
  const jogo = jogos.find(j => j.id == req.params.id)
  if (!jogo) {
    return res.status(404).json({erro: 'Jogo não encontrado'})
  }
  res.json(jogo)
})

app.post('/jogos', (req, res) => {
  const { titulo, genero, ano, nota } = req.body
  if(!titulo || !genero) {
    return res.status(400).json({message: 'Faltando titulo ou genero'})
  }
  let novoJogo = {
    id: jogos.length + 1,
    titulo: titulo,
    genero: genero,
    ano: ano,
    nota: nota
  }
  jogos.push(novoJogo)
  res.status(201).json(novoJogo)
})

app.put('/jogos/:id', (req, res) => {
  const id = req.params.id
  const { titulo, genero, ano, nota } = req.body
  const jogo = jogos.find(j => j.id == id)

  if(!jogo) {
    res.status(404).json({message: 'Não existe esse jogo!'})
  }

  jogo.titulo = titulo
  jogo.genero = genero
  jogo.ano = ano
  jogo.nota = nota
  res.status(200).json(jogo)
})

app.delete('/jogos/:id', (req, res) => {
  const id = req.params.id
  const jogo = jogos.findIndex(j => j.id == id)
  
  if(jogo === -1) {
    return res.status(404).json({message: 'Não existe esse jogo!'})
  }

  jogos.splice(jogo, 1)
  res.status(200).json({message: 'Jogo removido com sucesso!'})
})


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})