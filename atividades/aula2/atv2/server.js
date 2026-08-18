const express = require("express")
const app = express()

app.use(express.json())

const musicas = [
  { id: 1, titulo: "Dark Red", artista: "Steve Lacy", nota: 10 },
  { id: 2, titulo: "Instant Crush", artista: "Daft Punk", nota: 9 },
  { id: 3, titulo: "Chop Suey!", artista: "System of a Down", nota: 8 },
  { id: 4, titulo: "Backstage", artista: "Matue", nota: 7 }
]

app.get("/musicas", (req, res) => {
  res.json(musicas)
})

app.get("/musicas/:id", (req, res) => {
  const musica = musicas.find(m => m.id == req.params.id)
  if (!musica) {
    return res.status(404).json({ erro: "Musica não encontrado" })
  }
  res.json(musica)
})

app.get("/artista/:nome", (req, res) => {
  const musicArtista = musicas.filter(m => m.artista == req.params.nome)
  res.send(musicArtista)
})

app.get("/top", (req,res) => {
  const top = musicas.filter(m => m.nota >= 9)
  res.send(top)
})

//porta pra subir o servidor
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001")
});