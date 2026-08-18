const express = require("express")
const app = express()

app.use(express.json())

const disciplinas = []

app.get("/disciplinas", (req, res) => {
  res.json(disciplinas)
})

app.post("/disciplina", (req, res) => {
  const {nome, professor} = req.body
  if(!nome || !professor) {
    return res.send("Informar nome da disciplina e nome do professor")
  }
  const novaDisciplina = {
    id: disciplinas.length + 1,
    nome,
    professor
  }
  disciplinas.push(novaDisciplina)
  res.json(novaDisciplina)
})

app.put("/disciplina/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { nome, professor } = req.body
  const disciplina = disciplinas.find(d => d.id == id)
  if(!disciplina) {
    return res.send("Disciplina não encontrada")
  } else if(!nome || !professor) {
    return res.send("Informar nome da disciplina e nome do professor")
  }
  disciplina.nome = nome
  disciplina.professor = professor
  res.json({
    mensagem: "Disciplina atualizada com sucesso",
    disciplina: disciplina
  })
})

app.delete("/disciplina/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const novaLista = disciplinas.filter(d => d.id !== id)
  if(novaLista.length === disciplinas.length) {
    return res.send("Disciplina não encontrada")
  }
  disciplinas.length = 0
  disciplinas.push(...novaLista)
  res.json({
    mensagem: "Disciplina removida com sucesso"
  })
})

//porta pra subir o servidor
app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003")
})