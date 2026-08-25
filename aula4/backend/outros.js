const fs = require('fs')

// escrever
fs.writeFileSync('texto.txt', 'Olá, mundo!')
console.log('Arquivo criado!')

// ler
const texto = fs.readFileSync('texto.txt', 'utf8')
console.log(texto)

// -----------------------------------------------------------

// para usar promises, callbacks e sync
const fs = require('node:fs/promises')

async function lerMeuArquivo() {
  try {
    const data = await fs.readFile('texto2.txt', 'utf8')
    console.log('Conteudo do arquivo:', data)
  } catch (erro) {
    console.error('Ops, deu um erro ao ler o arquivo:', erro.message)
  }
}

lerMeuArquivo()

// -----------------------------------------------------------

// adicionando dados no final
fs.appendFile('texto.txt', '\n Parabens!')
console.log('arquivo criado!')

// -----------------------------------------------------------

// removendo arquivos
fs.unlink('texto.txt')
console.log('Arquivos destuido!')

// -----------------------------------------------------------