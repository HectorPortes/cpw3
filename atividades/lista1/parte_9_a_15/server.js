const fs = require('fs/promises')
const path = require('node:path')
const express = require('express')
const { writeFile } = require('node:fs')
const app = express()
app.use(express.json())

app.get('/jogos', async (req, res) => {
  try {
    const jsonBruto = await fs.readFile(path.join(__dirname, '../dados/jogos.json'), 'utf-8')
    const conteudo = JSON.parse(jsonBruto)
    res.status(200).json(conteudo)
  } catch (erro) {
    res.status(500).json({erro: erro.message})
  }
})

app.get('/jogos/melhores', async (req, res) => {
  try {
    const jsonBruto = await fs.readFile(path.join(__dirname, '../dados/jogos.json'), 'utf-8')
    const conteudo = JSON.parse(jsonBruto)
    const melhores = conteudo.filter(j => j.nota >= 8)
    res.status(200).json(melhores)
  } catch (erro) {
    res.status(500).json({erro: erro.message})
  }
})

app.get('/jogos/:id', async (req, res) => {
  try {
    const jsonBruto = await fs.readFile(path.join(__dirname, '../dados/jogos.json'), 'utf-8')
    const conteudo = JSON.parse(jsonBruto)
    const jogo = conteudo.find(j => j.id == req.params.id)
    if (!jogo) {
      const erro = new Error('Jogo não encontrado!')
      erro.status = 404
      throw erro
    }
    res.json(jogo)
  } catch (erro) {
    if(erro.status === 404) {
      return res.status(404).json({erro: erro.message})
    }
    res.status(500).json({ erro: erro.message})
  }
})


app.post('/jogos', async (req, res) => {
  try{
    const jsonBruto = await fs.readFile(path.join(__dirname, '../dados/jogos.json'), 'utf-8')
    const conteudo = JSON.parse(jsonBruto)
    const { titulo, genero, ano, nota } = req.body
    if(!titulo || !genero) {
      const erro = new Error('Titulo e Genero são obrigatórios!')
      erro.status = 400
      throw erro
    }
    const novoJogo = {
      id: conteudo.length + 1,
      titulo: titulo,
      genero: genero,
      ano: ano,
      nota: nota
    }
    conteudo.push(novoJogo)
    const jsonAtt = JSON.stringify(conteudo, null, 2)
    await fs.writeFile(path.join(__dirname, '../dados/jogos.json'), jsonAtt)
    const textoHistorico = `JOGO NOVO CADASTRADO: {id: ${novoJogo.id}, titulo: ${novoJogo.titulo}, genero: ${novoJogo.genero}, ano: ${novoJogo.ano}, nota: ${novoJogo.nota}}\n`
    await fs.appendFile(path.join(__dirname, '../dados/historico.txt'), textoHistorico)
    res.status(201).json(novoJogo)
  } catch (erro) {
    if(erro.status === 400) {
      return res.status(400).json({erro: erro.message})
    }
    res.status(500).json({erro: erro.message})
  }
})

app.put('/jogos/:id', async (req, res) => {
  try {
    const jsonBruto = await fs.readFile(path.join(__dirname, '../dados/jogos.json'), 'utf-8')
    const conteudo = JSON.parse(jsonBruto)
    const id = req.params.id
    const jogo = conteudo.find(j => j.id == id)
    const { titulo, genero, ano, nota } = req.body
    if(!jogo) {
      const erro = new Error('Esse jogo não existe!')
      erro.status = 404
      throw erro
    } else if(!titulo || !genero || !ano || !nota) {
      const erro = new Error('Informar todos os campos!')
      erro.status = 400
      throw erro
    }
    const textoAntHistorico = `[\nJOGO ANTES DE ATUALIZADO: {id: ${id}, titulo: ${jogo.titulo}, genero: ${jogo.genero}, ano: ${jogo.ano}, nota: ${jogo.nota}},\n`
    await fs.appendFile(path.join(__dirname, '../dados/historico.txt'), textoAntHistorico)
    jogo.titulo = titulo
    jogo.genero = genero
    jogo.ano = ano
    jogo.nota = nota
    const jsonAtt = JSON.stringify(conteudo, null, 2)
    await fs.writeFile(path.join(__dirname, '../dados/jogos.json'), jsonAtt)
    const textoDepHistorico = `JOGO DEPOIS DE ATUALIZADO: {id: ${id}, titulo: ${jogo.titulo}, genero: ${jogo.genero}, ano: ${jogo.ano}, nota: ${jogo.nota}}\n]\n`
    await fs.appendFile(path.join(__dirname, '../dados/historico.txt'), textoDepHistorico)
    res.status(200).json(jogo)
  } catch (erro) {
    if(erro.status === 404) {
      return res.status(404).json({erro: erro.message})
    } else if (erro.status === 400) {
      return res.status(400).json({erro: erro.message})
    }
    res.status(500).json({erro: erro.message})
  }
})

app.delete('/jogos/:id', async (req, res) => {
  try {
    const jsonBruto = await fs.readFile(path.join(__dirname, '../dados/jogos.json'), 'utf-8')
    const conteudo = JSON.parse(jsonBruto)
    const { id } = req.params
    const jogo = conteudo.findIndex(j => j.id == id)
    if(jogo === -1) {
      const erro = new Error('Esse jogo não existe!')
      erro.status = 404
      throw erro
    }
    const textoHistorico = `JOGO EXCLUIDO: {id: ${id}, titulo: ${conteudo[jogo].titulo}, genero: ${conteudo[jogo].genero}, ano: ${conteudo[jogo].ano}, nota: ${conteudo[jogo].nota}}\n`
    await fs.appendFile(path.join(__dirname, '../dados/historico.txt'), textoHistorico)
    conteudo.splice(jogo, 1)
    const jsonAtt = JSON.stringify(conteudo, null, 2)
    await fs.writeFile(path.join(__dirname, '../dados/jogos.json'), jsonAtt)
    res.status(200).json({message: "Jogo excluido com sucesso!"})
  } catch (erro) {
    if(erro.status === 404) {
      return res.status(404).json({erro: erro.message})
    }
    res.status(500).json({erro: erro.message})
  }
})

app.get('/historico', async (req, res) => {
  try {
    const textoHistorico = await fs.readFile(path.join(__dirname, '../dados/historico.txt'), 'utf-8')
    if(!textoHistorico) {
      const erro = new Error('Histórico vazio! Utilize outras funções para preencher o histórico.')
      erro.status = 400
      throw erro
    }
    res.status(200).send(textoHistorico)
  } catch (erro) {
    if(erro.status === 400) {
      return res.status(400).json({erro: erro.message})
    }
    res.status(500).json({erro: erro.message})
  }
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})